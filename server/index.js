const express = require("express");
const cors = require("cors");
const app = express();

// constants
const port = process.env.PORT || 3001;
const appName = "FIKA";

// middleware
app.use(cors());

// routes
app.get("/", (req, res) => {
  revision = require("child_process")
    .execSync("git rev-parse HEAD")
    .toString()
    .trim();
  return res.json({ status: "healthy", hash: revision });
});

// launch app
app.listen(port, "0.0.0.0", () =>
  console.log(`${appName} listening at http://localhost:${port}`)
);
