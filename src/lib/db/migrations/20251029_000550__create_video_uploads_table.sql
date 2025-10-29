-- Migration: create video_uploads table
-- Created at: 2025-10-29T00:05:50Z

-- Create video_uploads table
CREATE TABLE IF NOT EXISTS video_uploads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    status TEXT NOT NULL DEFAULT 'PENDING',
    gcs_path TEXT NOT NULL UNIQUE,
    file_name TEXT NOT NULL,
    content_type TEXT NOT NULL,
    size_bytes BIGINT,
    duration_seconds NUMERIC,
    uploaded_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add foreign key constraint to user table
-- Note: Assuming the user table exists with id column
ALTER TABLE video_uploads 
ADD CONSTRAINT fk_video_uploads_user_id 
FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_video_uploads_user_id ON video_uploads(user_id);
CREATE INDEX IF NOT EXISTS idx_video_uploads_status ON video_uploads(status);
CREATE INDEX IF NOT EXISTS idx_video_uploads_created_at ON video_uploads(created_at);
CREATE INDEX IF NOT EXISTS idx_video_uploads_gcs_path ON video_uploads(gcs_path);

-- Add check constraint for status values
ALTER TABLE video_uploads 
ADD CONSTRAINT chk_video_uploads_status 
CHECK (status IN ('PENDING', 'UPLOADED', 'READY', 'FAILED'));

-- Create trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_video_uploads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_video_uploads_updated_at
    BEFORE UPDATE ON video_uploads
    FOR EACH ROW
    EXECUTE FUNCTION update_video_uploads_updated_at();

-- Add comments for documentation
COMMENT ON TABLE video_uploads IS '영상 업로드 관리를 위한 테이블';
COMMENT ON COLUMN video_uploads.id IS '영상 레코드의 고유 ID. Hasura Mutation 및 CF에서 참조됨.';
COMMENT ON COLUMN video_uploads.user_id IS '소유권 관리의 핵심. Hasura 권한 검사에 사용됨.';
COMMENT ON COLUMN video_uploads.status IS '상태 관리의 핵심. 현재 업로드/처리 단계를 나타냄 (PENDING, UPLOADED, READY, FAILED).';
COMMENT ON COLUMN video_uploads.gcs_path IS 'GCS 버킷 내의 파일 경로 (videos/{user_id}/{unique_id}.mp4). CF에서 파일 참조 및 삭제 시 사용됨.';
COMMENT ON COLUMN video_uploads.file_name IS '사용자가 업로드한 원본 파일 이름 (FE에서 받은 정보).';
COMMENT ON COLUMN video_uploads.content_type IS '파일의 MIME 타입 (Pre-signed URL 생성 시 사용).';
COMMENT ON COLUMN video_uploads.size_bytes IS '파일 크기 (바이트). CF에서 GCS 완료 후 메타데이터로 업데이트됨.';
COMMENT ON COLUMN video_uploads.duration_seconds IS '영상 길이(초). 후처리 시스템에서 분석 후 업데이트됨.';
COMMENT ON COLUMN video_uploads.uploaded_at IS 'CF_Finalize가 실행되어 UPLOADED 상태가 되었을 때의 시간.';
COMMENT ON COLUMN video_uploads.created_at IS '레코드가 처음 생성된 시간 (BE가 PENDING으로 예약한 시간). 클린업 로직에서 PENDING 레코드의 만료 시간을 판단하는 기준으로 사용됨.';
COMMENT ON COLUMN video_uploads.updated_at IS '마지막 상태 변경 시간 (Hasura Trigger 또는 BE/CF에서 업데이트).';
