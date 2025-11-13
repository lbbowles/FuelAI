<?php

namespace App\Http\Controllers;

use App\Models\Meal;
use App\Models\MealPlan;
use App\Models\NutritionalInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
            'name'            => 'required|string|max:255',
            'description'     => 'nullable|string',
            'calories'        => 'nullable|numeric|min:0',
            'protein'         => 'nullable|numeric|min:0',
            'carbs'           => 'nullable|numeric|min:0',
            'fat'             => 'nullable|numeric|min:0',
            'fiber'           => 'nullable|numeric|min:0',
            'sugar'           => 'nullable|numeric|min:0',
            'sodium'          => 'nullable|numeric|min:0',
            'other_nutrients' => 'nullable|string',
            'image'           => 'nullable|image|max:4096',
            'instruction'     => 'nullable|string',
        ]);

        DB::transaction(function () use ($validated, $request) {

            $imageData = null;
            $mimeType  = null;

            if ($request->hasFile('image')) {
                $image      = $request->file('image');
                $mimeType   = $image->getMimeType();
                $imageData  = base64_encode(file_get_contents($image->getRealPath()));
            }

            // Create Meal
            $meal = Meal::create([
                'created_by' => auth()->id(),
                'name'       => $validated['name'],
                'description'=> $validated['description'] ?? null,
                'image_data' => $imageData,
                'mime_type'  => $mimeType,
                'instruction'=> $validated['instruction'] ?? null,
            ]);

            // Create associated Nutritional Info
            NutritionalInfo::create([
                'meal_id'         => $meal->id,
                'calories'        => $validated['calories'] ?? null,
                'protein'         => $validated['protein'] ?? null,
                'carbs'           => $validated['carbs'] ?? null,
                'fat'             => $validated['fat'] ?? null,
                'fiber'           => $validated['fiber'] ?? null,
                'sugar'           => $validated['sugar'] ?? null,
                'sodium'          => $validated['sodium'] ?? null,
                'other_nutrients' => $validated['other_nutrients'] ?? null,
            ]);
        });

        return redirect('/meal_list')->with('success', 'Meal created successfully!');
    }

    public function show($id)
    {
        $meal = Meal::where('id', $id)
        ->where('created_by', auth()->id())
        ->with('nutritionalInfo') 
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
        ->with('nutritionalInfo')
        ->firstOrFail();

    $validated = $request->validate([
        'name'            => 'required|string|max:255',
        'description'     => 'nullable|string',
        'calories'        => 'nullable|numeric|min:0',
        'protein'         => 'nullable|numeric|min:0',
        'carbs'           => 'nullable|numeric|min:0',
        'fat'             => 'nullable|numeric|min:0',
        'fiber'           => 'nullable|numeric|min:0',
        'sugar'           => 'nullable|numeric|min:0',
        'sodium'          => 'nullable|numeric|min:0',
        'other_nutrients' => 'nullable|string',
        'instruction'      => 'nullable|string',
    ]);

    DB::transaction(function () use ($meal, $validated) {

        // Update Meal basic info
        $meal->update([
            'name'        => $validated['name'],
            'description' => $validated['description'],
        ]);

        // Update nutritional info
        $meal->nutritionalInfo->update([
            'calories'        => $validated['calories'] ?? null,
            'protein'         => $validated['protein'] ?? null,
            'carbs'           => $validated['carbs'] ?? null,
            'fat'             => $validated['fat'] ?? null,
            'fiber'           => $validated['fiber'] ?? null,
            'sugar'           => $validated['sugar'] ?? null,
            'sodium'          => $validated['sodium'] ?? null,
            'other_nutrients' => $validated['other_nutrients'] ?? null,
        ]);
    });

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

    // Get all meals for user
        public function apiIndex()
        {
            $meals = Meal::where('created_by', auth()->id())
                ->orderBy('name', 'asc')
                ->get();

            return response()->json([
                'meals' => $meals
            ], 200);
        }

    // Create a new meals
    public function apiStore(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'calories' => 'nullable|integer|min:0',
            'protein' => 'nullable|numeric|min:0',
            'carbs' => 'nullable|numeric|min:0',
            'fat' => 'nullable|numeric|min:0'
        ]);

        $meal = Meal::create([
            'created_by' => auth()->id(),
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'calories' => $validated['calories'] ?? 0,
            'protein' => $validated['protein'] ?? 0,
            'carbs' => $validated['carbs'] ?? 0,
            'fat' => $validated['fat'] ?? 0,
        ]);

        return response()->json([
            'message' => 'Meal created',
            'meal' => $meal
        ], 201);

    }
}

