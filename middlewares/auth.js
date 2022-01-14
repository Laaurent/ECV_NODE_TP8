const jwt = require('jsonwebtoken');

const { User, Role } = require('../models');

const authentified = async (req, res, next) => {

  // On check si il y a un token dans les headers de la request
  if(req.headers.authorization) {

    try {
      // On retire le 'Bearer ' de notre token
      const token = req.headers.authorization.split(" ")[1];

      // On check notre token et on récupère les infos user à l'intérieur
      const jwtUser = jwt.verify(token, 'secret');

      // On charge notre user depuis la BDD
      const user = await User.findByPk(jwtUser.id, {
        include: {
          model: Role
        }
      });

      /* On injecte notre user dans le contexte d'express
      *  Dans chaque route avec le middleware auth, on pourra
      *  récupéré l'utilisateur connecté avec "req.auth"
      */
      req.auth = {
        fistname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        id: user.id,
        role: user.Role.name,
      };

      next();
    } catch(e) {
      return res.status(403).json({
        statusCode: 403,
        message: 'Forbidden',
      });
    }

  } else {
    return res.status(403).json({
      statusCode: 403,
      message: 'Forbidden',
    });
  }

}


module.exports = authentified;
