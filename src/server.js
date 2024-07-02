import express from "express";
import axios from "axios";

const app = express();
const port = process.env.PORT;

app.get("/api/hello", async (req, res) => {
  const visitorName = req.query.visitor_name;
  const clientIp =
    req.headers["cf-connecting-ip"] ||
    req.headers["x-real-ip"] ||
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress ||
    "";

  const ipApiResponse = await axios.get(`http://ip-api.com/json/${clientIp}`);
  console.log("ip Api", ipApiResponse);
  const { city } = ipApiResponse.data || "new york";

  const weatherApiKey = process.env.WEATHERAPIKEY;
  const weatherApiResponse = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherApiKey}`
  );
  const temperature = weatherApiResponse.data.main.temp;

  res.json({
    client_ip: clientIp,
    location: city,
    greeting: `Hello, ${visitor}!, the temperature is ${temperature}degrees Celsius in ${city}`,
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
