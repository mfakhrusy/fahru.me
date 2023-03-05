-- Verify fakhrusy-com:init_article on pg

BEGIN;

-- XXX Add verifications here.

SELECT 'CREATE TABLE article (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);'::text AS "Expected DDL";

ROLLBACK;
