const { User, Role } = require('../models');

const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
  const { email, password } = req.body;

  // On retrouve notre user via l'email saisi
  const foundUser = await User.findOne({
    where: { email: email },
    include: {
      model: Role
    }
  });

  // On check si le mot de passe du body correspond à celui du user
  if(foundUser.validPassword(password)) {
    const { email, id, role } = foundUser;

    // on génère le jwt avec les informations importantes
    const token = generateAccessToken(email, foundUser.Role.name, id);
    return res.json({ access_token: token });
  }

  return res
  .status(403)
  .json({
    statusCode: 403,
    message: 'Forbidden'
  });
}

// On génère un jwt avec les informations du user
const generateAccessToken = (email, role, id) => {
  return jwt.sign({ email ,role, id }, 'secret', { expiresIn: '1800s' }
  );
}

module.exports = {
  login,
}
