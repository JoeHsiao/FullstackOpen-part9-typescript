interface CalculateBmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): CalculateBmiValues => {
  if (args.length != 2) throw new Error("Need exactly 2 arguments");
  if (!isNaN(Number(args[0])) && !isNaN(Number(args[1]))) {
    return {
      height: Number(args[0]),
      weight: Number(args[1]),
    };
  } else {
    throw new Error("Provided values are not numbers");
  }
};

const calculateBmi = (heightCm: number, weightKg: number): string => {
  if (heightCm <= 0) {
    throw new Error("height must be greater than 0");
  }
  const heightM = heightCm / 100;
  const bmi = weightKg / heightM ** 2;
  switch (true) {
    case bmi > 0 && bmi < 18.5:
      return "Underweight";
    case bmi >= 18.5 && bmi < 25:
      return "Normal range";
    case bmi >= 25 && bmi < 30:
      return "Overweight";
    case bmi >= 30:
      return "Obese";
    default:
      throw new Error(`Invalid BMI ${bmi}`);
  }
};

const computeBmi = (argv: string[]): string => {
  try {
    const { height, weight } = parseArguments(argv);
    return calculateBmi(height, weight);
  } catch (error: unknown) {
    let message = "Something went wrong: ";
    if (error instanceof Error) {
      message += "Error: " + error.message;
    }
    throw new Error(message);
  }
};

if (require.main === module) {
  try {
    console.log(computeBmi(process.argv.slice(2)));
  } catch (error) {
    console.log(error.message);
  }
}

export default computeBmi;
