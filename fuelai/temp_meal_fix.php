    // Get all meals for user
    public function apiIndex()
    {
        $meals = Meal::orderBy('name', 'asc')
            ->get();

        return response()->json([
            'meals' => $meals
        ], 200);
    }
