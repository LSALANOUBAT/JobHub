CREATE TABLE Companies (
    Id SERIAL PRIMARY KEY,
    Name VARCHAR(255) UNIQUE NOT NULL,
    Description TEXT NOT NULL,
    Employees SMALLINT
);

CREATE TABLE Advertisements (
    Id SERIAL PRIMARY KEY,
    CompanyId SMALLINT NOT NULL,
    Title VARCHAR(255) NOT NULL,
    Description TEXT NOT NULL,
    Location VARCHAR(255) NOT NULL,
    Wage INT NOT NULL,
    PostDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Contact VARCHAR(255) NOT NULL,
    FOREIGN KEY (CompanyId) REFERENCES Companies(Id)
);

CREATE TABLE Users (
    Id SERIAL PRIMARY KEY,
    LastName VARCHAR(255) NOT NULL,
    FirstName VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    IsAdmin BOOLEAN DEFAULT FALSE,
    Email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE JobApplications (
    Id SERIAL PRIMARY KEY,
    AdvertisementId SMALLINT NOT NULL,
    CompanyId SMALLINT NOT NULL,
    ApplicationDate TIMESTAMP NOT NULL,
    Email VARCHAR(255) NOT NULL,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    FOREIGN KEY (AdvertisementId) REFERENCES Advertisements(Id),
    FOREIGN KEY (CompanyId) REFERENCES Companies(Id)
);

INSERT INTO Companies (Name, Description, Employees) VALUES ('Apple', 'blablablabla', 450);
INSERT INTO Companies (Name, Description, Employees) VALUES ('Intel', 'bloblobloblo', 300);
INSERT INTO Companies (Name, Description, Employees) VALUES ('Microsoft', 'blublublublu', 150);
INSERT INTO Advertisements (Title, CompanyId, Description, Location, Wage, Contact) 
VALUES ('Déveloper', 1, 'blablablabla', 'Paris', 1500, 'eliott.poulain@epitech.eu');
INSERT INTO Advertisements (Title, CompanyId, Description, Location, Wage, Contact) 
VALUES ('Déveloper', 2, 'blablablabla', 'Marseille', 3000, 'eliott.poulain@epitech.eu');
INSERT INTO Advertisements (Title, CompanyId, Description, Location, Wage, Contact) 
VALUES ('Déveloper', 3, 'blablablabla', 'Lyon', 2000, 'eliott.poulain@epitech.eu');
INSERT INTO Users (LastName, FirstName, Password, Email)
VALUES ('Eliott', 'Poulain', 'blabla', 'eliott.poulain@epitech.eu');
INSERT INTO Users (LastName, FirstName, Password, IsAdmin, Email)
VALUES ('Louis', 'Salanoubat', 'blabla', TRUE, 'louis.salanoubat@epitech.eu');
