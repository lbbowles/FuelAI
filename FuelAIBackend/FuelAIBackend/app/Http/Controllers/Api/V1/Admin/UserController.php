<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Display a listing of all users.
     * Admin only
     */
    public function index()
    {
        return UserResource::collection(User::all());
    }

    /**
     * Update the specified user's role.
     * Admin only
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'role' => ['required', Rule::in(['user', 'admin'])],
        ]);

        $user->update(['role' => $validated['role']]);

        return new UserResource($user);
    }
}

