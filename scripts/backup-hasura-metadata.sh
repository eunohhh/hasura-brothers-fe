#!/bin/bash

# Hasura Metadata 백업 스크립트
# 사용법: ./backup-hasura-metadata.sh

# .env.local에서 설정 읽기
if [ -f .env.local ]; then
  export $(cat .env.local | grep -v '^#' | xargs)
fi

HASURA_ENDPOINT="${HASURA_GRAPHQL_ENDPOINT}"
ADMIN_SECRET="${HASURA_ADMIN_SECRET}"

# v1/graphql을 v1/metadata로 변경
METADATA_ENDPOINT="${HASURA_ENDPOINT%/v1/graphql}/v1/metadata"

echo "🔄 Hasura Metadata 백업 중..."
echo "Endpoint: ${METADATA_ENDPOINT}"

curl -X POST \
  -H "Content-Type: application/json" \
  -H "x-hasura-admin-secret: ${ADMIN_SECRET}" \
  -d '{"type":"export_metadata","args":{}}' \
  "${METADATA_ENDPOINT}" \
  -o hasura-backup/metadata.json

if [ $? -eq 0 ]; then
  echo "✅ 백업 완료: hasura-backup/metadata.json"
  echo ""
  echo "📊 백업된 메타데이터 크기:"
  ls -lh hasura-backup/metadata.json
else
  echo "❌ 백업 실패"
  exit 1
fi

