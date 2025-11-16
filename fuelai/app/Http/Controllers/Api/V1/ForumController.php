<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Forum;
use App\Models\ForumPost;
use App\Models\ForumThread;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ForumController extends Controller
{
    // Get all forum categories
    public function getCategories()
    {
        $forums = Forum::all();
        return response()->json(['forums' => $forums]);
    }

    // Show all of the forum posts
    public function index()
    {
        try {
            $posts = ForumPost::with('threads')
                ->join('users', 'forum_posts.user_id', '=', 'users.id')
                ->select(
                    'forum_posts.*',
                    'users.username',
                )
                ->withCount('threads as reply_count')
                ->orderBy('forum_posts.created_at', 'desc')
                ->get();


            return response()->json(['posts' => $posts], 200);
        } catch (\Exception $e) {
            Log::error('Failed to fetch posts:', ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Failed to fetch posts',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Store new forum post
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255|min:5',
            'content' => 'required|string|min:10',
            'category_id' => 'required|exists:forums,id',
        ]);

        try {
            Log::info('Creating post with:', $validated);

            $post = ForumPost::create([
                'user_id' => $request->user()->id,
                'title' => $validated['title'],
                'content' => $validated['content'],
                'category_id' => $validated['category_id'],
            ]);

            return response()->json([
                'message' => 'Post created successfully',
                'post' => $post
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create post',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Show a post and all replies (threads)
    public function show($postId)
    {
        try {
            $post = ForumPost::join('users', 'forum_posts.user_id', '=', 'users.id')
                ->where('forum_posts.id', $postId)
                ->select('forum_posts.*', 'users.username')
                ->first();

            if (!$post) {
                return response()->json(['message' => 'Post not found'], 404);
            }

            $threads = ForumThread::join('users', 'forum_threads.user_id', '=', 'users.id')
                ->where('forum_threads.post_id', $postId)
                ->select('forum_threads.*', 'users.username')
                ->orderBy('forum_threads.created_at', 'asc')
                ->get();

            return response()->json([
                'post' => $post,
                'threads' => $threads,
                'thread_count' => $threads->count()
            ], 200);
        } catch (\Exception $e) {
            Log::error('Failed to fetch post:', ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Failed to fetch post',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function reply(Request $request, $postId)
    {
        $validated = $request->validate([
            'content' => 'required|string|min:10',
        ]);

        try {
            Log::info('Creating reply', ['post_id' => $postId, 'user_id' => $request->user()->id]);

            $post = ForumPost::find($postId);
            if (!$post) {
                return response()->json(['message' => 'Post not found'], 404);
            }

            $thread = ForumThread::create([
                'post_id' => $postId,
                'user_id' => $request->user()->id,
                'title' => '',
                'content' => $validated['content'],
            ]);

            Log::info('Reply posted successfully', ['thread_id' => $thread->id]);

            return response()->json([
                'message' => 'Reply created successfully',
                'thread_id' => $thread->id
            ], 201);
        } catch (\Exception $e) {
            Log::error('Reply creation failed:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'message' => 'Failed to create reply',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Delete a post (only if user owns it)
    public function destroy(Request $request, $id)
    {
        try {
            $post = ForumPost::where('id', $id)
                ->where('user_id', $request->user()->id)
                ->first();

            if (!$post) {
                return response()->json([
                    'message' => 'Post not found or unauthorized'
                ], 404);
            }

            // Delete associated threads first
            ForumThread::where('post_id', $id)->delete();

            // Delete the post
            $post->delete();

            return response()->json([
                'message' => 'Post deleted successfully'
            ], 200);
        } catch (\Exception $e) {
            Log::error('Failed to delete post:', ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Failed to delete post',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
