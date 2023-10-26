ALTER TABLE jobapplications
DROP CONSTRAINT jobapplications_advertisementid_fkey;

ALTER TABLE jobapplications
ADD CONSTRAINT jobapplications_advertisementid_fkey
FOREIGN KEY (advertisementid) REFERENCES advertisements(id) ON DELETE CASCADE;

ALTER TABLE Advertisements
DROP CONSTRAINT advertisements_companyid_fkey;

ALTER TABLE Advertisements
ADD CONSTRAINT advertisements_companyid_fkey
FOREIGN KEY (companyid) REFERENCES companies(id) ON DELETE CASCADE;