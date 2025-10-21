<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AiController extends Controller
{
    /**
     * Placeholder for generating a meal plan from a prompt
     */
    public function generateMealPlan(Request $request)
    {
        $request->validate([
            'prompt' => 'required|string|max:500',
        ]);

        // Placeholder response
        return response()->json([
            'data' => [
                'title' => 'AI Generated Vegan Plan',
                'calories' => 2000,
                'meals' => [
                    'breakfast' => 'Tofu Scramble with Spinach',
                    'lunch' => 'Large Lentil Soup',
                    'dinner' => 'Black Bean Burgers on Whole Wheat Buns',
                ]
            ]
        ]);
    }

    /**
     * Placeholder for recognizing food from an image
     */
    public function recognizeImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:2048', // 2mb max
        ]);

        // Placeholder response
        return response()->json([
            'data' => [
                'food_name' => 'Apple',
                'calories' => 95,
                'confidence' => 0.98,
            ]
        ]);
    }
}
