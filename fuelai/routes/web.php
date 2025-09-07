<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/recipe-generation', function () {
    return Inertia::render('RecipeGeneration');
})->name('recipe-generation');

Route::get('/forums', function () {
    return Inertia::render('Forums');
})->name('forums');

Route::get('/calendar', function () {
    return Inertia::render('Calendar');
})->name('calendar');

Route::get('/exercises', function () {
    return Inertia::render('Exercises');
})->name('exercises');

Route::get('/tasks', function () {
    return Inertia::render('Tasks');
})->name('tasks');

Route::get('/plans', function () {
    return Inertia::render('Plans');
})->name('plans');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
