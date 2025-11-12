<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthenticatedSessionController;


// Controllers

use App\Http\Controllers\ForumController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\MealController;
use App\Http\Controllers\MealPlanController;
use App\Http\Controllers\MealPlanMealController;



Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/home', function () {
    return Inertia::render('welcome');
})->name('home_page');

Route::middleware('auth')->group(function () {
    Route::get('/recipe-generation', function () {
        return Inertia::render('RecipeGeneration');
    })->name('recipe-generation');

    // Meal List
    Route::get('/meal_list', [MealController::class, 'index']);

    // Meal Plans
    Route::get('/meal_plans', [MealPlanController::class, 'index']);
    Route::post('/meal_plans', [MealPlanController::class, 'store']);
    Route::delete('/meal_plans/{id}', [MealPlanController::class, 'destroy']);
    Route::get('/meal_plans/{id}', [MealPlanController::class, 'show']);

    // Meal Plan Meals
    Route::delete('/meal_plan_meals/{id}', [MealPlanMealController::class, 'destroy']);
    Route::post('/meal_plan_meals', [MealPlanMealController::class, 'store']);

    // Meals
    Route::get('/meals', function () {
        return Inertia::render('meals');
    })->name('meals');
    Route::post('/meals', [MealController::class, 'store']);
    Route::get('/meals/create', [MealController::class, 'create']);
    Route::get('/meals/{id}', [MealController::class, 'show']);
    Route::put('/meals/{id}', [MealController::class, 'update']);
    Route::delete('/meals/{id}', [MealController::class, 'destroy']);


});

// Allow for user who aren't logged in to view forums
Route::get('/forums', [ForumController::class, 'index'])->name('forums.index');

Route::middleware(['auth'])->group(function () {
    Route::get('/forums/create', [ForumController::class, 'create'])->name('forums.create');
    Route::post('/forums', [ForumController::class, 'store'])->name('forums.store');
    Route::post('/forums/{id}/reply', [ForumController::class, 'reply'])->name('forums.reply');
    Route::post('/forums/{id}/ai-reply', [ForumController::class, 'aiReply'])->name('forums.ai-reply');
    Route::delete('/forums/{id}', [ForumController::class, 'destroy'])->name('forums.destroy');
    Route::get('/forums/{id}', [ForumController::class, 'show'])->name('forums.show');
    Route::delete('/forums/{threadId}/posts/{postId}', [ForumController::class, 'destroyPost'])->name('forums.posts.destroy');
    Route::put('/forums/{threadId}/posts/{postId}', [ForumController::class, 'updatePost'])->name('forums.posts.update');
});



Route::middleware(['auth'])->group(function () {
    Route::get('/calendar', [CalendarController::class, 'index'])->name('calendar.index');
});

Route::get('/exercises', function () {
    return Inertia::render('Exercises');
})->name('exercises');

Route::middleware(['auth'])->group(function () {
    Route::get('/tasks', [TaskController::class, 'index'])->name('tasks.index');
    Route::post('/tasks', [TaskController::class, 'store'])->name('tasks.store');
    Route::patch('/tasks/{id}', [TaskController::class, 'update'])->name('tasks.update');
    Route::delete('/tasks/{id}', [TaskController::class, 'destroy'])->name('tasks.destroy');
    Route::post('/tasks/workout', [TaskController::class, 'storeWorkout'])->name('tasks.store-workout');
});

Route::get('/image_rec', function () {
    return Inertia::render('image_rec');
})->name('image_rec');
Route::middleware(['auth'])->group(function () {
    Route::post('/image_rec', [MealController::class, 'store'])->name('meals.store');
});



Route::get('/admin', function () {
    return Inertia::render('admin');
})->middleware(['auth', 'admin'])->name('admin');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('welcome');
    })->name('dashboard');
});

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->name('logout');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
