// app/api/notify-upload-complete/route.ts

import { NextRequest, NextResponse } from "next/server";
import {
  InsertVideoUploadMutation,
  InsertVideoUploadMutationVariables,
} from "@/generated/graphql";
import { INSERT_VIDEO_UPLOAD } from "@/graphql/mutations";
import { getAdminClient } from "@/lib/apollo/server-admin";
// getHasuraAdminClient는 Hasura 연결을 위한 Apollo Client 또는 유사 클라이언트입니다.
// (예시 코드는 바로 아래 '보너스' 섹션 참고)
// auth()는 Next-Auth, Clerk, Lucia 등 사용하는 인증 라이브러리의 세션 함수입니다.
// import { auth } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // 1. (필수) 사용자 인증 확인
    // const session = await auth();
    // if (!session?.user?.id) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }
    // const userId = session.user.id;

    // (임시) 인증을 건너뛰고 userId 하드코딩 (실제로는 위 주석 사용)
    const userId = "temp-user-id-123";

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

    // 3. Hasura Admin 클라이언트 가져오기
    const client = getAdminClient();

    // 4. Hasura 뮤테이션 실행
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

    // 5. 성공 응답 반환
    return NextResponse.json(data, { status: 201 }); // 201 Created
  } catch (error) {
    console.error("Error notifying upload:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
