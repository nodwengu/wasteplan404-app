


CREATE TABLE issues(
    issueId SERIAL NOT NULL PRIMARY KEY,
    status BOOLEAN NOT NULL,
    date DATE NOT NULL, 
    type TEXT NOT NULL DEFAULT '',
    longitude DECIMAL (10, 2)  NOT NULL,
    latitude DECIMAL (10, 2) NOT NULL,
    userId INT NOT NULL,
    foreign key (userId) references users(id)
);

CREATE TABLE users(
    id SERIAL NOT NULL  PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    address TEXT NOT NULL,
    userType TEXT NOT NULL
);


INSERT INTO colors(color_name) VALUES('Red'),('Black'),('White'),('Pink');

INSERT INTO brands(brand_name) VALUES('Nike'),('Adidas'),('Puma'),('Allstar');

INSERT INTO sizes(size) VALUES(9),(10),(5),(1);
