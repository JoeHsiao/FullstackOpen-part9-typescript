import express from "express";
import { calculateBmi } from "./bmiCalculator";
const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight)) {
    res.json({ error: "Parameters are not numbers" });
    return;
  }
  try {
    const message = calculateBmi(height, weight);
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
