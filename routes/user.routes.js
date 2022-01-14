const express = require('express');
const router = express.Router();

const {
  createUser,
  updateUser,
  deleteUser,
  getOneUser,
  getManyUsers,
} = require('../handlers/users.handler.js');

const validator = require('express-joi-validation').createValidator({
  passError: true
});

const Joi = require('joi');

const mySchema = Joi.object({
  firstname: Joi.required(),
  lastname: Joi.required(),
  email: Joi.required(),
  github_url: Joi.required(),
});

router.post('/', validator.body(mySchema), createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/:id', getOneUser);
router.get('/', getManyUsers);

module.exports = router;
