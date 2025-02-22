const UserService = require("../services/user-service");

// Creating an instance of UserService to handle user-related operations
const userService = new UserService();

const create = async (req, res) => {
  try {
    const response = await userService.create({
      email: req.body.email,
      password: req.body.password,
    });

    return res.status(201).json({
      message: "Successfully created a user",
      data: response,
      success: true,
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong while creating user",
      data: {},
      success: false,
      err: error,
    });
  }
};

module.exports = {
  create,
};
