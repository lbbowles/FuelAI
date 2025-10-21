<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MealPlanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Displaying dummy data for now
        $dummyPlan = [
            'Monday' => [
                ['time' => '8am', 'meal' => 'Oatmeal with Berries'],
                ['time' => '1pm', 'meal' => 'Grilled Chicken Salad'],
                ['time' => '6pm', 'meal' => 'Salmon with Asparagus'],
            ],
            'Tuesday' => [
                ['time' => '8am', 'meal' => 'Scrambled Eggs and Spinach'],
                ['time' => '1pm', 'meal' => 'Quinoa Bowl with Black Beans'],
                ['time' => '6pm', 'meal' => 'Tofu Stir-fry'],
            ],
            'Wednesday' => [
                ['time' => '8am', 'meal' => 'Greek Yogurt with Honey'],
                ['time' => '1pm', 'meal' => 'Lentil Soup and a side salad'],
                ['time' => '6pm', 'meal' => 'Turkey Meatballs with Zucchini Noodles'],
            ],
            'Thursday' => [
                ['time' => '8am', 'meal' => 'Protein Smoothie with Almond Milk'],
                ['time' => '1pm', 'meal' => 'Leftover Turkey Meatballs'],
                ['time' => '6pm', 'meal' => 'Beef and Broccoli'],
            ],
            'Friday' => [
                ['time' => '8am', 'meal' => 'Avocado Toast with a Poached Egg'],
                ['time' => '1pm', 'meal' => 'Tuna Salad Sandwich on Whole Wheat'],
                ['time' => '6pm', 'meal' => 'Chicken Fajitas with Peppers and Onions'],
            ],
            'Saturday' => [
                ['time' => '9am', 'meal' => 'Protein Pancakes with Fruit'],
                ['time' => '2pm', 'meal' => 'Leftover Chicken Fajitas'],
                ['time' => '7pm', 'meal' => 'Homemade Pizza on Cauliflower Crust'],
            ],
            'Sunday' => [
                ['time' => '9am', 'meal' => 'Vegetable Omelette'],
                ['time' => '2pm', 'meal' => 'Chicken Caesar Wrap'],
                ['time' => '7pm', 'meal' => 'Roast Chicken with Root Vegetables'],
            ],
        ];

        return response()->json(['data' => $dummyPlan]);
    }
}
