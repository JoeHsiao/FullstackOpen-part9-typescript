import express from "express";
import computeBmi from "./bmiCalculator";
const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  if (!height || !weight) {
    res.json({ error: "missing parameter" });
    return;
  }
  try {
    const message = computeBmi([height as string, weight as string]);
    res.json({
      weight,
      height,
      bmi: message,
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
