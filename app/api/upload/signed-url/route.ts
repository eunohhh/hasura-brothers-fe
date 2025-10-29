import { Storage } from "@google-cloud/storage";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { env } from "@/env";

// GCS 클라이언트 설정 (환경 변수 사용)
// Cloud Run 런타임 계정 사용 시: new Storage()만 호출
const storage = new Storage({
  projectId: env.GCS_PROJECT_ID,
  credentials: {
    client_email: env.GCS_CLIENT_EMAIL,
    // GCS_PRIVATE_KEY는 \n을 포함한 전체 문자열이어야 합니다.
    private_key: env.GCS_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
});

const bucketName = env.GCS_BUCKET_NAME as string;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const originalFileName = searchParams.get("fileName");
    const fileType = searchParams.get("fileType");
    const userName = searchParams.get("userName");

    if (!originalFileName || !fileType || !userName) {
      return NextResponse.json(
        { error: "fileName, fileType, and userName are required" },
        { status: 400 },
      );
    }

    // 1. UUID와 확장자를 조합하여 고유한 파일 경로 생성
    const uniqueGcsPath = `${userName}/${uuidv4()}.${fileType}`;

    // 2. Pre-signed URL 생성 옵션
    const options = {
      version: "v4" as const,
      action: "write" as const,
      expires: Date.now() + 30 * 60 * 1000, // 30분
      contentType: fileType, // 클라이언트에서 보낸 파일 타입
    };

    // 3. URL 생성
    const [url] = await storage
      .bucket(bucketName)
      .file(uniqueGcsPath)
      .getSignedUrl(options);

    // 4. 클라이언트에 URL과 GCS 경로 반환
    return NextResponse.json(
      { url, gcsFilePath: uniqueGcsPath },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return NextResponse.json(
      { error: "Failed to generate upload URL." },
      { status: 500 },
    );
  }
}
