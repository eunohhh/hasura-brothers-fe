#!/bin/bash

# Hasura Primary Key 설정 스크립트
# UUID를 primary key로 설정

source .env.local

HASURA_ENDPOINT="http://3.38.152.179:8080/v1/metadata"

echo "🔧 Hasura Primary Keys 설정 중..."

# Primary key가 id (uuid)인 테이블들
TABLES_WITH_ID_PK=(
  "user"
  "invitation"
  "invitation_owner"
  "invitation_editor"
  "widget"
  "invitation_attachment"
  "invitation_share"
  "order"
  "template"
  "invitation_comment"
  "coupon"
  "coupon_using_history"
  "invitation_rsvp_answer"
  "widget_sticker"
)

for table in "${TABLES_WITH_ID_PK[@]}"; do
  echo "  → $table 테이블 primary key 설정: id"
  
  curl -s -X POST \
    -H "Content-Type: application/json" \
    -H "x-hasura-admin-secret: ${HASURA_ADMIN_SECRET}" \
    -d "{
      \"type\": \"pg_set_table_customization\",
      \"args\": {
        \"source\": \"default\",
        \"table\": {
          \"schema\": \"public\",
          \"name\": \"$table\"
        },
        \"configuration\": {
          \"identifier\": \"$table\",
          \"custom_root_fields\": {},
          \"custom_column_names\": {},
          \"primary_key_columns\": [\"id\"]
        }
      }
    }" \
    "$HASURA_ENDPOINT" > /dev/null
done

# invitation_visit_log는 id가 아닌 bigserial
echo "  → invitation_visit_log 테이블 primary key 설정: id (bigserial)"
curl -s -X POST \
  -H "Content-Type: application/json" \
  -H "x-hasura-admin-secret: ${HASURA_ADMIN_SECRET}" \
  -d '{
    "type": "pg_set_table_customization",
    "args": {
      "source": "default",
      "table": {
        "schema": "public",
        "name": "invitation_visit_log"
      },
      "configuration": {
        "identifier": "invitation_visit_log",
        "custom_root_fields": {},
        "custom_column_names": {},
        "primary_key_columns": ["id"]
      }
    }
  }' \
  "$HASURA_ENDPOINT" > /dev/null

echo ""
echo "✅ Primary Keys 설정 완료!"
echo ""
echo "🔍 검증 중..."

# 검증
source .env.local
curl -s -X POST \
  -H "Content-Type: application/json" \
  -H "x-hasura-admin-secret: ${HASURA_ADMIN_SECRET}" \
  -d '{"type":"export_metadata","args":{}}' \
  "$HASURA_ENDPOINT" \
  | jq -r '.sources[0].tables[] | select(.configuration.primary_key_columns != null) | .table.name + " → PK: " + (.configuration.primary_key_columns | join(", "))'

echo ""
echo "✨ 완료! 이제 pnpm codegen을 실행하세요."

