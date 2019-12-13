


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


INSERT INTO users(name,email,username,password,address,usertype) VALUES('siwe','siwe@gmail.com','siwe','siwe123','Test adress','admin');
