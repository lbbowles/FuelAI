<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Meal;
use App\Http\Resources\MealResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RecipeController extends Controller
{
    /**
     * Store a newly created recipe
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'image_url' => 'nullable|url',
            'calories' => 'required|integer',
            'protein' => 'required|numeric',
            'carbs' => 'required|numeric',
            'fat' => 'required|numeric',
        ]);

        $meal = DB::transaction(function () use ($validated, $request) {
            $meal = Meal::create([
                'name' => $validated['name'],
                'description' => $validated['description'],
                'image_url' => $validated['image_url'],
                'created_by' => $request->user()->id,
            ]);

            $meal->nutritionalInfo()->create([
                'calories' => $validated['calories'],
                'protein' => $validated['protein'],
                'carbs' => $validated['carbs'],
                'fat' => $validated['fat'],
            ]);

            return $meal;
        });

        return new MealResource($meal->load('nutritionalInfo'));
    }

    /**
     * Update the specified recipe
     */
    public function update(Request $request, Meal $recipe)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'image_url' => 'nullable|url',
            'calories' => 'sometimes|required|integer',
            'protein' => 'sometimes|required|numeric',
            'carbs' => 'sometimes|required|numeric',
            'fat' => 'sometimes|required|numeric',
        ]);

        DB::transaction(function () use ($validated, $recipe) {
            $recipe->update($validated);
            if ($recipe->nutritionalInfo) {
                $recipe->nutritionalInfo->update($validated);
            }
        });

        return new MealResource($recipe->load('nutritionalInfo'));
    }

    /**
     * Remove the specified recipe
     */
    public function destroy(Meal $recipe)
    {
        DB::transaction(function () use ($recipe) {
            $recipe->nutritionalInfo()->delete();
            $recipe->delete();
        });

        return response()->noContent();
    }
}
