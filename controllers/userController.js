const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user || user.role !== "admin")
        throw {
          name: "AuthenticationFailed",
          message: "invalid email or password",
        };
      else {
        let validPassword = comparePassword(password, user.password);
        if (!validPassword)
          throw {
            name: "AuthenticationFailed",
            message: "invalid email or password",
          };
        else {
          const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
          };

          const token = generateToken(payload);
          res.status(200).json({ token });
        }
      }
    } catch (error) {
      console.log(error, "<<< ERROR at login controller");
      next(error);
    }
  }

  static async addAdmin(req, res, next) {
    try {
      const { email, name, role, password, img_url } = req.body;
      const newAdmin = await User.create({
        email,
        name,
        img_url,
        role,
        password,
      });
      res.status(201).json({
        id: newAdmin.id,
        email: newAdmin.email,
        name: newAdmin.name,
        role: newAdmin.role,
      });
    } catch (error) {
      console.log(error, "<<< ERROR at addadmin controller");
      next(error);
    }
  }

  static async createUser(req, res, next) {
    try {
      const { email, name, img_url, role, password } = req.body;

      const newUser = await User.create({
        email,
        name,
        img_url,
        role,
        password,
      });

      res.status(201).json({
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      });
    } catch (error) {
      console.log(error, "<<< ERROR at createUser controller");
      next(error);
    }
  }

  static async readAllByRole(req, res, next) {
    try {
      const { role } = req.params;

      const users = await User.findAll({
        where: {
          role,
        },
      });

      res.status(200).json({ users });
    } catch (error) {
      console.log(error, "<<< ERROR at readAllByRole controller");
      next(error);
    }
  }

  static async readById(req, res, next) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);

      res.status(200).json({ user });
    } catch (error) {
      console.log(error, "<<< ERROR at readAllByRole controller");
      next(error);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const { email, name, img_url, role, password } = req.body;

      let user = await User.findByPk(Number(id));
      if (!user) throw { name: "NotFound" };
      else {
        user.update({
          email,
          name,
          img_url,
          role,
          password,
        });

        res.status(201).json({ msg: `${user.id} has updated` });
      }
    } catch (error) {
      console.log(error, "<<< ERROR at updateUser controller");
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      let user = await User.findByPk(id);
      if (!user) throw { name: "NotFound" };
      else {
        user.destroy();

        res.status(201).json({ msg: `${user.id} has deleted` });
      }
    } catch (error) {
      console.log(error, "<<< ERROR at deleteUser controller");
      next(error);
    }
  }
}

module.exports = UserController;
