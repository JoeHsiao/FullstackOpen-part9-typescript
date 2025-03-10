interface TrainingReport {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (dailyHours: number[], targetHours: number): TrainingReport => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.reduce((sum, cur) => cur > 0 ? sum + 1 : sum, 0);
  const totalHours = dailyHours.reduce((sum, cur) => sum + cur, 0);
  const average = totalHours / periodLength;
  const success = average >= targetHours;

  let rating: number;
  let ratingDescription: string;
  const targetPercentage = average / targetHours;
  switch (true) {
    case (targetPercentage <= 0.4): {
      rating = 1;
      ratingDescription = 'a lot space from improvement';
      break;
    }
    case (targetPercentage < 0.8): {
      rating = 2;
      ratingDescription = 'not too bad but could be better';
      break;
    }
    case (targetPercentage >= 0.8): {
      rating = 3;
      ratingDescription = 'excelent job';
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
    average
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))