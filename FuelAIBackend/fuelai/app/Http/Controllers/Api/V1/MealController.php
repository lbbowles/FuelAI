<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\MealPlan;
use App\Models\MealPlanMeal;
use Illuminate\Http\Request;

class MealPlanController extends Controller
{
    // Get all meal plans for user
    public function index()
    {
        $meal_plans = MealPlan::where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'meal_plans' => $meal_plans
        ], 200);
    }

    // Create meal plan
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $mealPlan = MealPlan::create([
            'user_id' => auth()->id(),
            'name' => $validated['name'],
            'description' => $validated['description'],
        ]);

        return response()->json([
            'message' => 'Meal plan created successfully',
            'meal_plan' => $mealPlan
        ], 201);
    }

    // Get single meal plan with meals (INCLUDE NUTRITIONAL INFO)
    public function show($id)
    {
        $meal_plan = MealPlan::where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        $meal_plan_meals = MealPlanMeal::where('meal_plan_id', $id)
            ->with(['meal.nutritionalInfo'])  // ← ADD THIS
            ->get();

        return response()->json([
            'meal_plan' => $meal_plan,
            'meal_plan_meals' => $meal_plan_meals
        ], 200);
    }

    // Delete meal plan
    public function destroy($id)
    {
        $mealPlan = MealPlan::where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        $mealPlan->delete();

        return response()->json([
            'message' => 'Meal plan deleted successfully'
        ], 200);
    }

    // Add meal to plan (MOBILE VERSION - no spaces in meal_time)
    public function addMeal(Request $request, $id)
    {
        $validated = $request->validate([
            'meal_id' => 'required|exists:meals,id',
            'day_of_week' => 'required|in:Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday',
            'meal_time' => 'required|in:Breakfast,Lunch,Dinner,Snack', // NO SPACES
        ]);

        // Verify user owns this meal plan
        $mealPlan = MealPlan::where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        // Check if meal already exists in this slot
        $existing = MealPlanMeal::where('meal_plan_id', $id)
            ->where('day_of_week', $validated['day_of_week'])
            ->where('meal_time', $validated['meal_time'])
            ->first();

        if ($existing) {
            // Update existing meal
            $existing->update([
                'meal_id' => $validated['meal_id'],
                'updated_at' => now()
            ]);

            $existing->load(['meal.nutritionalInfo']);  // ← ADD THIS

            return response()->json([
                'message' => 'Meal updated successfully!',
                'meal_plan_meal' => $existing
            ], 200);
        }

        // Create new meal slot
        $mealPlanMeal = MealPlanMeal::create([
            'meal_plan_id' => $id,
            'meal_id' => $validated['meal_id'],
            'day_of_week' => $validated['day_of_week'],
            'meal_time' => $validated['meal_time'],
        ]);

        $mealPlanMeal->load(['meal.nutritionalInfo']);  // ← ADD THIS

        return response()->json([
            'message' => 'Meal added successfully!',
            'meal_plan_meal' => $mealPlanMeal
        ], 201);
    }

    // Remove meal from plan
    public function removeMeal($mealPlanMealId)
    {
        $mealPlanMeal = MealPlanMeal::findOrFail($mealPlanMealId);

        // Verify user owns the meal plan
        $mealPlan = MealPlan::where('id', $mealPlanMeal->meal_plan_id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        $mealPlanMeal->delete();

        return response()->json([
            'message' => 'Meal removed'
        ], 200);
    }
}
