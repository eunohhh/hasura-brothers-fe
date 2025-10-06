-- 현재 primary key 제약조건 확인
SELECT
    tc.table_name,
    kcu.column_name,
    tc.constraint_type
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
WHERE tc.table_schema = 'public'
    AND tc.constraint_type = 'PRIMARY KEY'
ORDER BY tc.table_name;

-- 각 테이블의 컬럼 정보
SELECT 
    table_name, 
    column_name, 
    data_type,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public'
    AND table_name IN ('user', 'invitation', 'widget')
    AND column_name IN ('id', 'no')
ORDER BY table_name, ordinal_position;

