const jwt = require("jsonwebtoken");
const UserRepository = require("../repository/user-repository");
const { JWT_KEY } = require("../config/ServerConfig ");
const bcrypt = require("bcrypt");

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

  async signIn(email, plainpassword) {
    try {
      // step 1 -> fecth the user using email
      const user = await this.userRepository.getByEmail(email);
      // step 2 -> compare incomeing plain password with stored encrypted password
      const passwordMatch = this.checkPassword(plainpassword, user.password);
      if (!passwordMatch) {
        console.log("Password dosent match");
        throw { error: "Incorrect password" };
      }

      // step3 -> if password match create a jwt token and sent it to the user
      const newJwt = this.createToken({ email: user.email, id: user.id });
      return newJwt;
    } catch (error) {
      console.log("Something went wrong on sign in process");
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

  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log("Something went wrong while token valideation", error);
    }
  }

  checkPassword(userInputPlainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
    } catch (error) {
      console.log("Something went wrong while token valideation", error);
    }
  }
}
module.exports = UserService;
