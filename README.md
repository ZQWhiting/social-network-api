# Social Network Api
![license](https://img.shields.io/badge/License-MIT-blue)

<a name='description'></a>
## Description
This is a NoSQL social network api built using MongoDB, Mongoose, and Express.js. It has CRUD operations for two collections, Users and Thoughts, with Thoughts being related to the Users collection. It also features a self-relation with Users called Friends, and a subschema for Thoughts called Reactions.

## Table of Contents
* [Description](#Description)
* [Installation](#Installation)
* [Usage](#Usage)
* [License](#License)

<a name='installation'></a>
## Installation
* Clone/Fork the repository. 
 * Run `npm i` in the terminal at the repository directory. 
 * Run `npm start`.

<a name='usage'></a>
## Usage
Test in an api tester such as [Insomnia](insomnia.rest). 
 Run queries in localhost:3001/api/users, localhost:3001/api/thoughts, localhost:3001/api/users/:id, localhost:3001/api/thoughts/:id, localhost:3001/api/users/:userId/friends/:friendId, and localhost:3001/api/thoughts/:id/reactions.

<a name='license'></a>
## License
Licensed under the [MIT](./LICENSE.txt) license.
