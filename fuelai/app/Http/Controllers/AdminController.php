<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\ForumPost;
use App\Models\ForumThread;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {

        return Inertia::render('admin');
    }

    public function stats()
    {
        $userCount = DB::table('users')->count();
        $postCount = DB::table('forum_posts')->count();
        $replyCount = DB::table('forum_threads')->count();

        return response()->json([
            'userCount'  => $userCount,
            'postCount'  => $postCount,
            'replyCount' => $replyCount,
        ]);
    }

    public function getUsers()
    {
        $users = User::select('id', 'username', 'email', 'role', 'created_at')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($users);
    }

    public function createUser(Request $request)
    {
        $request->validate([
            'username' => 'required|string|max:255|unique:users',
            'email'    => 'required|string|lowercase|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role'     => 'required|string|in:user,admin',
        ]);


        $user = User::create([
            'username'      => $request->username,
            'email'         => $request->email,
            'password_hash' => $request->password,
            'role'          => $request->role,
        ]);

        return response()->json(['message' => 'User created successfully.'], 201);
    }

    public function updateUser(Request $request, User $user)
    {
        $request->validate([
            'username' => 'required|string|max:255|unique:users,username,' . $user->id,
            'email'    => 'required|string|lowercase|email|max:255|unique:users,email,' . $user->id,
            'role'     => 'required|string|in:user,admin',
            'password' => ['nullable', 'confirmed', Rules\Password::defaults()],
        ]);

        $user->update([
            'username' => $request->username,
            'email'    => $request->email,
            'role'     => $request->role,
        ]);

        if ($request->filled('password')) {
            $user->update([
                'password_hash' => $request->password,
            ]);
        }

        return response()->json(['message' => 'User updated successfully.']);
    }


    public function deleteUser(User $user)
    {
        // Prevent deleting the last admin
        if ($user->role === 'admin' && User::where('role', 'admin')->count() === 1) {
            return response()->json(['error' => 'Cannot delete the only admin.'], 422);
        }

        // Prevent deleting yourself
        if ($user->id === auth()->id()) {
            return response()->json(['error' => 'You cannot delete your own account.'], 422);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted successfully.']);
    }


    public function getForumPosts()
    {
        $posts = DB::table('forum_posts')
            ->join('users', 'forum_posts.user_id', '=', 'users.id')
            ->select(
                'forum_posts.id',
                'forum_posts.title',
                'forum_posts.content',
                'users.username as author'
            )
            ->orderBy('forum_posts.created_at', 'desc')
            ->get();

        return response()->json($posts);
    }


    public function deleteForumPost(ForumPost $post)
    {
        $post->delete();

        return response()->json(['message' => 'Post and all its replies deleted.']);
    }

    public function getForumReplies()
    {
        $replies = DB::table('forum_threads')
            ->join('users', 'forum_threads.user_id', '=', 'users.id')
            ->join('forum_posts', 'forum_threads.post_id', '=', 'forum_posts.id')
            ->select(
                'forum_threads.id',
                'forum_threads.content',
                'users.username as author',
                'forum_posts.title as original_post_title'
            )
            ->orderBy('forum_threads.created_at', 'desc')
            ->get();

        return response()->json($replies);
    }
    public function deleteForumReply(ForumThread $thread)
    {
        $thread->delete();

        return response()->json(['message' => 'Reply deleted successfully.']);
    }
}
