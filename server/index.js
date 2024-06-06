const express = require("express");
const app = express();

const userRoutes = require("./routes/User");

const database = require("./config/Database");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const mongoSanitize = require("express-mongo-sanitize");

const PORT = process.env.PORT || 4000;

dotenv.config();
database.connect();

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Sanitizes user-supplied data to prevent NoSQL Query Injection.
app.use(mongoSanitize());

app.use("/api/v1/auth", userRoutes);

// def route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running..",
  });
});

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
