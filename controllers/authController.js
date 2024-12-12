const UserModel = require('../models/userModel');

class AuthController {
  static async register(req, res) {
    try {
      const { username, password, email } = req.body;
      const userId = await UserModel.createUser(username, password, email);
      res.status(201).json({ 
        message: 'Registrasi berhasil', 
        userId 
      });
    } catch (error) {
      res.status(500).json({ 
        message: 'Gagal melakukan registrasi', 
        error: error.message 
      });
    }
  }

  static async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await UserModel.validateUser(username, password);

      if (user) {
        req.session.userId = user.id;
        req.session.username = user.username;
        
        res.json({ 
          message: 'Login berhasil', 
          user: { 
            id: user.id, 
            username: user.username 
          }
        });
      } else {
        res.status(401).json({ 
          message: 'Username atau password salah' 
        });
      }
    } catch (error) {
      res.status(500).json({ 
        message: 'Gagal login', 
        error: error.message 
      });
    }
  }

  static logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ 
          message: 'Gagal logout' 
        });
      }
      res.json({ 
        message: 'Logout berhasil' 
      });
    });
  }
}

module.exports = AuthController;