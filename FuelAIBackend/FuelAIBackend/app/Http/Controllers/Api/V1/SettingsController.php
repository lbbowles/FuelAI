<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;

class SettingsController extends Controller
{
    // Get the current user's information
    public function show(Request $request)
    {
        return new UserResource($request->user());
    }

    // Update the user's information
    public function update(Request $request)
    {
        $user = $request->user();

        $validatedData = $request->validate([
            'username' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
        ]);

        $user->update($validatedData);

        return new UserResource($user);
    }
}

