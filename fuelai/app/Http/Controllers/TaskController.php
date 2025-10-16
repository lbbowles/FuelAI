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
            'content' => 'required|string|max:1000',
            'difficulty' => 'nullable|in:easy,medium,hard',
            'category' => 'nullable|string|max:50',
            'deadline' => 'nullable|date',
        ]);

        Task::create([
            'user_id' => $request->user()->id,
            'content' => $validated['content'],
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
        $task = Task::where('task_id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $validated = $request->validate([
            'content' => 'sometimes|string|max:1000',
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
        $task = Task::where('task_id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $task->delete();

        return redirect()->route('tasks.index');
    }
}
