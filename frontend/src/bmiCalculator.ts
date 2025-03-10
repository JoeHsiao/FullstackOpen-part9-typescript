const calculateBmi = (heightCm: number, weightKg: number): string => {
    if (heightCm === 0) {
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

console.log(calculateBmi(180, 74))


