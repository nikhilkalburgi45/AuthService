const jwt = require("jsonwebtoken");
const UserRepository = require("../repository/user-repository");
const { JWT_KEY } = require("../config/ServerConfig ");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log("Something went wrong on repo layer");
      throw error;
    }
  }

  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, { expiresIn: "1h" });
      return result;
    } catch (error) {
      console.log("Something went wrong while creating token");
    }
  }

  verifyToken(user) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log("Something went wrong while token valideation", error);
    }
  }
}
module.exports = UserService;
