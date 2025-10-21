<?php

namespace App\Http\Controllers;

use App\Models\MealPlanMeal;
use App\Models\MealPlan;
use Illuminate\Http\Request;


class MealPlanMealController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'meal_plan_id' => 'required|exists:meal_plans,id',
            'meal_id' => 'required|exists:meals,id',
            'day_of_week' => 'required|in:monday,tuesday,wednesday,thursday,friday,saturday,sunday',
            'meal_time' => 'required|in:breakfast,lunch,dinner,snack',
        ]);

        MealPlanMeal::create($validated);

        return redirect()->back()->with('success', 'Meal added to plan successfully!');
    }

    public function destroy($id)
    {
        $mealPlanMeal = MealPlanMeal::findOrFail($id);

        // Verify the user owns this meal plan
        $mealPlan = MealPlan::where('id', $mealPlanMeal->meal_plan_id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        $mealPlanMeal->delete();

        return redirect()->back()->with('success', 'Meal removed from plan!');
    }

}
