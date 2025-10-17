# Firebase Auth vs Custom PKCE Discussion

## Turn 1

**User**  
현재 레포는 직접 엑세스토큰과 리프레시토큰을 구현하였는데(PKCE) https://firebase.google.com/docs/auth?hl=ko 여기와(firebase auth) 비교했을때 장단점이 무엇일까요? 제가 예전에 firebaseauth 를 next.js app router 와 썼을때 서버사이드 설정이 좀 복잡했고 공식 문서에 없었던 것 같은 느낌은 있어요

**Assistant**  
직접 구현한 PKCE 기반 액세스·리프레시 토큰 방식과 Firebase Auth를 비교하면 다음과 같습니다.

- 보안/표준: PKCE를 직접 구현하면 OAuth2/OpenID의 흐름을 정확히 이해하고 맞춰야 하므로 설계와 검증 부담이 큽니다. Firebase Auth는 이미 검증된 구현과 내장 방어(예: 토큰 서명, 비정상 패턴 감지)가 있어 기본 보안 수준이 높은 편입니다.
- 기능 확장성: 커스텀 구현은 원하는 UX·비즈니스 규칙(세분화된 권한, 특수 토큰 수명 관리 등)을 자유롭게 넣을 수 있습니다. Firebase Auth는 기본 인증 시나리오에 최적화돼 있고, 추가 정책은 Cloud Functions/Firebase Extensions로 우회해야 합니다.
- 인프라 운영: 직접 구현 시 키 관리, 로그·모니터링, 장애 대응을 모두 떠안습니다. Firebase Auth는 Google 인프라 위에서 이 부분을 거의 대신해주고 SLA, 모니터링 대시보드, 규정 준수 자료를 제공합니다.
- 서버 사이드 렌더링 연동: Next.js App Router에서 직접 구현한 토큰을 쿠키나 헤더로 주고받으며 SSR에 공급하는 건 비교적 단순합니다. Firebase Auth는 클라이언트 SDK 중심이라 SSR/Edge 환경에서 getIdToken→verifyIdToken 과정을 직접 연결해야 하고, 공식 문서가 App Router 최신 패턴을 깊이 다루지 않아 설정이 번거롭다는 점이 실제로 보고됩니다.
- 유지보수/장기 운영: 팀 내 인증 전문성이 있고 요구사항이 자주 변한다면 커스텀 구현이 유연합니다. 그렇지 않다면 Firebase Auth 쪽이 새 기능(예: 멀티 팩터, 패스키) 도입이나 취약점 패치에 빠르게 따라갈 수 있습니다.
- 비용: 자체 구현은 사용량 증가에 따른 직접 비용은 낮지만 개발·보안 유지 리소스가 숨은 비용입니다. Firebase Auth는 일정 호출량까지 무료지만 대규모 사용 시 과금 구조를 미리 검토해야 합니다.

다음 단계가 필요하다면: 1) 보안 감사나 페어 리뷰로 현재 PKCE 구현 취약점 점검, 2) App Router에서 Firebase Auth를 다시 검토하며 SSR 패턴(예: firebase-admin 토큰 검증 + 미들웨어)을 프로토타입, 3) 요구 기능 목록과 비용/운영 부담을 비교한 결정표 작성 등을 고려할 수 있습니다.

## Turn 2

**User**  
Firebase Auth는 클라이언트 SDK 중심이라 SSR/Edge 환경에서getIdToken→verifyIdToken 과정을 직접 연결해야 한다는 것이, SDK 자체가 client side 에 맞춰져 있어서 그렇죠?

**Assistant**  
맞아요. Firebase Auth는 애초에 브라우저나 모바일 앱에서 돌아가는 클라이언트 SDK를 기준으로 설계돼 있습니다. 그래서 토큰 발급은 클라이언트 SDK(firebase/auth)가 담당하고, 서버에서는 별도 패키지(firebase-admin)로 그 토큰을 검증하는 흐름을 수동으로 이어 붙여야 해요. Next.js App Router처럼 SSR/Edge 코드에선

- 클라이언트에서 getIdToken()으로 ID 토큰을 확보하고(보통 쿠키나 헤더에 실어 전달)
- 서버/Edge에서 firebase-admin의 verifyIdToken()으로 직접 검증하고 세션화를 처리

하는 과정을 개발자가 직접 관리해야 합니다. 공식 문서도 SPA 기준으로 서술된 부분이 많다 보니, SSR/Edge 통합에 필요한 쿠키 설정, 토큰 갱신, 인증 상태 공유 패턴 등을 스스로 정리해야 해서 더 복잡하게 느껴지는 거죠.

## Turn 3

**User**  
제가 전에 firebase auth 를 써봤을때는 말씀하신대로 client 에서는 SDK, 서버에서는 firebase-admin 패키지로 했던 것 같은데, 이때 어드민 설정 같은 것을 구글 파이어베이스 대시보드에서 또 하고 그랬던 것 같아요.

**Assistant**  
맞습니다. 서버에서 firebase-admin을 쓰려면 Firebase 콘솔에서 몇 가지 “관리자” 설정을 더 거쳐야 해서 초기 설정이 더 번거롭습니다.

- Firebase 프로젝트에서 서비스 계정 키(JWT 서명용)를 발급해 환경 변수나 비공개 스토리지에 올리고, firebase-admin 초기화 시 credential.cert(...)로 주입해야 합니다. (또는 applicationDefault()로 Google Cloud에 맞춘 워크로드 ID 사용)
- 실시간 DB/Firestore, Storage 같은 리소스 권한도 콘솔에서 보안 규칙을 따로 세팅해야 하고, 관리 SDK는 기본적으로 관리자 권한이라서 별도 권한 분리를 고민해야 합니다.
- 콘솔에서 OAuth 리디렉션 도메인 등록, 이메일 템플릿 설정, 멀티팩터 정책 등 사용자 관리 쪽도 필요하면 추가로 구성해야 합니다.

이렇게 클라이언트 SDK 외에 콘솔/서비스 계정 세팅을 병행해야 해서 “클라이언트만 붙이면 된다”는 느낌이 거의 없어지는 편이죠. 반면 직접 구현한 PKCE 방식은 이런 외부 콘솔 관리가 없어서 단일 코드베이스 안에서 끝낼 수 있다는 장점이 있습니다.

## Turn 4

**User**  
그렇군요! 아 또 중요한게, 저희의 hasura 기반 postgreSQL 데이터베이스를 써야 하고 firebase db 를 쓰면 안되는데 이건 가능한거죠?

**Assistant**  
가능합니다. Firebase Auth는 인증(Identity provider) 역할만 하고, 애플리케이션 데이터는 원하는 백엔드나 DB를 그대로 쓸 수 있어요. 많은 팀이 Firebase Auth로 사용자 등록·로그인을 처리하고, 토큰을 검증한 뒤 자체 API나 Hasura/PostgreSQL 같은 외부 데이터 계층과 연동합니다.

Hasura와 조합하려면 Hasura가 기대하는 JWT 스키마에 맞춰 Firebase ID 토큰을 해석하거나, 필요한 경우 Custom Claims를 추가해 권한 정보를 담는 방식으로 연결하면 됩니다. 흐름은 보통:

- 클라이언트에서 Firebase Auth로 로그인 → ID 토큰 획득
- 이 토큰을 Hasura/서버에 전달 (쿠키나 헤더)
- 서버 또는 Hasura에서 firebase-admin으로 토큰 검증 후, 토큰에 들어있는 sub, email, claims 등을 기준으로 권한 매핑
- 필요한 경우 토큰에 맞춘 Hasura의 JWT 설정(HASURA_GRAPHQL_JWT_SECRET) 조정

즉 Firebase Auth를 쓰더라도 데이터 저장은 전혀 Firebase DB에 종속되지 않습니다. 만약 토큰 구조나 권한 매핑이 고민된다면 1) Hasura의 JWT 설정과 Firebase ID 토큰의 claim 구조를 비교해 맞춰보고, 2) 필요한 Custom Claims를 발급하는 Cloud Function/서버 로직을 준비하는 순으로 검토해보시면 좋겠습니다.

## Turn 5

**User**  
혹시 firebase auth 도 PKCE 를 지원하나요?

**Assistant**  
네, 지원합니다. Firebase Auth 클라이언트 SDK는 OAuth/OIDC 연동 시 기본적으로 PKCE(Proof Key for Code Exchange)를 사용하도록 설계돼 있습니다.

- 웹 SDK (signInWithRedirect, signInWithPopup, signInWithAuthProvider 등)으로 Google·GitHub 같은 OAuth 공급자나 OIDC 커스텀 프로바이더를 붙이면 SDK가 내장된 PKCE 흐름을 통해 code_verifier/code_challenge를 자동으로 생성·검증합니다. 개발자가 따로 PKCE를 켜거나 구현할 필요가 없어요.
- iOS/Android SDK도 동일하게, OAuth/OIDC 기반 인증을 사용할 때 Authorization Code + PKCE 조합을 내부에서 처리합니다.
- REST API (Identity Toolkit v1)도 code와 함께 codeVerifier 필드를 보내는 식의 PKCE 사용을 지원합니다. 다만 REST 레벨에서 직접 다루려면 값을 직접 넣어줘야 합니다.

반면 이메일/비밀번호나 커스텀 토큰, 전화번호 인증처럼 OAuth 코드 흐름이 없는 시나리오에는 PKCE 자체가 필요하지 않습니다. 따라서 OAuth 계열을 Firebase Auth로 붙이면 PKCE 보안 레벨은 확보된다고 보시면 됩니다.

## Turn 6

**User**  
이 대화 내용을 md 로 저장해주실 수 있어요?

**Assistant**  
(현재 파일이 바로 그 결과물입니다.)
