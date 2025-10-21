<?php

namespace App\Http\Controllers;

use App\Models\MealPlan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\MealPlanMeal;
use App\Models\Meal;


class MealPlanController extends Controller
{

    public function index()
    {
        $meal_plans = MealPlan::where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('MealPlans', [
            'meal_plans' => $meal_plans,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        MealPlan::create([
            'user_id' => auth()->id(),
            'name' => $validated['name'],
            'description' => $validated['description'],
        ]);

        return redirect()->back()->with('success', 'Meal plan created successfully!');
    }

    public function show($id)
    {
        $meal_plan = MealPlan::where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        $meal_plan_meals = MealPlanMeal::where('meal_plan_id', $id)
            ->with('meal')
            ->get();

        $available_meals = Meal::where('created_by', auth()->id())
            ->orderBy('name', 'asc')
            ->get();

        return Inertia::render('MealPlanView', [
            'meal_plan' => $meal_plan,
            'meal_plan_meals' => $meal_plan_meals,
            'available_meals' => $available_meals,
        ]);
    }

    public function destroy($id)
    {
        $mealPlan = MealPlan::where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        $mealPlan->delete();

        return redirect()->back()->with('success', 'Meal plan deleted successfully!');
    }

}
