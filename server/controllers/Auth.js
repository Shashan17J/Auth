const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const sanitizeInputs = (str) => /<[^>]*>/g.test(str);

// signup
exports.signUp = async (req, res) => {
  try {
    // fetch data from req body
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    // validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (
      sanitizeInputs(firstName) ||
      sanitizeInputs(lastName) ||
      sanitizeInputs(email) ||
      sanitizeInputs(password) ||
      sanitizeInputs(confirmPassword)
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter valid inputs",
      });
    }

    // check if password and confirm is same or not
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and ConfirmPassword Value does not match, please try again",
      });
    }

    // checking password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password should be greater than six characters",
      });
    }

    // check user already exist and not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User is already registered, Please Login",
      });
    }

    // Hash Password (10 is round)
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    if (!user) {
      return res.status(500).json({
        success: false,
        message: "Error While Creating User, Please Try Again",
      });
    }

    // return res
    return res.status(200).json({
      success: true,
      message: "User is registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered, Please try again",
    });
  }
};

//  Login
exports.login = async (req, res) => {
  try {
    // fetch data from req body
    const { email, password } = req.body;

    // validation data
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required, please try again",
      });
    }

    // Find user with provided email (user exists or not)
    const user = await User.findOne({ email });
    // If user not found with provided email
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered, please signup first",
      });
    }

    // compare password
    if (await bcrypt.compare(password, user.password)) {
      // Generate JWT token
      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );
      user.token = token;
      user.password = undefined;

      // create cookie and send response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), //3days
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Logged in successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Incorrect Password",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login Failure, please try again",
    });
  }
};
