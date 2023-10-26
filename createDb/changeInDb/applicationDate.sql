ALTER TABLE jobapplications ALTER COLUMN applicationdate DROP NOT NULL;
ALTER TABLE jobapplications ALTER COLUMN applicationdate SET DEFAULT CURRENT_TIMESTAMP;