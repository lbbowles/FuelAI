<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // Display list of tasks
    public function index(Request $request)
    {
        $tasks = Task::where('user_id', $request->user()->id)
            ->orderBy('is_completed', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'tasks' => $tasks
        ], 200);
    }

    // Store a new task
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'content' => 'required|string|max:1000',
            'difficulty' => 'nullable|in:easy,medium,hard',
            'category' => 'nullable|string|max:50',
            'deadline' => 'nullable|date',
        ]);

        $task = Task::create([
            'user_id' => $request->user()->id,
            'title' => $validated['title'] ?? null,
            'content' => $validated['content'],
            'difficulty' => $validated['difficulty'] ?? 'medium',
            'category' => $validated['category'] ?? 'General',
            'is_completed' => false,
            'deadline' => $validated['deadline'] ?? null,
        ]);

        return response()->json([
            'message' => 'Task created successfully',
            'task' => $task
        ], 201);
    }

    // Update task
    public function update(Request $request, $id)
    {
        $task = Task::where('task_id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $validated = $request->validate([
            'title' => 'sometimes|nullable|string|max:255',
            'content' => 'sometimes|string|max:1000',
            'difficulty' => 'sometimes|nullable|in:easy,medium,hard',
            'category' => 'sometimes|nullable|string|max:50',
            'is_completed' => 'sometimes|boolean',
            'deadline' => 'sometimes|nullable|date',
        ]);

        $task->update($validated);

        return response()->json([
            'message' => 'Task updated successfully',
            'task' => $task
        ], 200);
    }

    // Remove task
    public function destroy(Request $request, $id)
    {
        $task = Task::where('task_id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $task->delete();

        return response()->json([
            'message' => 'Task deleted successfully'
        ], 200);
    }

    // Bulk store exercises as tasks (matching web version)
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

        $createdTasks = [];

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

            $task = Task::create([
                'user_id' => $request->user()->id,
                'title' => $exercise['name'],
                'content' => $description,
                'difficulty' => $this->mapExerciseDifficultyToTask($exercise['difficulty']),
                'category' => 'Exercise',
                'is_completed' => false,
                'deadline' => $validated['deadline'] ?? null,
            ]);

            $createdTasks[] = $task;
        }

        return response()->json([
            'message' => 'Workout exercises added to tasks successfully',
            'tasks' => $createdTasks
        ], 201);
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
