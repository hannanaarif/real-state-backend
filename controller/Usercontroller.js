import UserService from '../services/UserService.js';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await UserService.login(email, password);
    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.json({ message: "Server error", success: false });
  }
};

const register = async (req, res) => {
  try {
    const result = await UserService.register(req.body);
    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.json({ message: "Server error", success: false });
  }
};

const logout = async (req, res) => {
  try {
    return res.json({ message: "Logged out", success: true });
  } catch (error) {
    console.error(error);
    return res.json({ message: "Server error", success: false });
  }
};

const getname = async (req, res) => {
  try {
    const user = await UserService.getUserProfile(req.user.id);
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.json({ message: "Server error", success: false });
  }
}



export { login, register, logout, getname };