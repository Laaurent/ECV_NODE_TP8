const { User, Post, Comment, Role } = require('../models');

const correctionTp1 = async (req, res) => {
  try {

    const roleAdmin = await Role.create({
      name: 'admin',
    });

    const user = await User.create({
      firstname: 'Louis',
      lastname: 'Harang',
      email: 'cours@narah.io',
      roleId: roleAdmin.id,
    });

    const post = await Post.create({
      title: 'My new post',
      content: 'blablabla',
      authorId: user.id,
    });

    const comment = await Comment.create({
      content: 'blablabla',
      authorId: user.id,
      postId: post.id,
    });


    const awesomeComment = await Comment.findOne({
      where: {
        id: comment.id
      },
      include: [
        {
          model: User,
          as: 'author'
        },
        Post,
      ]
    });

    res.json(awesomeComment);

  } catch(e) {
    console.log(e);
    res.json({
      message: e.toString,
      status: 500,
    });
  }

}

module.exports = {
  correctionTp1,
}
