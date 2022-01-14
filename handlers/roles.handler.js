const { Role } = require("../models");
const createError = require("http-errors");

const createRole = async (req, res, next) => {
   const { name } = req.body;
   const role = await Role.create({
      name,
   });
   return role ? res.json(role) : next(createError(500));
};

const updateRole = async (req, res, next) => {
   const updateSuccess = await Role.update(
      {
         ...req.body,
      },
      {
         where: {
            id: req.params.id,
         },
      }
   );

   if (updateSuccess) {
      const role = await Role.findByPk(req.params.id);
      return res.json(role);
   } else {
      return next(createError(500));
      /*  res.status(500).json({
         status: 500,
         message: "Server error",
      }); */
   }
};

const deleteRole = async (req, res, next) => {
   const deleteSuccess = await Role.destroy({
      where: {
         id: req.params.id,
      },
   });

   if (deleteSuccess) {
      return res.status(204).json();
   } else {
      return next(createError(500));
      /* res.status(500).json({
         status: 500,
         message: "Server error",
      }); */
   }
};

const getOneRole = async (req, res, next) => {
   const role = await Role.findByPk(req.params.id);

   if (!role) {
      return next(createError(404));
      /* return res.status(404).json({
         status: 404,
         message: "Resource not found",
      }); */
   }

   return res.json(Role);
};

const getManyRoles = async (req, res, next) => {
   const roles = await Role.findAll();
   return roles ? res.json(roles) : next(createError(500));
};

module.exports = {
   createRole,
   updateRole,
   deleteRole,
   getOneRole,
   getManyRoles,
};
