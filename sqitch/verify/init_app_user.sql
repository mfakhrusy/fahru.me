-- Verify flipr:init_app_user on pg

BEGIN;

-- XXX Add verifications here.
SELECT id
     , username
     , password_hash
  FROM app_user
 WHERE FALSE;

ROLLBACK;
