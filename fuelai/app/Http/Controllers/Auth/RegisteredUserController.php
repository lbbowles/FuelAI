<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
     public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
                'username' => 'required|string|max:255',
                'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
                'role' => 'required|string|max:255',
                'image' => 'nullable|image|max:4096', // NEW: file upload support
            ]);

            // Handle profile image
            $imageData = null;
            $mimeType = null;

            if ($request->hasFile('image')) {
                $img = $request->file('image');
                $imageData = base64_encode(file_get_contents($img->getRealPath()));
                $mimeType = $img->getMimeType(); // e.g. image/png
            }

            // Create the user
            $user = User::create([
                'username' => $validated['username'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'role' => $validated['role'],
                'image_data' => $imageData,
                'mime_type' => $mimeType,
            ]);

            event(new Registered($user));

            Auth::login($user);

            return redirect()->intended(route('dashboard', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
