/**
 * Import
 */

const express = require('express');
const userRouter = express.Router();

const checkFields = require('../../services/request.checker');
const { createItem, readItem, updatetem, deleteItem } = require('./user.ctrl');

/**
 * Definition
 */

class UserRouterClass {
  constructor() {

  }

  routes() {
    userRouter.post('/', (request, response) => {
      // if (typeof request.body !== undefined || request.body !== null) {
      //   UserModel.create(request.body)
      //   .then(user => response.json({ msg: 'User created', req: request.body }))
      //   .catch(err => response.json({ msg: 'User not created', data: err }));
      // } else {
      //   response.json({ msg: 'No data provided', data: null })
      // }

      if (typeof request.body === undefined || request.body === null) {
        return response.json({ msg: 'No body data provided', data: null });
      }

      const { success, extra, miss } =  checkFields(['name', 'email', 'password'], request.body);

      if (!success) response.json({ msg: 'Bad fiels provided', data: { miss: miss, extra: extra } });
      else {
        createItem(request.body)
        .then(apiResponse => response.json({ msg: 'User created', data: apiResponse }))
        .catch(apiResponse => response.json({ msg: 'User not created', data: apiResponse }));
      }
    });

    userRouter.get('/', (request, response) => {
      response.json({ msg: 'Read user' });
    });

    userRouter.put('/', (request, response) => {
      response.json({ msg: 'Update user' });
    });

    userRouter.delete('/', (request, response) => {
      response.json({ msg: 'Delete user' });
    });
  }

  init() {
    this.routes();
    return userRouter;
  }
}

/**
 * Export
 */

module.exports = UserRouterClass;
