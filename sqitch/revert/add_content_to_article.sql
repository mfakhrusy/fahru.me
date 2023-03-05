-- Revert fakhrusy-com:add_content_to_article from pg

BEGIN;

-- XXX Add DDLs here.

ALTER TABLE article DROP COLUMN content;

COMMIT;
