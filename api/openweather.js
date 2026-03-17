export default async function handler(req, res) {
  if (!process.env.API_KEY) {
    res.status(500).json({ error: "API key is not configured" });
    return;
  }

  const {
    lat,
    lon,
    q,
    type = "weather",
    units = "metric",
    lang = "sv",
  } = req.query;
  let base;
  if (type === "geo") {
    base = `https://api.openweathermap.org/geo/1.0/direct`;
  } else {
    base = `https://api.openweathermap.org/data/2.5/${type}`;
  }
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (lat && lon) {
    params.set("lat", lat);
    params.set("lon", lon);
  }
  params.set("appid", process.env.API_KEY);
  if (type !== "geo") {
    params.set("units", units);
    params.set("lang", lang);
  } else {
    params.set("limit", "1");
    params.set("lang", lang);
  }

  try {
    const r = await fetch(`${base}?${params.toString()}`);
    const data = await r.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
}
