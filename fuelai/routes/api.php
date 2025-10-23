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
    Route::post('/forums', [ForumController::class, 'store']);
    Route::post('/forums/{post}/reply', [ForumController::class, 'reply']);
});
