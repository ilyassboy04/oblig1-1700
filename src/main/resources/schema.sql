CREATE TABLE Billetter(
    id int AUTO_INCREMENT PRIMARY KEY,
    film varchar(63) not null,
    antall int not null,
    fornavn varchar(63) not null,
    etternavn varchar(63) not null,
    telefonnummer int not null,
    epost varchar(63) not null
);