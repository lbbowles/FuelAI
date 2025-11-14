<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    public function show(){
    return inertia('UserProfile', [
        'user' => Auth::user(),
    ]);
    }


    public function update(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'username' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|confirmed|min:6',
            'image' => 'nullable|image|max:4096',
        ]);


     

        // Handle profile image update
        if ($request->hasFile('image')) {
            $img = $request->file('image');
            $user->mime_type = $img->getMimeType();
            $user->image_data = base64_encode(file_get_contents($img->getRealPath()));
        }

        // Basic fields
        $user->username = $validated['username'];
        $user->email    = $validated['email'];

        // Update password only if provided
        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        return redirect()->back()->with('success', 'Profile updated successfully.');

    }
}
