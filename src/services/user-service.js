const jwt = require("jsonwebtoken");
const UserRepository = require("../repository/user-repository");
const { JWT_KEY } = require("../config/ServerConfig");
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
      console.error("Something went wrong in the repository layer:", error);
      throw error;
    }
  }

  async signIn(email, plainpassword) {
    try {
      // Step 1 -> Fetch the user using email
      const user = await this.userRepository.getByEmail(email);
      
      // step 2 -> compare incomeing plain password with stored encrypted password
      const passwordMatch = this.checkPassword(plainpassword, user.password);
      if (!passwordMatch) {
        console.log("Password dosent match");
        throw { error: "Incorrect password" };
      }

      // Step 3 -> If password matches, create a JWT token and return it
      const newJwt = this.createToken({ email: user.email, id: user.id });
      return newJwt;

    } catch (error) {
      console.error("Something went wrong during the sign-in process:", error);
      throw error;
    }
  }

  createToken(user) {
    try {
      return jwt.sign(user, JWT_KEY, { expiresIn: "1h" });
    } catch (error) {
      console.error("Error creating JWT token:", error);
      throw error;
    }
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, JWT_KEY);
    } catch (error) {
      console.error("Something went wrong while validating token:", error);
      throw error;
    }
  }

  checkPassword(userInputPlainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
    } catch (error) {
      console.error("Something went wrong while checking password:", error);
      throw error;
    }
  }
}

module.exports = UserService;
