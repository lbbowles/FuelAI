<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{

    // Display list of tasks
    public function index(Request $request)
    {
        $tasks = Task::where('user_id', $request->user()->id)
            ->orderBy('is_completed', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Tasks', [
            'tasks' => $tasks
        ]);
    }


    //Store a new task

    public function store(Request $request)
    {
        $validated = $request->validate([
            'description' => 'required|string|max:1000',
            'difficulty' => 'nullable|in:easy,medium,hard',
            'category' => 'nullable|string|max:50',
            'deadline' => 'nullable|date',
        ]);

        Task::create([
            'user_id' => $request->user()->id,
            'description' => $validated['description'],
            'difficulty' => $validated['difficulty'] ?? 'medium',
            'category' => $validated['category'] ?? 'General',
            'is_completed' => false,
            'deadline' => $validated['deadline'] ?? null,
        ]);

        return redirect()->route('tasks.index');
    }

    // Update task
    public function update(Request $request, $id)
    {
        $task = Task::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $validated = $request->validate([
            'description' => 'sometimes|string|max:1000',
            'difficulty' => 'sometimes|nullable|in:easy,medium,hard',
            'category' => 'sometimes|nullable|string|max:50',
            'is_completed' => 'sometimes|boolean',
            'deadline' => 'sometimes|nullable|date',
        ]);

        $task->update($validated);

        return redirect()->route('tasks.index');
    }

    // Remove task
    public function destroy(Request $request, $id)
    {
        $task = Task::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $task->delete();

        return redirect()->route('tasks.index');
    }


    // Bulk store exercises as tasks
    // Bulk store exercises as tasks
    public function storeWorkout(Request $request)
    {
        $validated = $request->validate([
            'workout_title' => 'required|string|max:255',
            'exercises' => 'required|array',
            'exercises.*.name' => 'required|string',
            'exercises.*.sets' => 'required|integer',
            'exercises.*.reps' => 'required|string',
            'exercises.*.difficulty' => 'required|string',
            'exercises.*.description' => 'nullable|string',
            'exercises.*.muscleGroups' => 'nullable|array',
            'deadline' => 'nullable|date',
        ]);

        foreach ($validated['exercises'] as $exercise) {
            // Transform exercise data to fit existing task structure
            $muscleGroups = isset($exercise['muscleGroups']) && is_array($exercise['muscleGroups'])
                ? implode(', ', $exercise['muscleGroups'])
                : '';

            // Build the full description with exercise details
            $description = $exercise['sets'] . " sets × " . $exercise['reps'] . " reps";

            if (!empty($muscleGroups)) {
                $description .= " (Targets: " . $muscleGroups . ")";
            }

            if (!empty($exercise['description'])) {
                $description .= "\n\nForm: " . $exercise['description'];
            }

            Task::create([
                'user_id' => $request->user()->id,
                'title' => $exercise['name'], // Use exercise name as the task title
                'description' => $description, // Put sets, reps, and form in description
                'difficulty' => $this->mapExerciseDifficultyToTask($exercise['difficulty']),
                'category' => 'Exercise',
                'is_completed' => false,
                'deadline' => $validated['deadline'] ?? null,
            ]);
        }

        return back()->with('success', 'Workout exercises added to tasks!');
    }

    private function mapExerciseDifficultyToTask($exerciseDifficulty)
    {
        $mapping = [
            'beginner' => 'easy',
            'intermediate' => 'medium',
            'advanced' => 'hard',
        ];

        return $mapping[strtolower($exerciseDifficulty)] ?? 'medium';
    }
}
