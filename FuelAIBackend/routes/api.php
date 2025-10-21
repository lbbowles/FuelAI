<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Api\V1\MealController;
use App\Http\Controllers\Api\V1\SettingsController;
use App\Http\Controllers\Api\V1\ForumThreadController;
use App\Http\Controllers\Api\V1\MealPlanController;
use App\Http\Controllers\ForumController;
use App\Http\Controllers\Api\V1\AiController;
use App\Http\Controllers\Api\V1\Admin\UserController as AdminUserController;
use App\Http\Controllers\Api\V1\Admin\RecipeController;
use App\Http\Controllers\Api\V1\Admin\ForumPostController;
use App\Http\Controllers\Api\V1\Admin\DashboardController;

// Public Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/users/{user}/followers', [UserController::class, 'followers']);
Route::get('/forums', [ForumController::class, 'index']);

// Protected Routes (Require Authentication)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/users/{user}/follow', [UserController::class, 'follow']);
    Route::get('/meals', [MealController::class, 'index']);

    // User Settings
    Route::get('/settings', [SettingsController::class, 'show']);
    Route::patch('/settings', [SettingsController::class, 'update']);

    // Forums
    Route::get('/threads', [ForumThreadController::class, 'index']);
    Route::get('/threads/{thread}', [ForumThreadController::class, 'show']);

    // Meal Plan
    Route::get('/meal-plan', [MealPlanController::class, 'index']);

    // AI Endpoints
    Route::post('/ai/generate-meal-plan', [AiController::class, 'generateMealPlan']);
    Route::post('/ai/recognize-image', [AiController::class, 'recognizeImage']);

    // ADMIN ONLY ROUTES
    Route::prefix('admin')->middleware('admin')->name('admin.')->group(function () {
        // User Management
        Route::get('/users', [AdminUserController::class, 'index'])->name('users.index');
        Route::patch('/users/{user}/role', [AdminUserController::class, 'update'])->name('users.updateRole');

        // Recipe Management
        Route::post('/recipes', [RecipeController::class, 'store'])->name('recipes.store');
        Route::patch('/recipes/{recipe}', [RecipeController::class, 'update'])->name('recipes.update');
        Route::delete('/recipes/{recipe}', [RecipeController::class, 'destroy'])->name('recipes.destroy');

        // Forum Moderation
        Route::delete('/posts/{post}', [ForumPostController::class, 'destroy'])->name('posts.destroy');

        // Admin Dashboard
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard.index');
    });
});
