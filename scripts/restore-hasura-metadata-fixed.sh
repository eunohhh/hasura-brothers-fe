#!/bin/bash

# 수정된 Hasura Metadata 복원 스크립트
# 사용법: ./restore-hasura-metadata-fixed.sh

# .env.local에서 설정 읽기
if [ -f .env.local ]; then
  export $(cat .env.local | grep -v '^#' | xargs)
fi

HASURA_ENDPOINT="${HASURA_GRAPHQL_ENDPOINT}"
ADMIN_SECRET="${HASURA_ADMIN_SECRET}"

# v1/graphql을 v1/metadata로 변경
METADATA_ENDPOINT="${HASURA_ENDPOINT%/v1/graphql}/v1/metadata"

if [ ! -f hasura-backup/metadata-fixed.json ]; then
  echo "❌ 수정된 백업 파일을 찾을 수 없습니다: hasura-backup/metadata-fixed.json"
  echo "먼저 node scripts/fix-metadata-for-uuid-schema.js를 실행하세요."
  exit 1
fi

echo "🔄 수정된 Hasura Metadata 복원 중..."
echo "Endpoint: ${METADATA_ENDPOINT}"
echo ""

# 1. 기존 메타데이터 초기화
echo "1️⃣  기존 metadata 초기화..."
curl -s -X POST \
  -H "Content-Type: application/json" \
  -H "x-hasura-admin-secret: ${ADMIN_SECRET}" \
  -d '{"type":"clear_metadata","args":{}}' \
  "${METADATA_ENDPOINT}" \
  > /dev/null 2>&1

# 2. 메타데이터 복원
echo "2️⃣  수정된 metadata 복원..."
METADATA=$(cat hasura-backup/metadata-fixed.json)

RESULT=$(curl -s -X POST \
  -H "Content-Type: application/json" \
  -H "x-hasura-admin-secret: ${ADMIN_SECRET}" \
  -d "{\"type\":\"replace_metadata\",\"args\":${METADATA}}" \
  "${METADATA_ENDPOINT}")

# 에러 체크
if echo "$RESULT" | grep -q '"error"'; then
  echo ""
  echo "❌ 복원 실패!"
  echo "$RESULT" | jq '.'
  exit 1
fi

# 3. Primary keys 재설정
echo "3️⃣  Primary keys 재설정..."
./scripts/fix-hasura-primary-keys.sh > /dev/null 2>&1

echo ""
echo "✅ 복원 완료!"
echo ""
echo "🔍 Metadata 상태 확인..."

# 일관성 체크
INCONSISTENCIES=$(curl -s -X POST \
  -H "Content-Type: application/json" \
  -H "x-hasura-admin-secret: ${ADMIN_SECRET}" \
  -d '{"type":"get_inconsistent_metadata","args":{}}' \
  "${METADATA_ENDPOINT}")

INCONSISTENT_COUNT=$(echo "$INCONSISTENCIES" | jq '.inconsistent_objects | length')

if [ "$INCONSISTENT_COUNT" = "0" ]; then
  echo "✅ Metadata 일관성 확인 완료 - 문제 없음"
else
  echo "⚠️  경고: ${INCONSISTENT_COUNT}개의 inconsistent objects 발견"
  echo "$INCONSISTENCIES" | jq '.inconsistent_objects[] | {type: .type, reason: .reason}'
fi

echo ""
echo "🎉 완료! 이제 pnpm codegen을 실행하세요."

