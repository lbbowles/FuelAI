<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Meal;
use App\Models\ForumThread;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Retrieve dashboard statistics for admin
     *
     */
    public function index()
    {
        $stats = [
            'totalUsers' => User::count(),
            'totalRecipes' => Meal::count(),
            'totalThreads' => ForumThread::count(),
        ];

        return response()->json(['data' => $stats]);
    }
}
