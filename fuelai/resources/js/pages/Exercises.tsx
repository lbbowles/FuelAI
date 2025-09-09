import { Head } from '@inertiajs/react';
import Navbar from '@/components/navbar';
import { useState } from 'react';
import {WorkoutSchedule, fitnessLevels, workoutTypes, equipmentOptions, timeOptions}  from '@/data/exerciseData';


// To Do:
// Tweak the prompt to provide better data
// Add in error handling that isn't useless
// Add in text validation to prevent prompt injection
// Add in the ability to regenerate exercise
// Add Gradients to keep it consist

export default function Exercise() {

    // Set the base state for everything
    const [userGoal, setUserGoal] = useState('');
    const [fitnessLevel, setFitnessLevel] = useState('beginner');
    const [workoutType, setWorkoutType] = useState('full-body');
    const [availableTime, setAvailableTime] = useState('30');
    const [equipment, setEquipment] = useState('none');
    const [injuries, setInjuries] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [workoutSchedule, setWorkoutSchedule] = useState<WorkoutSchedule | null>(null);
    const [error, setError] = useState('');
    const [currentExercise, setCurrentExercise] = useState(0);
    const [workoutStarted, setWorkoutStarted] = useState(false);


    const generateWorkout = async () => {
        if (!userGoal.trim()) {
            setError('Please specify your fitness goals for today\'s session.');
            return;
        }


        /* Set initial state */
        setIsLoading(true);
        setError('');

        // This json object is much better than straight sending the prompt to it
        try {
            const prompt = `Generate a comprehensive ${availableTime}-minute ${workoutType} workout plan for a ${fitnessLevel} level individual with ${equipment} equipment available.

            Primary Objective: ${userGoal}
            ${injuries ? `Considerations: Avoid exercises that may aggravate: ${injuries}` : ''}

            Return a detailed JSON object with this exact structure:
            {
                "title": "Descriptive workout name",
                "duration": "${availableTime} minutes",
                "description": "Comprehensive workout overview and objectives",
                "totalCaloriesBurned": estimated_calories_for_this_duration,
                "warmUpTime": 5,
                "coolDownTime": 5,
                "exercises": [
                    {
                        "name": "Exercise name",
                        "sets": number_of_sets,
                        "reps": "repetition_count_or_time_duration",
                        "duration": "optional_time_per_set",
                        "description": "Detailed form instructions and execution technique",
                        "difficulty": "beginner|intermediate|advanced",
                        "muscleGroups": ["primary", "secondary", "muscle", "groups"]
                    }
                ],
                "tips": [
                    "Evidence-based training advice",
                    "Safety and form reminders",
                    "Performance optimization tips",
                    "Recovery recommendations"
                ]
            }

            Include 6-10 exercises with proper progression. Ensure exercise selection aligns with available equipment and injury considerations. Provide scientifically-backed training principles.`;

            const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;  /* Import API key from ENV file*/

            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: { // Sets headers so I can find out on Openrouter what is being called
                    "Authorization": `Bearer ${apiKey}`,
                    "HTTP-Referer": window.location.origin,
                    "X-Title": "FuelAI Exercise Generator",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "model": "openai/gpt-4o-mini",
                    "messages": [
                        { // Prompt needs tweaking
                            role: 'system',
                            content: 'You are a certified personal trainer with expertise in exercise science and kinesiology. Provide safe, effective, evidence-based workout recommendations. Always return valid JSON without markdown formatting or code blocks.'
                        },
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    "temperature": 0.7,
                    "max_tokens": 2000
                })
            });

            const data = await response.json();
            const workoutData = JSON.parse(data.choices[0].message.content);
            setWorkoutSchedule(workoutData);
        } catch (err) { // Add in better error handling (maybe a placeholder list of workouts ?)
            console.error('Error generating workout:', err);
            setError('Unable to generate personalized workout. Please verify your inputs and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'beginner': return 'text-success';
            case 'intermediate': return 'text-warning';
            case 'advanced': return 'text-error';
            default: return 'text-base-content';
        }
    };

    // Get rid of badges due to no flexibility
    const getDifficultyBadge = (difficulty: string) => {
        switch (difficulty) {
            case 'beginner': return 'badge-success';
            case 'intermediate': return 'badge-warning';
            case 'advanced': return 'badge-error';
            default: return 'badge-neutral';
        }
    };

    const resetForm = () => {
        setUserGoal('');
        setInjuries('');
        setWorkoutSchedule(null);
        setError('');
        setWorkoutStarted(false);
        setCurrentExercise(0);
    };

    const startWorkout = () => {
        setWorkoutStarted(true);
        setCurrentExercise(0);
    };

    const nextExercise = () => {
        if (workoutSchedule && currentExercise < workoutSchedule.exercises.length - 1) {
            setCurrentExercise(currentExercise + 1);
        }
    };

    const previousExercise = () => {
        if (currentExercise > 0) {
            setCurrentExercise(currentExercise - 1);
        }
    };

    /* Actual HTML Page (uses pure Tailwind) */
    return (
        <>
            <Head title="Exercise Training Platform">
                <link rel="icon" type="image/svg+xml" href="/fuelai.svg" />
            </Head>
            <Navbar />

            <div className="min-h-screen bg-base-200 pt-16">
                <div className="container mx-auto p-4 max-w-7xl">
                    <div className="hero bg-gradient-to-r from-primary to-secondary rounded-box mb-8">
                        <div className="hero-content text-center text-primary-content py-16">
                            <div className="max-w-2xl">
                                <h1 className="mb-6 text-5xl font-bold">Exercise Training Platform</h1>
                                <p className="mb-6 text-lg">
                                    Generate personalized, evidence-based workout routines powered by advanced AI.
                                    Input your fitness goals and receive scientifically-designed training protocols.
                                </p> {/* I dislike this text and I should change it */}
                            </div>
                        </div>
                    </div>

                    {/* If workout doesn't exist, create forum */}
                    {!workoutSchedule ? (
                        /* Workout Form */
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2">
                                <div className="card bg-base-100 shadow-xl">
                                    <div className="card-body">
                                        <h2 className="card-title text-2xl mb-6">Workout Configuration</h2>

                                        {/* Primary */}
                                        <div className="form-control w-full mb-6">
                                            {/* Fix Primary Training Objection collision, the text box collides with the text on the left and right */}
                                            <label className="label">
                                                <span className="label-text text-lg font-semibold">Primary Training Objective</span>
                                            </label>
                                            <textarea
                                                placeholder="Describe your specific fitness goals (e.g., improve cardiovascular endurance, build lean muscle mass, enhance functional strength, prepare for athletic competition...)"
                                                value={userGoal}
                                                onChange={(e) => setUserGoal(e.target.value)}
                                                className="textarea textarea-bordered h-32 text-base"
                                                maxLength={300}
                                            />
                                            <label className="label">
                                                <span className="label-text-alt">Character count: {userGoal.length}/300</span>
                                            </label>
                                        </div>

                                        {/* Fitness Level */}
                                        <div className="form-control w-full mb-6">
                                            <label className="label">
                                                <span className="label-text text-lg font-semibold">Current Fitness Level</span>
                                            </label>
                                            <div className="grid grid-cols-1 gap-3">
                                                {fitnessLevels.map((level) => (
                                                    <div key={level.value} className="form-control">
                                                        <label className="label cursor-pointer justify-start gap-4">
                                                            <input
                                                                type="radio"
                                                                name="fitness-level"
                                                                className="radio radio-primary"
                                                                value={level.value}
                                                                checked={fitnessLevel === level.value}
                                                                onChange={(e) => setFitnessLevel(e.target.value)}
                                                            />
                                                            <div>
                                                                <span className="label-text font-medium text-base">{level.label}</span>
                                                                <br />
                                                                <span className="label-text-alt">{level.description}</span>
                                                            </div>
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Workout Selection */}
                                        <div className="form-control w-full mb-6">
                                            <label className="label">
                                                <span className="label-text text-lg font-semibold">Training Focus</span>
                                            </label>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                {workoutTypes.map((type) => (
                                                    <button
                                                        key={type.value}
                                                        onClick={() => setWorkoutType(type.value)}
                                                        className={`btn btn-sm ${workoutType === type.value ? 'btn-primary' : 'btn-outline'} text-xs`}
                                                    >
                                                        {type.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Equipment Availability */}
                                        <div className="form-control w-full mb-6">
                                            <label className="label">
                                                <span className="label-text text-lg font-semibold">Available Equipment</span>
                                            </label>
                                            <select
                                                value={equipment}
                                                onChange={(e) => setEquipment(e.target.value)}
                                                className="select select-bordered"
                                            >
                                                {equipmentOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Considerations */}
                                        <div className="form-control w-full mb-6">
                                            {/* Fix the text box collision */}
                                            <label className="label">
                                                <span className="label-text text-lg font-semibold">Injury History or Physical Limitations</span>
                                                <span className="label-text-alt">Optional</span>
                                            </label>
                                            <textarea
                                                placeholder="List any current injuries, past injuries, or physical limitations that should be considered when designing your workout..."
                                                value={injuries}
                                                onChange={(e) => setInjuries(e.target.value)}
                                                className="textarea textarea-bordered h-24 text-base"
                                                maxLength={200}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Parameters Sidebar, adjust to be a part of the main bar, also tweak to slider by 9/12 */}
                            <div className="lg:col-span-1">
                                <div className="card bg-base-100 shadow-xl sticky top-24">
                                    <div className="card-body">
                                        <h3 className="card-title text-xl mb-4">Session Parameters</h3>

                                        {/* Duration */}
                                        <div className="form-control w-full mb-6">
                                            <label className="label">
                                                <span className="label-text font-medium">Session Duration</span>
                                            </label>
                                            <div className="grid grid-cols-2 gap-2">
                                                {timeOptions.map((time) => (
                                                    <button
                                                        key={time}
                                                        onClick={() => setAvailableTime(time)}
                                                        className={`btn btn-sm ${availableTime === time ? 'btn-primary' : 'btn-outline'}`}
                                                    >
                                                        {time}min
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Error Display */}
                                        {error && (
                                            <div className="alert alert-error mb-4">
                                                <svg className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="text-sm">{error}</span>
                                            </div>
                                        )} {/* Get clearer error handling */}

                                        {/* Generate */}
                                        <div className="card-actions justify-end">
                                            <button
                                                onClick={generateWorkout}
                                                disabled={isLoading || !userGoal.trim()}
                                                className="btn btn-primary btn-block"
                                            >
                                                {isLoading && <span className="loading loading-spinner loading-sm"></span>}
                                                {isLoading ? 'Generating...' : 'Generate Workout Plan'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* ELSE display Workout table */
                        <div className="space-y-6">
                            {/* Workout Overview */}
                            <div className="card bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                                        <div className="flex-1">
                                            <h2 className="card-title text-3xl mb-3">{workoutSchedule.title}</h2>
                                            <p className="text-base-content/70 mb-4 leading-relaxed">{workoutSchedule.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                                <div className="badge badge-primary badge-lg">{workoutSchedule.duration}</div>
                                                <div className="badge badge-secondary badge-lg">{workoutSchedule.totalCaloriesBurned} cal</div>
                                                <div className="badge badge-accent badge-lg">{workoutSchedule.exercises.length} exercises</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            {!workoutStarted && (
                                                <button onClick={startWorkout} className="btn btn-success">
                                                    Start Workout
                                                </button>
                                            )}
                                            <button onClick={resetForm} className="btn btn-outline">
                                                Create New Plan
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {workoutStarted ? (
                                /* Active Workout */
                                <div className="card bg-base-100 shadow-xl">
                                    <div className="card-body">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-2xl font-bold">Active Workout Session</h3>
                                            <div className="text-sm text-base-content/60">
                                                Exercise {currentExercise + 1} of {workoutSchedule.exercises.length}
                                            </div>
                                        </div>

                                        <div className="progress progress-primary w-full mb-6">
                                            <div
                                                className="progress-bar"
                                                style={{ width: `${((currentExercise + 1) / workoutSchedule.exercises.length) * 100}%` }}
                                            ></div>
                                        </div>

                                        {workoutSchedule.exercises[currentExercise] && (
                                            <div className="card bg-base-200 shadow-md">
                                                <div className="card-body">
                                                    <h4 className="text-2xl font-bold mb-4">
                                                        {workoutSchedule.exercises[currentExercise].name}
                                                    </h4>
                                                    <p className="text-base-content/80 mb-6 leading-relaxed">
                                                        {workoutSchedule.exercises[currentExercise].description}
                                                    </p>

                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                                        <div className="stat bg-base-100 rounded-box">
                                                            <div className="stat-title">Sets</div>
                                                            <div className="stat-value text-primary">{workoutSchedule.exercises[currentExercise].sets}</div>
                                                        </div>
                                                        <div className="stat bg-base-100 rounded-box">
                                                            <div className="stat-title">Reps</div>
                                                            <div className="stat-value text-secondary">{workoutSchedule.exercises[currentExercise].reps}</div>
                                                        </div>
                                                        <div className="stat bg-base-100 rounded-box">
                                                            <div className="stat-title">Difficulty</div>
                                                            <div className={`stat-value text-sm ${getDifficultyColor(workoutSchedule.exercises[currentExercise].difficulty)}`}>
                                                                {workoutSchedule.exercises[currentExercise].difficulty}
                                                            </div>
                                                        </div>
                                                        <div className="stat bg-base-100 rounded-box">
                                                            <div className="stat-title">Muscles</div>
                                                            <div className="stat-desc">
                                                                {workoutSchedule.exercises[currentExercise].muscleGroups?.join(', ') || 'Multiple'}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="card-actions justify-between">
                                                        <button
                                                            onClick={previousExercise}
                                                            disabled={currentExercise === 0}
                                                            className="btn btn-outline"
                                                        >
                                                            Previous Exercise
                                                        </button>
                                                        <button
                                                            onClick={nextExercise}
                                                            disabled={currentExercise === workoutSchedule.exercises.length - 1}
                                                            className="btn btn-primary"
                                                        >
                                                            {currentExercise === workoutSchedule.exercises.length - 1 ? 'Complete Workout' : 'Next Exercise'}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                /* Exercise Overview */
                                <div className="card bg-base-100 shadow-xl">
                                    <div className="card-body">
                                        <h3 className="card-title text-2xl mb-6">Exercise Protocol</h3>
                                        <div className="overflow-x-auto">
                                            <table className="table table-zebra w-full">
                                                <thead>
                                                <tr>
                                                    <th>Exercise</th>
                                                    <th>Sets</th>
                                                    <th>Reps</th>
                                                    <th>Difficulty</th>
                                                    <th>Target Muscles</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {workoutSchedule.exercises.map((exercise, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <div className="font-bold">{exercise.name}</div>
                                                            <div className="text-sm text-base-content/60 max-w-xs">
                                                                {exercise.description.substring(0, 100)}...
                                                            </div>
                                                        </td>
                                                        <td className="font-mono">{exercise.sets}</td>
                                                        <td className="font-mono">{exercise.reps}</td>
                                                        <td>
                                                            <div className={`badge ${getDifficultyBadge(exercise.difficulty)}`}>
                                                                {exercise.difficulty}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="text-sm">
                                                                {exercise.muscleGroups?.join(', ') || 'Multiple groups'}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
