-- Deploy fakhrusy-com:add_content_to_article to pg

BEGIN;

-- XXX Add DDLs here.

ALTER TABLE article ADD COLUMN content TEXT;

COMMIT;
