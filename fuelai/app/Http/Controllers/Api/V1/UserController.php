    <?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Update the authenticated user's profile
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'username' => 'sometimes|string|max:255|unique:users,username,' . $request->user()->id,
            'profile_image_url' => 'sometimes|string|nullable',
        ]);

        $user = $request->user();
        $user->update($validated);

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user
        ]);
    }

    /**
     * Allow the authenticated user to follow another user
     */
    public function follow(Request $request, User $user)
    {
        $follower = $request->user();

        $follower->following()->attach($user->id);

        return response()->json(['message' => 'Successfully followed user.']);
    }

    /**
     * Get the list of users who are following the given user
     */
    public function followers(User $user)
    {
        return response()->json($user->followers);
    }
}
