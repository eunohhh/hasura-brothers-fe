// app/api/upload/complete/route.ts

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  InsertVideoUploadMutation,
  InsertVideoUploadMutationVariables,
} from "@/generated/graphql";
import { INSERT_VIDEO_UPLOAD } from "@/graphql/mutations";
import { getAdminClient } from "@/lib/apollo/server-admin";
import { verifyJWTToken } from "@/lib/auth/token-server-utils";
import { COMMON_CONSTS } from "@/lib/constants/consts-common";

export async function POST(request: NextRequest) {
  try {
    // 1. (필수) 사용자 인증 확인 - 쿠키 기반
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(
      COMMON_CONSTS.COOKIE_ACCESS_TOKEN,
    )?.value;

    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { payload } = await verifyJWTToken(accessToken);
    if (!payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = payload.sub;

    // 2. 클라이언트로부터 파일 정보 받기
    const body = await request.json();
    const { gcsFilePath, originalFileName, fileType, fileSize } = body;

    if (
      !gcsFilePath ||
      !originalFileName ||
      !fileType ||
      fileSize === undefined
    ) {
      return NextResponse.json(
        { error: "Missing required file data" },
        { status: 400 },
      );
    }

    // 3. Hasura 뮤테이션 실행
    const client = getAdminClient();
    const { data, error } = await client.mutate<
      InsertVideoUploadMutation,
      InsertVideoUploadMutationVariables
    >({
      mutation: INSERT_VIDEO_UPLOAD,
      variables: {
        user_id: userId,
        file_name: originalFileName,
        gcs_path: gcsFilePath,
        content_type: fileType,
        size_bytes: fileSize,
      },
    });

    if (error) {
      console.error("Hasura error ====>", error);
      // [롤백 정책] 여기서 GCS 파일 삭제 로직을 추가할 수 있습니다.
      return NextResponse.json(
        { error: "Failed to save file metadata." },
        { status: 500 },
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "Failed to save file metadata." },
        { status: 500 },
      );
    }

    // 4. 성공 응답 반환
    return NextResponse.json(data, { status: 201 }); // 201 Created
  } catch (error) {
    console.error("Error notifying upload:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
