import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * 공식 예제: https://env.t3.gg/docs/nextjs
 * 도커 사용 시 예제 : https://create.t3.gg/en/deployment/docker
 * NODE_ENV와 같은 Next.js 내장 변수는 env.ts에 선언하지 않음 (ex: process.env.NODE_ENV 그대로 사용)
 * SKIP_ENV_VALIDATION: Docker 빌드 시점에서만 임시로 사용하므로, .env나 시크릿 매니저에 저장하지 않음
 */

export const env = createEnv({
	server: {
		HASURA_GRAPHQL_ENDPOINT: z.string().min(1),
		HASURA_ADMIN_SECRET: z.string().min(1),
		HASURA_JWT_SECRET: z.string().min(1),
		GOOGLE_CLIENT_ID: z.string().min(1),
		GOOGLE_CLIENT_SECRET: z.string().min(1),
		KAKAO_CLIENT_ID: z.string().min(1),
		KAKAO_CLIENT_SECRET: z.string().min(1),
	},
	client: {
		NEXT_PUBLIC_GRAPHQL_ENDPOINT: z.string().min(1),
	},
	// For Next.js >= 13.4.4, you only need to destructure client variables:
	experimental__runtimeEnv: {
		NEXT_PUBLIC_GRAPHQL_ENDPOINT: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
	},
	// 서버 변수가 주입되지 않는 Docker 빌드 시에는 환경 변수 검증 생략 (Local, Cloud Run에서는 환경 변수 검증 진행)
	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
