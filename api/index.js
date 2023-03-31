const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const dayRoute = require("./routes/day");
const spotifyRoute = require("./routes/spotify");

dotenv.config();
mongoose.set("strictQuery", false); // got a deprecation warning,, set default to false? could be true...


mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/day",dayRoute)
app.use("/api/spotify", spotifyRoute);

app.listen(8800, () => {
  console.log("Backend server is running!");
});