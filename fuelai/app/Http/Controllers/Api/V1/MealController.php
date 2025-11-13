<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Meal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class MealController extends Controller
{
    // Get all meals (mobile shows all meals, not just user's)
    public function index()
    {
        $meals = Meal::with('nutritionalInfo')
            ->orderBy('name', 'asc')
            ->get();
        
        return response()->json([
            'meals' => $meals
        ], 200);
    }

    // Create a new meal
    public function store(Request $request)
    {
        Log::info('Meal creation request:', $request->all());

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'calories' => 'nullable|integer|min:0',
            'protein' => 'nullable|numeric|min:0',
            'carbs' => 'nullable|numeric|min:0',
            'fat' => 'nullable|numeric|min:0'
        ]);

        try {
            DB::beginTransaction();

            // Create the meal
            $meal = Meal::create([
                'created_by' => auth()->id(),
                'name' => $validated['name'],
                'description' => $validated['description'] ?? null,
            ]);

            Log::info('Meal created with ID:', ['meal_id' => $meal->id]);

            // Create nutritional info
            $nutritionalInfo = $meal->nutritionalInfo()->create([
                'calories' => $validated['calories'] ?? 0,
                'protein' => $validated['protein'] ?? 0,
                'carbs' => $validated['carbs'] ?? 0,
                'fat' => $validated['fat'] ?? 0,
            ]);

            Log::info('Nutritional info created:', $nutritionalInfo->toArray());

            DB::commit();

            // Reload meal with nutritional info
            $meal->load('nutritionalInfo');

            Log::info('Final meal with nutritional info:', $meal->toArray());

            return response()->json([
                'message' => 'Meal created',
                'meal' => $meal
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Failed to create meal:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'message' => 'Failed to create meal',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
