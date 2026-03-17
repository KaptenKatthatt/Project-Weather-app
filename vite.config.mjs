import { defineConfig, loadEnv } from "vite";

const defaultUnits = "metric";
const defaultLang = "sv";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiKey = env.API_KEY || process.env.API_KEY;

  return {
    server: {
      port: 5173,
      open: true,
    },
    plugins: [
      {
        name: "openweather-local-api",
        configureServer(server) {
          server.middlewares.use("/api/openweather", async (req, res) => {
            if (!apiKey) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "API_KEY saknas i .env.local" }));
              return;
            }

            try {
              const url = new URL(req.url || "", "http://localhost");
              const type = url.searchParams.get("type") || "weather";
              const lat = url.searchParams.get("lat");
              const lon = url.searchParams.get("lon");
              const q = url.searchParams.get("q");
              const units = url.searchParams.get("units") || defaultUnits;
              const lang = url.searchParams.get("lang") || defaultLang;

              const base =
                type === "geo"
                  ? "https://api.openweathermap.org/geo/1.0/direct"
                  : `https://api.openweathermap.org/data/2.5/${type}`;

              const params = new URLSearchParams();
              if (q) params.set("q", q);
              if (lat && lon) {
                params.set("lat", lat);
                params.set("lon", lon);
              }

              params.set("appid", apiKey);

              if (type === "geo") {
                params.set("limit", "1");
                params.set("lang", lang);
              } else {
                params.set("units", units);
                params.set("lang", lang);
              }

              const response = await fetch(`${base}?${params.toString()}`);
              const data = await response.json();

              res.statusCode = response.status;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify(data));
            } catch (error) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(
                JSON.stringify({ error: "Failed to fetch weather data" }),
              );
            }
          });
        },
      },
    ],
  };
});
