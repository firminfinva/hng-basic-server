import express from "express";
import axios from "axios";

const app = express();
const port = process.env.PORT || 3000;

app.get("/api/hello", async (req, res) => {
  const visitorName = req.query.visitor_name;
  const clientIp =
    req.headers["cf-connecting-ip"] ||
    req.headers["x-real-ip"] ||
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress ||
    "";

  // let ip = req.socket.remoteAddress;
  // ip = ip.split(":")[3];
  const visitor = visitorName.slice(1, visitorName.length - 1);
  const ipApiResponse = await axios.get(`http://ip-api.com/json/${clientIp}`);
  console.log("ip Api", ipApiResponse);
  const { city } = ipApiResponse.data || "new york";

  res.json({
    client_ip: clientIp,
    location: city,
    greeting: `Hello, ${visitor}!, the temperature is 11 degrees Celsius in ${city}`,
  });
  //   try {
  //     const ipApiResponse = await axios.get(`http://ip-api.com/json/${clientIp}`);
  //     const { city } = ipApiResponse.data;

  //     const weatherApiKey = "YOUR_WEATHER_API_KEY";
  //     const weatherApiResponse = await axios.get(
  //       `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherApiKey}`
  //     );
  //     const temperature = weatherApiResponse.data.main.temp;

  //     res.json({
  //       client_ip: clientIp,
  //       location: city,
  //       greeting: `Hello, ${visitorName}!, the temperature is ${temperature} degrees Celsius in ${city}`,
  //     });
  //   } catch (error) {
  //     res.status(500).json({ error: "Error fetching data" });
  //   }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
