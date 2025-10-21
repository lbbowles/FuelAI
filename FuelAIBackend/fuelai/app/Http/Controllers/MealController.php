<?php

namespace App\Http\Controllers;

use App\Models\Meal;
use App\Models\MealPlan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MealController extends Controller
{
    public function index()
    {
        $meals = Meal::where('created_by', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get();

        $meal_plans = MealPlan::where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('MealList', [
            'meals' => $meals,
            'meal_plans' => $meal_plans,
        ]);
    }

    public function create()
    {
        return Inertia::render('MealCreate');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        Meal::create([
            'created_by' => auth()->id(),
            'name' => $validated['name'],
            'description' => $validated['description'],
        ]);

        return redirect('/meal_list')->with('success', 'Meal created successfully!');
    }

    public function show($id)
    {
        $meal = Meal::where('id', $id)
            ->where('created_by', auth()->id())
            ->firstOrFail();

        $meal_plans = MealPlan::where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('MealView', [
            'meal' => $meal,
            'meal_plans' => $meal_plans,
        ]);
    }

    public function update(Request $request, $id)
    {
        $meal = Meal::where('id', $id)
            ->where('created_by', auth()->id())
            ->firstOrFail();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $meal->update($validated);

        return redirect()->back()->with('success', 'Meal updated successfully!');
    }

    public function destroy($id)
    {
        $meal = Meal::where('id', $id)
            ->where('created_by', auth()->id())
            ->firstOrFail();

        $meal->delete();

        return redirect('/meal_list')->with('success', 'Meal deleted successfully!');
    }
}

