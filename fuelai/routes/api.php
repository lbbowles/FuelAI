<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Api\V1\ForumController;
use App\Http\Controllers\MealPlanController;
use App\Http\Controllers\MealController;

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
    // Actual Meal Routes
    Route::get('/meals', [MealController::class, 'apiIndex']);
    Route::post('/meals', [MealController::class, 'apiStore']);
    // Meal Plan Food Routes
    Route::post('/meal-plans/{id}/add-meal', [MealPlanController::class, 'apiAddMeal']);
    Route::delete('/meal-plans-meals/{id}', [MealPlanController::class, 'apiRemoveMeal']);

    Route::get('/test', function () {
        \Log::info('TEST ENDPOINT');
        return response()->json(['status' => 'success', 'message' => 'App is working']);
    });
});
