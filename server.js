import express from "express";
import axios from "axios";

const app = express();
const port = process.env.PORT || 3000;
app.get("/api/hello", async (req, res) => {
  try {
    const visitorName = req.query.visitor_name;
    const clientIp =
      req.headers["cf-connecting-ip"] ||
      req.headers["x-real-ip"] ||
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress ||
      "";
    const visitor = visitorName.slice(1, visitorName.length - 1);
    const ipApiResponse = await axios.get(`http://ip-api.com/json/${clientIp}`);
    const { city } = ipApiResponse.data || "new york";

    const weatherApiKey = "f1b75d25b6752caa1a8087f2cb774377";
    const weatherApiResponse = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherApiKey}`
    );
    const temperature = weatherApiResponse.data.main.temp;

    res.json({
      client_ip: clientIp,
      location: city,
      greeting: `Hello, ${visitor} !, the temperature is ${temperature} degrees Celsius in ${city}`,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get("/", (req, res) => {
  res.json({
    message: "add this to your url path - /api/hello?visitor_name='Firmin'",
  });
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
