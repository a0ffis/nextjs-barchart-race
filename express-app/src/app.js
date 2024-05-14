const express = require("express");
const cors = require("cors");

const app = express();
const pool = require("./config/db");

app.use(cors());
// Set the port number for the server (default: 3000)
const port = process.env.API_PORT || 3000;

// Define a simple route that responds with "Hello World!"
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/get_population", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT country_name, year, population FROM population ORDER BY country_name;",
    );

    const obj = {};
    result[0].map((item) => {
      if (Object.hasOwn(obj, item.country_name)) {
        obj[item.country_name] = {
          ...obj[item.country_name],
          [item.year]: item.population,
        };
      } else {
        obj[item.country_name] = { [item.year]: item.population };
      }
    });

    res.json({ status: "success", results: obj });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Start the server and listen for connections on the specified port
app.listen(port, () => {
  console.log(process.env.DB_HOST);
  console.log(`Server listening on port ${port}`);
});
