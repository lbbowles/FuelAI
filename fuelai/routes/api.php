<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\UserController;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/users/{user}/followers', [UserController::class, 'followers']); // <-- Add this line


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/users/{user}/follow', [UserController::class, 'follow']);
});
