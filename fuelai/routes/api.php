<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Api\V1\ForumController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
// API forum creation endpoints
Route::get('/users/{user}/followers', [UserController::class, 'followers']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/users/{user}/follow', [UserController::class, 'follow']);
    // Forums routes
    Route::post('/forums', [ForumController::class, 'store']);
    Route::get('/forums', [ForumController::class, 'index']);
    Route::get('/forums/{post}', [ForumController::class, 'show']);
    Route::post('/forums/{post}/reply', [ForumController::class, 'reply']);
    // Meal plan routes
    Route::get('/meal-plans', [MealPlanController::class, 'apiIndex']);
    Route::post('/meal-plans', [MealPlanController::class, 'apiStore']);
    Route::get('/meal-plans/{id}', [MealPlanController::class, 'apiShow']);
    Route::delete('/meal-plans/{id}', [MealPlanController::class, 'apiDestroy']);
});
