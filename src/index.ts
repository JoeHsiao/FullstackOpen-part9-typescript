import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises, TrainingReport } from "./exerciseCalculator";
const app = express();

app.use(express.json());

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
    let message = "Error: ";
    if (error instanceof Error) {
      message += error.message;
    }
    res.json({
      error: message,
    });
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const dailyExercises = req.body.daily_exercises;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const target = req.body.target;

  if (!dailyExercises || !target) {
    res.json({ error: "parameters missing" });
    return;
  }
  if (
    isNaN(Number(target)) ||
    !Array.isArray(dailyExercises) ||
    dailyExercises.length === 0 ||
    dailyExercises.some(isNaN)
  ) {
    res.json({ error: "malformatted parameters" });
    return;
  }

  try {
    const message: TrainingReport = calculateExercises(
      dailyExercises as number[],
      Number(target)
    );
    res.json(message);
  } catch (error) {
    let errMessage = "Error: ";
    if (error instanceof Error) {
      errMessage += error.message;
    }
    res.json({ error: errMessage });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
