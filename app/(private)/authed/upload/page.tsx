"use client";

import * as axiosClient from "axios";
import { ChangeEvent, useState } from "react";
import { InsertVideoUploadMutation } from "@/generated/graphql";
import axios from "@/lib/axios/axios-client";

function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setStatusMessage("");
      setUploadProgress(0);
    }
  };

  // 아래 handleSubmit 예시를 훅 등으로 많이 추상화해야 할 것 같습니다.
  const handleSubmit = async () => {
    if (!file) {
      setStatusMessage("파일을 먼저 선택해주세요.");
      return;
    }

    setIsLoading(true);
    setStatusMessage("업로드 준비 중...");
    setUploadProgress(0);

    try {
      // --- [요청 1 & 2] Pre-signed URL 요청 ---
      // 저희는 여기도 axios 써도 될 것 같습니다.
      setStatusMessage("업로드 URL 요청 중...");
      const signedUrlResponse = await axios.get<{
        url: string;
        gcsFilePath: string;
      }>(
        `/api/upload/signed-url?fileName=${encodeURIComponent(
          file.name,
        )}&fileType=${encodeURIComponent(file.type)}`,
      );

      const { url, gcsFilePath } = signedUrlResponse;

      // --- [GCS 업로드 3] 파일을 GCS로 직접 PUT ---
      setStatusMessage("파일 업로드 중...");
      const gcsAxios = axiosClient.default.create({
        baseURL: url,
      });
      await gcsAxios.put(url, file, {
        headers: {
          "Content-Type": file.type,
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            );
            setUploadProgress(percentCompleted);
          }
        },
      });

      setStatusMessage("업로드 완료! DB에 저장 중...");
      setUploadProgress(100);

      // --- [요청 4 & 5] 업로드 완료 알림 (DB 저장) ---
      const completeResponse = await axios.post<InsertVideoUploadMutation>(
        "/api/upload/complete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            gcsFilePath: gcsFilePath,
            originalFileName: file.name,
            fileType: file.type,
            fileSize: file.size,
          }),
        },
      );

      setStatusMessage(
        `성공! 파일 ID: ${completeResponse.insert_video_uploads_one?.id}`,
      );
      setFile(null); // 성공 시 파일 선택 초기화
      // 폼 초기화
      (document.getElementById("file-input") as HTMLInputElement).value = "";
    } catch (error: any) {
      console.error(error);
      setStatusMessage(`오류 발생: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3>GCS Pre-signed URL 업로드</h3>
      <input
        id="file-input"
        type="file"
        accept="video/*,image/*" // 예시: 비디오와 이미지
        onChange={handleFileChange}
        disabled={isLoading}
      />
      <button
        type="button"
        onClick={handleSubmit}
        disabled={isLoading || !file}
      >
        {isLoading ? `업로드 중... ${uploadProgress}%` : "업로드"}
      </button>

      {/* 진행률 표시 바 */}
      {isLoading && (
        <progress
          value={uploadProgress}
          max="100"
          style={{ width: "100%", marginTop: "10px" }}
        />
      )}

      {/* 상태 메시지 */}
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
}

export default UploadPage;
