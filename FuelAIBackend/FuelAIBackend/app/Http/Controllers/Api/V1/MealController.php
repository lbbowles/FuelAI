<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Meal;
use App\Http\Resources\MealResource;

class MealController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return MealResource::collection(Meal::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //will add this later
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //will add this later
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //will add this later
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //will add this later
    }
}

