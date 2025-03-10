export interface TrainingReport {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface TrainingInput {
  dailyHours: number[];
  target: number;
}

const parseArguments = (args: string[]): TrainingInput => {
  if (args.length < 2) throw new Error("Number of arguments must be >= 2");

  const params = args.slice(2);
  if (params.every((x) => !isNaN(Number(x)))) {
    return {
      dailyHours: params.slice(1).map((x) => Number(x)),
      target: Number(params[0]),
    };
  } else {
    throw new Error("Provided values are not numbers");
  }
};

export const calculateExercises = (
  dailyHours: number[],
  targetHours: number
): TrainingReport => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.reduce(
    (sum, cur) => (cur > 0 ? sum + 1 : sum),
    0
  );
  const totalHours = dailyHours.reduce((sum, cur) => sum + cur, 0);
  const average = totalHours / periodLength;
  const success = average >= targetHours;

  let rating: number;
  let ratingDescription: string;
  const targetPercentage = average / targetHours;
  switch (true) {
    case targetPercentage <= 0.6: {
      rating = 1;
      ratingDescription = "a lot space of improvement";
      break;
    }
    case targetPercentage < 0.8: {
      rating = 2;
      ratingDescription = "not too bad but could be better";
      break;
    }
    case targetPercentage >= 0.8: {
      rating = 3;
      ratingDescription = "excelent job";
      break;
    }
    default:
      throw new Error(`Unexpected percentage of target ${targetPercentage}`);
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetHours,
    average,
  };
};

if (require.main === module) {
  try {
    const { dailyHours, target } = parseArguments(process.argv);
    console.log(calculateExercises(dailyHours, target));
  } catch (error) {
    let message = "Something went wrong: ";
    if (error instanceof Error) {
      message += "Error: " + error.message;
    }
    console.error(message);
  }
}
