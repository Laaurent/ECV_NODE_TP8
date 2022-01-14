const express = require('express');
const router = express.Router();

const {
  createRole,
  updateRole,
  deleteRole,
  getOneRole,
  getManyRoles,
} = require('../handlers/roles.handler.js');

router.post('/', createRole);
router.patch('/:id', updateRole);
router.delete('/:id', deleteRole);
router.get('/:id', getOneRole);
router.get('/', getManyRoles);

module.exports = router;
