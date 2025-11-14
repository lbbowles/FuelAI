import { Head, router } from '@inertiajs/react';
import NavbarTop from '@/components/navbar';
import { useState } from 'react';
import {WorkoutSchedule, fitnessLevels, workoutTypes, equipmentOptions, timeOptions}  from '@/data/exerciseData';

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
    const [selectedExercises, setSelectedExercises] = useState<number[]>([]);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [taskDeadline, setTaskDeadline] = useState('');
    const [isSavingToTasks, setIsSavingToTasks] = useState(false);

    const generateWorkout = async () => {
        if (!userGoal.trim()) {
            setError('Please specify your fitness goals for today\'s session.');
            return;
        }

        setIsLoading(true);
        setError('');

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

            const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "HTTP-Referer": window.location.origin,
                    "X-Title": "FuelAI Exercise Generator",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "model": "openai/gpt-4o-mini",
                    "messages": [
                        {
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
        } catch (err) {
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
        setSelectedExercises([]);
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

    const toggleExerciseSelection = (index: number) => {
        setSelectedExercises(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    const selectAllExercises = () => {
        if (workoutSchedule) {
            setSelectedExercises(workoutSchedule.exercises.map((_, index) => index));
        }
    };

    const deselectAllExercises = () => {
        setSelectedExercises([]);
    };

    const openTaskModal = () => {
        if (selectedExercises.length === 0) {
            setError('Please select at least one exercise to save to tasks.');
            return;
        }
        setShowTaskModal(true);
        setError('');
    };

    const saveToTasks = async () => {
        if (!workoutSchedule || selectedExercises.length === 0) {
            setError('Please select at least one exercise to save.');
            return;
        }

        setIsSavingToTasks(true);

        try {
            const selectedExerciseData = selectedExercises.map(index => workoutSchedule.exercises[index]);

            router.post('/tasks/workout', {
                workout_title: workoutSchedule.title,
                exercises: selectedExerciseData,
                deadline: taskDeadline || null,
            }, {
                onSuccess: () => {
                    setShowTaskModal(false);
                    setSelectedExercises([]);
                    setTaskDeadline('');
                    setError('');
                },
                onError: () => {
                    setError('Failed to save exercises to tasks. Please try again.');
                },
                onFinish: () => {
                    setIsSavingToTasks(false);
                }
            });
        } catch (err) {
            console.error('Error saving to tasks:', err);
            setError('Failed to save exercises to tasks.');
            setIsSavingToTasks(false);
        }
    };

    return (
        <>
            <Head title="Exercise Training Platform">
                <link rel="icon" type="image/svg+xml" href="/fuelai.svg" />
            </Head>
            <NavbarTop />

            <div className="mt-16 pt-16 min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8 max-w-7xl">
                    {/* Hero Section */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-3">Exercise Training Platform</h1>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Generate personalized, AI-powered workout routines tailored to your fitness goals
                        </p>
                    </div>

                    {!workoutSchedule ? (
                        /* Workout Configuration Form */
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2">
                                <div className="card bg-white shadow-lg">
                                    <div className="card-body p-8">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Workout Configuration</h2>

                                        {/* Primary Training Objective */}
                                        <div className="space-y-2 mb-6">
                                            <label className="text-gray-700 font-semibold text-lg">
                                                Primary Training Objective
                                            </label>
                                            <textarea
                                                placeholder="Describe your specific fitness goals (e.g., improve cardiovascular endurance, build lean muscle mass, enhance functional strength...)"
                                                value={userGoal}
                                                onChange={(e) => setUserGoal(e.target.value)}
                                                className="textarea textarea-bordered w-full h-32 text-base"
                                                maxLength={300}
                                            />
                                            <div className="text-sm text-gray-500 text-right">
                                                {userGoal.length}/300 characters
                                            </div>
                                        </div>

                                        {/* Fitness Level */}
                                        <div className="space-y-2 mb-6">
                                            <label className="text-gray-700 font-semibold text-lg">
                                                Current Fitness Level
                                            </label>
                                            <div className="space-y-3">
                                                {fitnessLevels.map((level) => (
                                                    <div key={level.value} className="form-control">
                                                        <label className="label cursor-pointer justify-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                                            <input
                                                                type="radio"
                                                                name="fitness-level"
                                                                className="radio radio-primary checkbox-lg border-2 border-black"
                                                                value={level.value}
                                                                checked={fitnessLevel === level.value}
                                                                onChange={(e) => setFitnessLevel(e.target.value)}
                                                            />
                                                            <div className="flex-1">
                                                                <span className="font-medium text-base block">{level.label}</span>
                                                                <span className="text-sm text-gray-600">{level.description}</span>
                                                            </div>
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Training Focus */}
                                        <div className="space-y-2 mb-6">
                                            <label className="text-gray-700 font-semibold text-lg">
                                                Training Focus
                                            </label>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                {workoutTypes.map((type) => (
                                                    <button
                                                        key={type.value}
                                                        onClick={() => setWorkoutType(type.value)}
                                                        className={`btn ${workoutType === type.value ? 'btn-primary' : 'btn-outline'}`}
                                                    >
                                                        {type.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Equipment Availability */}
                                        <div className="space-y-2 mb-6">
                                            <label className="text-gray-700 font-semibold text-lg">
                                                Available Equipment
                                            </label>
                                            <select
                                                value={equipment}
                                                onChange={(e) => setEquipment(e.target.value)}
                                                className="select select-bordered w-full"
                                            >
                                                {equipmentOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Injury Considerations */}
                                        <div className="space-y-2 mb-6">
                                            <div className="flex items-center justify-between">
                                                <label className="text-gray-700 font-semibold text-lg">
                                                    Injury History or Physical Limitations
                                                </label>
                                                <span className="text-sm text-gray-500">Optional</span>
                                            </div>
                                            <textarea
                                                placeholder="List any current injuries, past injuries, or physical limitations that should be considered..."
                                                value={injuries}
                                                onChange={(e) => setInjuries(e.target.value)}
                                                className="textarea textarea-bordered w-full h-24 text-base"
                                                maxLength={200}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar Parameters */}
                            <div className="lg:col-span-1">
                                <div className="card bg-white shadow-lg sticky top-24">
                                    <div className="card-body p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">Session Parameters</h3>

                                        {/* Duration */}
                                        <div className="space-y-2 mb-6">
                                            <label className="text-gray-700 font-semibold">
                                                Session Duration
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
                                        )}

                                        {/* Generate Button */}
                                        <button
                                            onClick={generateWorkout}
                                            disabled={isLoading || !userGoal.trim()}
                                            className="btn btn-primary w-full inline-flex items-center justify-center gap-2"
                                        >
                                            {isLoading && <span className="loading loading-spinner loading-sm"></span>}
                                            {isLoading ? 'Generating Workout...' : 'Generate Workout Plan'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Workout Display */
                        <div className="space-y-6">
                            {/* Workout Overview */}
                            <div className="card bg-white shadow-lg">
                                <div className="card-body p-8">
                                    <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-6">
                                        <div className="flex-1">
                                            <h2 className="text-3xl font-bold text-gray-900 mb-3">{workoutSchedule.title}</h2>
                                            <p className="text-gray-600 mb-4 leading-relaxed">{workoutSchedule.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                                <div className="badge badge-primary badge-lg">{workoutSchedule.duration}</div>
                                                <div className="badge badge-secondary badge-lg">{workoutSchedule.totalCaloriesBurned} cal</div>
                                                <div className="badge badge-accent badge-lg">{workoutSchedule.exercises.length} exercises</div>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {!workoutStarted && (
                                                <>
                                                    <button onClick={startWorkout} className="btn btn-success gap-2">
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                                                        </svg>
                                                        Start Workout
                                                    </button>
                                                    <button
                                                        onClick={openTaskModal}
                                                        className="btn btn-primary gap-2"
                                                        disabled={selectedExercises.length === 0}
                                                    >
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                                        </svg>
                                                        Save to Tasks ({selectedExercises.length})
                                                    </button>
                                                </>
                                            )}
                                            <button onClick={resetForm} className="btn btn-outline">
                                                Create New Plan
                                            </button>
                                        </div>
                                    </div>

                                    {/* Selection Controls */}
                                    {!workoutStarted && (
                                        <div className="flex gap-2 pt-4 border-t border-gray-200">
                                            <button
                                                onClick={selectAllExercises}
                                                className="btn btn-sm btn-outline"
                                            >
                                                Select All
                                            </button>
                                            <button
                                                onClick={deselectAllExercises}
                                                className="btn btn-sm btn-outline"
                                            >
                                                Deselect All
                                            </button>
                                            <span className="text-sm text-gray-600 flex items-center ml-2">
                                                {selectedExercises.length} exercise{selectedExercises.length !== 1 ? 's' : ''} selected
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {workoutStarted ? (
                                /* Active Workout Mode */
                                <div className="card bg-white shadow-lg">
                                    <div className="card-body p-8">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-2xl font-bold text-gray-900">Active Workout Session</h3>
                                            <div className="text-sm text-gray-600">
                                                Exercise {currentExercise + 1} of {workoutSchedule.exercises.length}
                                            </div>
                                        </div>

                                        <progress
                                            className="progress progress-primary w-full mb-6"
                                            value={((currentExercise + 1) / workoutSchedule.exercises.length) * 100}
                                            max="100"
                                        ></progress>

                                        {workoutSchedule.exercises[currentExercise] && (
                                            <div className="card bg-gray-50 shadow-md">
                                                <div className="card-body p-6">
                                                    <h4 className="text-2xl font-bold text-gray-900 mb-4">
                                                        {workoutSchedule.exercises[currentExercise].name}
                                                    </h4>
                                                    <p className="text-gray-700 mb-6 leading-relaxed">
                                                        {workoutSchedule.exercises[currentExercise].description}
                                                    </p>

                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                                        <div className="stat bg-white rounded-lg shadow">
                                                            <div className="stat-title">Sets</div>
                                                            <div className="stat-value text-primary text-3xl">{workoutSchedule.exercises[currentExercise].sets}</div>
                                                        </div>
                                                        <div className="stat bg-white rounded-lg shadow">
                                                            <div className="stat-title">Reps</div>
                                                            <div className="stat-value text-secondary text-3xl">{workoutSchedule.exercises[currentExercise].reps}</div>
                                                        </div>
                                                        <div className="stat bg-white rounded-lg shadow">
                                                            <div className="stat-title">Difficulty</div>
                                                            <div className={`stat-value text-xl ${getDifficultyColor(workoutSchedule.exercises[currentExercise].difficulty)}`}>
                                                                {workoutSchedule.exercises[currentExercise].difficulty}
                                                            </div>
                                                        </div>
                                                        <div className="stat bg-white rounded-lg shadow">
                                                            <div className="stat-title">Muscles</div>
                                                            <div className="stat-desc text-sm">
                                                                {workoutSchedule.exercises[currentExercise].muscleGroups?.join(', ') || 'Multiple'}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex justify-between gap-4">
                                                        <button
                                                            onClick={previousExercise}
                                                            disabled={currentExercise === 0}
                                                            className="btn btn-outline flex-1"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                                            </svg>
                                                            Previous
                                                        </button>
                                                        <button
                                                            onClick={nextExercise}
                                                            disabled={currentExercise === workoutSchedule.exercises.length - 1}
                                                            className="btn btn-primary flex-1"
                                                        >
                                                            {currentExercise === workoutSchedule.exercises.length - 1 ? 'Complete' : 'Next'}
                                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                /* Exercise Overview Table */
                                <div className="card bg-white shadow-lg">
                                    <div className="card-body p-8">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Exercise Protocol</h3>
                                        <div className="overflow-x-auto">
                                            <table className="table w-full">
                                                <thead>
                                                <tr>
                                                    <th>
                                                        <label>
                                                            <input
                                                                type="checkbox"
                                                                className="checkbox checkbox-primary checkbox-lg border-2 border-black"
                                                                checked={selectedExercises.length === workoutSchedule.exercises.length}
                                                                onChange={() => {
                                                                    if (selectedExercises.length === workoutSchedule.exercises.length) {
                                                                        deselectAllExercises();
                                                                    } else {
                                                                        selectAllExercises();
                                                                    }
                                                                }}
                                                            />
                                                        </label>
                                                    </th>
                                                    <th>Exercise</th>
                                                    <th>Sets</th>
                                                    <th>Reps</th>
                                                    <th>Difficulty</th>
                                                    <th>Target Muscles</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {workoutSchedule.exercises.map((exercise, index) => (
                                                    <tr key={index} className="hover">
                                                        <th>
                                                            <label>
                                                                <input
                                                                    type="checkbox"
                                                                    className="checkbox checkbox-primary checkbox-lg border-2 border-black"
                                                                    checked={selectedExercises.includes(index)}
                                                                    onChange={() => toggleExerciseSelection(index)}
                                                                />
                                                            </label>
                                                        </th>
                                                        <td>
                                                            <div className="font-bold text-gray-900">{exercise.name}</div>
                                                            <div className="text-sm text-gray-600 max-w-md">
                                                                {exercise.description.substring(0, 100)}...
                                                            </div>
                                                        </td>
                                                        <td className="font-mono font-semibold">{exercise.sets}</td>
                                                        <td className="font-mono font-semibold">{exercise.reps}</td>
                                                        <td>
                                                            <div className={`badge ${getDifficultyBadge(exercise.difficulty)}`}>
                                                                {exercise.difficulty}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="text-sm text-gray-700">
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

                            {/* Training Tips */}
                            {workoutSchedule.tips && workoutSchedule.tips.length > 0 && (
                                <div className="card bg-white shadow-lg">
                                    <div className="card-body p-8">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Training Tips</h3>
                                        <ul className="space-y-3">
                                            {workoutSchedule.tips.map((tip, index) => (
                                                <li key={index} className="flex gap-3">
                                                    <svg className="w-6 h-6 text-primary flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span className="text-gray-700 leading-relaxed">{tip}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Task Modal */}
            {showTaskModal && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-md">
                        <h3 className="font-bold text-xl text-gray-900 mb-4">Save Exercises to Tasks</h3>
                        <p className="text-gray-600 mb-6">
                            You're about to save {selectedExercises.length} exercise{selectedExercises.length !== 1 ? 's' : ''} to your task list.
                        </p>

                        <div className="space-y-2 mb-6">
                            <label className="text-gray-700 font-semibold">
                                Deadline (Optional)
                            </label>
                            <input
                                type="date"
                                value={taskDeadline}
                                onChange={(e) => setTaskDeadline(e.target.value)}
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div className="modal-action">
                            <button
                                onClick={() => {
                                    setShowTaskModal(false);
                                    setTaskDeadline('');
                                }}
                                className="btn btn-outline"
                                disabled={isSavingToTasks}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveToTasks}
                                className="btn btn-primary"
                                disabled={isSavingToTasks}
                            >
                                {isSavingToTasks && <span className="loading loading-spinner loading-sm"></span>}
                                {isSavingToTasks ? 'Saving...' : 'Save to Tasks'}
                            </button>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={() => setShowTaskModal(false)}></div>
                </div>
            )}
        </>
    );
}
