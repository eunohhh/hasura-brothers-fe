#!/bin/bash

# Hasura에서 video_uploads 테이블 추적 스크립트
# 사용법: ./track-video-uploads-table.sh

# .env.local에서 설정 읽기
if [ -f .env.local ]; then
  export $(cat .env.local | grep -v '^#' | xargs)
fi

HASURA_ENDPOINT="${HASURA_GRAPHQL_ENDPOINT}"
ADMIN_SECRET="${HASURA_ADMIN_SECRET}"

# v1/graphql을 v1/metadata로 변경
METADATA_ENDPOINT="${HASURA_ENDPOINT%/v1/graphql}/v1/metadata"

echo "🔄 video_uploads 테이블을 Hasura에서 추적하도록 설정 중..."
echo "Endpoint: ${METADATA_ENDPOINT}"
echo ""

# video_uploads 테이블 추적
echo "1️⃣  video_uploads 테이블 추적 설정..."
RESULT=$(curl -s -X POST \
  -H "Content-Type: application/json" \
  -H "x-hasura-admin-secret: ${ADMIN_SECRET}" \
  -d '{
    "type": "pg_track_table",
    "args": {
      "source": "default",
      "table": {
        "schema": "public",
        "name": "video_uploads"
      },
      "configuration": {
        "identifier": "video_uploads",
        "custom_root_fields": {},
        "custom_column_names": {},
        "primary_key_columns": ["id"]
      }
    }
  }' \
  "${METADATA_ENDPOINT}")

# 에러 체크
if echo "$RESULT" | grep -q '"error"'; then
  echo ""
  echo "❌ 테이블 추적 실패!"
  echo "$RESULT" | jq '.'
  exit 1
fi

echo "✅ video_uploads 테이블 추적 완료!"

# 테이블이 추적되었는지 확인
echo ""
echo "🔍 추적된 테이블 확인..."
curl -s -X POST \
  -H "Content-Type: application/json" \
  -H "x-hasura-admin-secret: ${ADMIN_SECRET}" \
  -d '{"type":"export_metadata","args":{}}' \
  "${METADATA_ENDPOINT}" \
  | jq -r '.sources[0].tables[] | select(.table.name == "video_uploads") | "✅ " + .table.name + " 테이블이 추적되고 있습니다."'

echo ""
echo "🎉 완료! 이제 Hasura 콘솔에서 video_uploads 테이블을 확인할 수 있습니다."
echo "💡 권한 설정이 필요하다면 Hasura 콘솔의 Permissions 탭에서 설정하세요."
