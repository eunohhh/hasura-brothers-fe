# Firebase Auth vs 커스텀 PKCE 구현 비교 정리

## 1. 주요 차이점

### 커스텀 PKCE 구현
- **장점**: 비즈니스 요구사항에 맞춘 자유로운 커스터마이징, 외부 서비스 의존성 없음, 단일 코드베이스에서 완결
- **단점**: 보안 설계·검증 부담, 인프라 운영·모니터링 책임, 유지보수 리소스 필요

### Firebase Auth
- **장점**: 검증된 보안 구현, Google 인프라의 안정성, SLA·모니터링 제공, 신규 보안 기능 자동 업데이트
- **단점**: 커스터마이징 제약, 대규모 사용 시 비용 발생, Next.js App Router와의 복잡한 연동

## 2. Next.js App Router 통합 이슈

Firebase Auth의 주요 제약사항:
- **클라이언트 중심 설계**: SDK가 브라우저/모바일 환경 중심으로 설계됨
- **SSR 수동 연결 필요**: 
  - 클라이언트: `firebase/auth` SDK로 토큰 발급
  - 서버: `firebase-admin` 패키지로 토큰 검증
  - 개발자가 직접 쿠키/헤더 관리 및 세션화 구현 필요
- **초기 설정 복잡도**:
  - Firebase 콘솔에서 서비스 계정 키 발급
  - 환경 변수 설정 (credential.cert 등)
  - OAuth 리디렉션 도메인, 보안 규칙 등 추가 설정
- **공식 문서 부족**: App Router 최신 패턴에 대한 상세 가이드 미흡

## 3. Hasura + PostgreSQL 연동

**Firebase Auth는 Hasura와 독립적으로 사용 가능**
- Firebase Auth는 인증(Identity Provider)만 담당
- 애플리케이션 데이터는 Hasura/PostgreSQL에 그대로 저장
- 연동 방식:
  1. Firebase Auth로 로그인 → ID 토큰 획득
  2. 토큰을 Hasura에 전달
  3. `firebase-admin`으로 토큰 검증
  4. 토큰의 claims를 기반으로 권한 매핑
  5. Hasura의 JWT 설정(`HASURA_GRAPHQL_JWT_SECRET`) 조정

## 4. PKCE 지원

**Firebase Auth는 PKCE를 기본 지원**
- OAuth/OIDC 연동 시 SDK가 자동으로 PKCE 처리
- `code_verifier`/`code_challenge` 자동 생성·검증
- 개발자가 별도 구현 불필요
- 이메일/비밀번호 인증 등 OAuth 외 시나리오에서는 PKCE 적용 대상 아님

## 5. 의사결정 포인트

다음 사항을 고려하여 선택:
- **팀 전문성**: 인증 전문 인력 보유 여부
- **요구사항 복잡도**: 세분화된 권한 관리, 특수 토큰 정책 필요 여부
- **운영 리소스**: 보안 유지·모니터링 투입 가능 인력
- **비용**: 사용량 대비 과금 구조 vs 개발·유지보수 숨은 비용
- **프로젝트 규모**: 초기 빠른 출시 vs 장기 확장성

## 6. 다음 단계 제안

1. **현재 PKCE 구현 점검**: 보안 감사, 페어 리뷰
2. **Firebase Auth 프로토타입**: App Router SSR 패턴 검증
3. **비교 분석표 작성**: 기능·비용·운영 부담 비교

---

## 부록: Firebase Auth + Next.js App Router 구현 예시

### 패키지 설치
```bash
pnpm add firebase
pnpm add -D firebase-admin
```

### 환경 변수 설정
```bash
# .env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

# admin용 (서비스 계정)
FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

SESSION_COOKIE_MAX_DAYS=7
```

### 클라이언트 설정
```ts
// lib/firebaseClient.ts
"use client";
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const clientConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

export const firebaseApp =
  getApps().length ? getApps()[0] : initializeApp(clientConfig);

export const firebaseAuth = getAuth(firebaseApp);
```

### 서버 설정
```ts
// lib/firebaseAdmin.ts
import { cert, getApps, initializeApp, App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

let adminApp: App;
if (!getApps().length) {
  adminApp = initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID!,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    }),
  });
} else {
  adminApp = getApps()[0]!;
}

export const adminAuth = getAuth(adminApp);
```

### 세션 API
```ts
// app/api/session/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { idToken } = await req.json();
    if (!idToken) return NextResponse.json({ error: "missing idToken" }, { status: 400 });

    const maxDays = Number(process.env.SESSION_COOKIE_MAX_DAYS ?? "7");
    const expiresIn = maxDays * 24 * 60 * 60 * 1000;

    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
    const cookieStore = await cookies();
    
    cookieStore.set("session", sessionCookie, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: Math.floor(expiresIn / 1000),
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "createSessionCookie failed" }, { status: 401 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.set("session", "", { path: "/", maxAge: 0 });
  return NextResponse.json({ ok: true });
}
```

### SSR 사용자 인증
```ts
// lib/getUserOnServer.ts
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebaseAdmin";

export type ServerUser =
  | { uid: string; email?: string | null; claims: Record<string, unknown> }
  | null;

export async function getUserOnServer(): Promise<ServerUser> {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;

  try {
    const decoded = await adminAuth.verifySessionCookie(session, true);
    return {
      uid: decoded.uid,
      email: decoded.email ?? null,
      claims: decoded,
    };
  } catch {
    return null;
  }
}
```

### 미들웨어 보호
```ts
// middleware.ts
import { NextResponse, NextRequest } from "next/server";

const PROTECTED_PREFIXES = ["/dashboard", "/account"];

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some((p) => url.pathname.startsWith(p));

  if (!isProtected) return NextResponse.next();

  const hasSession = req.cookies.get("session");
  if (!hasSession) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", url.pathname);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/account/:path*"],
};
```

### 로그인 페이지
```tsx
// app/login/page.tsx
"use client";

import { firebaseAuth } from "@/lib/firebaseClient";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function LoginPage() {
  const onGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(firebaseAuth, provider);
    const idToken = await cred.user.getIdToken();
    
    await fetch("/api/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });
    
    location.assign("/dashboard");
  };

  return (
    <main>
      <button onClick={onGoogle}>구글로 로그인</button>
    </main>
  );
}
```

### 보호된 페이지
```tsx
// app/dashboard/page.tsx
import { getUserOnServer } from "@/lib/getUserOnServer";

export const runtime = "nodejs";

export default async function Dashboard() {
  const user = await getUserOnServer();
  if (!user) return <p>권한 없음</p>;

  return (
    <section>
      <h1>대시보드</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </section>
  );
}
```

### 동작 흐름
1. **CSR 로그인**: 클라이언트에서 `signInWithPopup` → `user.getIdToken()`
2. **서버 세션 확립**: `/api/session` POST로 ID 토큰 전달 → `createSessionCookie`로 HTTP-only 쿠키 발급
3. **SSR 식별**: 서버 컴포넌트에서 `verifySessionCookie`로 사용자 판별
4. **보호 라우팅**: middleware로 쿠키 검증
5. **로그아웃**: `/api/session` DELETE → 쿠키 만료

### 주의사항
- **Edge 런타임 불가**: `firebase-admin`은 Node.js 런타임에서만 동작 (`runtime = "nodejs"` 명시)
- **세션 갱신**: 만료 임박 시 클라이언트에서 `getIdToken()` → `/api/session` POST로 갱신
- **Hasura 연동**: 서버에서 검증한 `uid`/`claims`로 권한 매핑 (Custom Claims 활용 가능)