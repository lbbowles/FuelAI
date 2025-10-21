<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\MealPlanMeal;
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


        // Get meal plan meals for the user's meal plans
        $mealPlanMeals = MealPlanMeal::whereHas('mealPlan', function($query) use ($request) {
            $query->where('user_id', $request->user()->id);
        })
            ->with('meal')
            ->get();

        // Convert tasks to calendar events (for Full Calendar)
        $taskEvents = $tasks->map(function ($task) {
            return [
                'id' => 'task-' . $task->id,
                'title' => $task->title,
                'start' => $task->deadline,
                'allDay' => true,
                'backgroundColor' => $this->getDifficultyColor($task->difficulty),
                'borderColor' => $this->getDifficultyColor($task->difficulty),
                'extendedProps' => [
                    'type' => 'task',
                    'category' => $task->category,
                    'difficulty' => $task->difficulty,
                    'is_completed' => $task->is_completed,
                ],
                'className' => $task->is_completed ? 'opacity-50' : '',
            ];
        });

        // Convert meal plan meals to calendar events
        $mealEvents = $mealPlanMeals->map(function ($mealPlanMeal) {
            return [
                'id' => 'meal-' . $mealPlanMeal->id,
                'title' => $mealPlanMeal->meal->name . ' (' . ucfirst($mealPlanMeal->meal_time) . ')',
                'start' => $this->getNextDateForDay($mealPlanMeal->day_of_week),
                'allDay' => true,
                'backgroundColor' => $this->getMealTimeColor($mealPlanMeal->meal_time),
                'borderColor' => $this->getMealTimeColor($mealPlanMeal->meal_time),
                'extendedProps' => [
                    'type' => 'meal',
                    'day_of_week' => $mealPlanMeal->day_of_week,
                    'meal_time' => $mealPlanMeal->meal_time,
                ],
            ];
        });

        // Merge both
        $events = $taskEvents->concat($mealEvents);

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

    private function getMealTimeColor($mealTime)
    {
        return match($mealTime) {
            'breakfast' => '#f59e0b',  // orange
            'lunch' => '#3b82f6',      // blue
            'dinner' => '#8b5cf6',     // purple
            'snack' => '#ec4899',      // pink
            default => '#6b7280',      // gray
        };
    }

    private function getNextDateForDay($dayOfWeek)
    {
        $days = [
            'monday' => 1,
            'tuesday' => 2,
            'wednesday' => 3,
            'thursday' => 4,
            'friday' => 5,
            'saturday' => 6,
            'sunday' => 0,
        ];

        $targetDay = $days[strtolower($dayOfWeek)];
        $today = now();
        $currentDay = (int) $today->format('w'); // 0 (Sunday) through 6 (Saturday)

        $daysUntilTarget = ($targetDay - $currentDay + 7) % 7;
        if ($daysUntilTarget === 0) {
            $daysUntilTarget = 0; // Show today if it matches
        }

        return $today->addDays($daysUntilTarget)->format('Y-m-d');
    }

}
