#!/bin/bash

# Hasura Metadata 복원 스크립트
# 사용법: ./restore-hasura-metadata.sh

# .env.local에서 설정 읽기
if [ -f .env.local ]; then
  export $(cat .env.local | grep -v '^#' | xargs)
fi

HASURA_ENDPOINT="${HASURA_GRAPHQL_ENDPOINT}"
ADMIN_SECRET="${HASURA_ADMIN_SECRET}"

# v1/graphql을 v1/metadata로 변경
METADATA_ENDPOINT="${HASURA_ENDPOINT%/v1/graphql}/v1/metadata"

if [ ! -f hasura-backup/metadata.json ]; then
  echo "❌ 백업 파일을 찾을 수 없습니다: hasura-backup/metadata.json"
  echo "먼저 backup-hasura-metadata.sh를 실행하세요."
  exit 1
fi

echo "🔄 Hasura Metadata 복원 중..."
echo "Endpoint: ${METADATA_ENDPOINT}"

# 1. 기존 메타데이터 초기화
curl -X POST \
  -H "Content-Type: application/json" \
  -H "x-hasura-admin-secret: ${ADMIN_SECRET}" \
  -d '{"type":"clear_metadata","args":{}}' \
  "${METADATA_ENDPOINT}" \
  > /dev/null 2>&1

# 2. 메타데이터 복원
METADATA=$(cat hasura-backup/metadata.json)

curl -X POST \
  -H "Content-Type: application/json" \
  -H "x-hasura-admin-secret: ${ADMIN_SECRET}" \
  -d "{\"type\":\"replace_metadata\",\"args\":${METADATA}}" \
  "${METADATA_ENDPOINT}"

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ 복원 완료!"
else
  echo ""
  echo "❌ 복원 실패"
  exit 1
fi

