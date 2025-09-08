export interface ExerciseInterface {
    name: string;
    sets: number;
    reps: string;
    duration?: string;
    description: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    muscleGroups: string[];
}

export interface WorkoutSchedule {
    title: string;
    duration: string;
    description: string;
    totalCaloriesBurned: number;
    exercises: ExerciseInterface[];
    tips: string[];
    warmUpTime: number;
    coolDownTime: number;
}

export const fitnessLevels = [
    { value: 'beginner', label: 'Beginner', description: 'Less than 6 months of regular exercise' },
    { value: 'intermediate', label: 'Intermediate', description: '6 months to 2 years of consistent training' },
    { value: 'advanced', label: 'Advanced', description: 'Over 2 years of structured fitness training' }
];

export const workoutTypes = [
    { value: 'full-body', label: 'Full Body Workout' },
    { value: 'upper-body', label: 'Upper Body Focus' },
    { value: 'lower-body', label: 'Lower Body Focus' },
    { value: 'cardio', label: 'Cardiovascular Training' },
    { value: 'strength', label: 'Strength Training' },
    { value: 'flexibility', label: 'Flexibility & Mobility' },
    { value: 'endurance', label: 'Endurance Building' }
];

export const equipmentOptions = [
    { value: 'none', label: 'No Equipment (Bodyweight)' },
    { value: 'basic', label: 'Basic Equipment (Dumbbells, Resistance Bands)' },
    { value: 'gym', label: 'Full Gym Access' },
    { value: 'home', label: 'Home Gym Setup' }
];

export const timeOptions = ['15', '30', '45', '60', '90', '120'];
