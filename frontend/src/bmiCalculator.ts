interface CalculateBmiValues {
    height: number,
    weight: number
}

const parseArguments = (args: string[]): CalculateBmiValues => {
    if (args.length != 4) throw new Error('Need exactly 2 arguments');
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error('Provided values are not numbers');
    }
}

export const calculateBmi = (heightCm: number, weightKg: number): string => {
    if (heightCm <= 0) {
        throw new Error('height must > 0')
    }
    const heightM = heightCm / 100
    const bmi = weightKg / (heightM ** 2)
    switch (true) {
        case (bmi > 0 && bmi < 18.5):
            return 'Underweight'
        case (bmi >= 18.5 && bmi < 25):
            return "Normal range"
        case (bmi >= 25 && bmi < 30):
            return "Overweight"
        case (bmi >= 30):
            return "Obese"
        default:
            throw new Error(`Invalid BMI ${bmi}`)
    }
}

try {
    const {height, weight} = parseArguments(process.argv);
    console.log(calculateBmi(height, weight))
} catch (error: unknown) {
    let message = 'Something went wrong: ';
    if (error instanceof Error) {
        message += 'Error: ' + error.message;
    }
    console.log(message)
}


