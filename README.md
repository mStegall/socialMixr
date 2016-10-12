socialMixr
===========
Our website for making drinking more social.

Developement Setup
------------------
To get started with developement you need to install and set up a local postgress database.

The database should be called `socialMixr` with a user `admin` with password `admin`

To install the required libraries you run `npm install`.

To start the build process in watch mode `npm run devBuild`.

To start the server `npm run devStart`.

The server automatically migrates the databse to the most recent version. To enable seeding by the server set the environment variable `seeding` to `true`, or run the seeding manually by using `knex seed:run`. 