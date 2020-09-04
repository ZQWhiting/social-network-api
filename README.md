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
Test in an api tester such as [Insomnia](https://insomnia.rest). 
 Test queries: 
 * localhost:3001/api/users
     - get all users
     - post users (User collection has the username and email properties.)
 * localhost:3001/api/users/:id
     - get user by id
     - put (update) user
     - delete user
 * localhost:3001/api/users/:userId/friends/:friendId
     - post friend
     - delete friend
 * localhost:3001/api/thoughts
     - get all thoughts
     - post thoughts (Thought collection has the thoughtText and username properties, and the JSON passed into the query also needs a userId property on creation.)
 * localhost:3001/api/thoughts/:id
     - get thought by id
     - put (update) thought
     - delete thought
 * localhost:3001/api/thoughts/:thoughtId/reactions.
     - post reaction (Reaction subschema has the reactionBody and username properties.)
     - delete reaction (Delete reaction needs a reactionId key/value passed through the JSON body.)
 
<a name='license'></a>
## License
Licensed under the [MIT](./LICENSE.txt) license.
