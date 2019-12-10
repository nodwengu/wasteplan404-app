# Waste Management API 
 An API used to create an app that allows management of illegal dumping easy

## Getting Started

For development, you will only need Node.js and a node global package, npm, installed in your environement.

## Prerequisites
Things you need to install and how to install them?
- NodeJS
- PostgreSQL
- Package.json dependencies

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! After running the following command, just open again the command line.

    $ npm install npm -g

###

## Install

    $ git clone https://github.com/nodwengu/wasteplan404-app.git
    $ cd wasteplan404-app
    $ npm install

### Install PostgreSQL

You can install PostgreSQL on Ubuntu using these commands:

```
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
```

### Database setup

Once you have all the above installed you need to setup the database.

Create a database called `wasteplan_db` and username - `coder` with a password of `pg123`. Enter the password when prompted after executing the `createuser` command. 

```
sudo -u postgres createdb wasteplan_db;
sudo -u postgres createuser coder -P;
```

Now run *psql* as the *postgres* user:

```
sudo -u postgres psql;
```

Grant the `coder` user access to the `wasteplan_db` database by running this command: 

```
grant all privileges on database wasteplan_db to coder;
```

Type in `\q` to exit *psql* as the *postgres* user.

Connect to your database using: `psql -d wasteplan_db`


### Package.json dependencies



## Authors
- Thando
- Tarsia
- Siwe
- Jason

