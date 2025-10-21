<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CalendarController extends Controller
{
    public function index(Request $request)
    {
        $tasks = Task::where('user_id', $request->user()->id)
            ->whereNotNull('deadline')
            ->orderBy('deadline', 'asc')
            ->get();

        // Needed for FullCalendar
        $events = $tasks->map(function ($task) {
            return [
                'id' => $task->task_id,
                'title' => $task->content,
                'start' => $task->deadline,
                'allDay' => true,
                'backgroundColor' => $this->getDifficultyColor($task->difficulty),
                'borderColor' => $this->getDifficultyColor($task->difficulty),
                'extendedProps' => [
                    'category' => $task->category,
                    'difficulty' => $task->difficulty,
                    'is_completed' => $task->is_completed,
                ],
                'className' => $task->is_completed ? 'opacity-50' : '',
            ];
        });

        return Inertia::render('Calendar', [
            'events' => $events
        ]);
    }

    private function getDifficultyColor($difficulty)
    {
        return match($difficulty) {
            'hard' => '#ef4444',   // yellow
            'medium' => '#f59e0b',  // yellow
            'easy' => '#10b981',   // green
            default => '#6b7280',  // gray
        };
    }
}
