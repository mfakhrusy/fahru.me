-- Revert flipr:init_app_user from pg

BEGIN;

-- XXX Add DDLs here.

DROP TABLE app_user;

COMMIT;
