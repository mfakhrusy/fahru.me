-- Verify fakhrusy-com:add_content_to_article on pg

BEGIN;

-- XXX Add verifications here.

SELECT 'ALTER TABLE article ADD COLUMN content TEXT;'::text AS "Expected DDL";

ROLLBACK;
