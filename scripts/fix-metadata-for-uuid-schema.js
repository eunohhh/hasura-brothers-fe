#!/usr/bin/env node

// Metadata를 새 UUID 스키마에 맞게 수정
const fs = require('fs');
const path = require('path');

const metadataPath = path.join(__dirname, '..', 'hasura-backup', 'metadata.json');
const outputPath = path.join(__dirname, '..', 'hasura-backup', 'metadata-fixed.json');

console.log('🔧 Metadata 수정 중...');
console.log(`입력: ${metadataPath}`);
console.log(`출력: ${outputPath}`);

try {
  const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));

  // 제거할 컬럼 목록
  const columnsToRemove = ['no', 'meta_title', 'meta_description', 'meta_thumbnail_url'];

  // 각 source의 테이블들을 순회하며 컬럼 제거
  if (metadata.sources) {
    metadata.sources.forEach(source => {
      if (source.tables) {
        source.tables.forEach(table => {
          // Select permissions 수정
          if (table.select_permissions) {
            table.select_permissions.forEach(perm => {
              if (perm.permission && perm.permission.columns) {
                perm.permission.columns = perm.permission.columns.filter(
                  col => !columnsToRemove.includes(col)
                );
              }
            });
          }

          // Insert permissions 수정
          if (table.insert_permissions) {
            table.insert_permissions.forEach(perm => {
              if (perm.permission && perm.permission.columns) {
                perm.permission.columns = perm.permission.columns.filter(
                  col => !columnsToRemove.includes(col)
                );
              }
              if (perm.permission && perm.permission.set) {
                columnsToRemove.forEach(col => {
                  delete perm.permission.set[col];
                });
              }
            });
          }

          // Update permissions 수정
          if (table.update_permissions) {
            table.update_permissions.forEach(perm => {
              if (perm.permission && perm.permission.columns) {
                perm.permission.columns = perm.permission.columns.filter(
                  col => !columnsToRemove.includes(col)
                );
              }
              if (perm.permission && perm.permission.set) {
                columnsToRemove.forEach(col => {
                  delete perm.permission.set[col];
                });
              }
            });
          }

          // Delete permissions 수정 (일반적으로 컬럼 참조 없음)
          // 필터 조건에서 제거할 컬럼 참조 제거
          ['select_permissions', 'insert_permissions', 'update_permissions', 'delete_permissions'].forEach(permType => {
            if (table[permType]) {
              table[permType].forEach(perm => {
                if (perm.permission && perm.permission.filter) {
                  columnsToRemove.forEach(col => {
                    if (perm.permission.filter[col]) {
                      delete perm.permission.filter[col];
                    }
                  });
                }
              });
            }
          });

          // Configuration에서 primary_key_columns를 id로 설정
          if (table.configuration) {
            // invitation_visit_log는 bigserial id를 사용하므로 예외
            if (table.table.name !== 'invitation_visit_log') {
              table.configuration.primary_key_columns = ['id'];
            }
          }
        });
      }
    });
  }

  // 수정된 metadata 저장
  fs.writeFileSync(outputPath, JSON.stringify(metadata, null, 2));
  
  console.log('✅ Metadata 수정 완료!');
  console.log('');
  console.log('📋 제거된 컬럼들:');
  columnsToRemove.forEach(col => console.log(`  - ${col}`));
  console.log('');
  console.log('💡 다음 명령어로 복원하세요:');
  console.log('   ./scripts/restore-hasura-metadata-fixed.sh');

} catch (error) {
  console.error('❌ 오류 발생:', error.message);
  process.exit(1);
}

