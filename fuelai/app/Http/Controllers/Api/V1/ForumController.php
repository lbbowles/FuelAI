<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\ForumPost;
use App\Models\ForumThread;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ForumController extends Controller
{
    // Show all of the forum posts
   public function index(){
       try {
           $posts = ForumPost::with('user')
                ->withCount('threads as reply_count')
                ->orderBy('created_at', 'desc')
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
           'forum_id' => 'required|exists:forums,id'
       ]);

       try {
        Log::info('Creating post with:', $validated);

        $post = ForumPost::create([
            'forum_id' => $validated['forum_id'],
            'user_id' => $request->user()->id,
            'title' => $validated['title'],
            'content' => $validated['content'],
        ]);

        return response()->json([
            'message' => 'Post created successfull',
            'post_id' => $post->id
            ], 201);

       } catch (\Exception $e) {
           return response()->json([
               'message' => 'Failed to create post',
               'error' => $e->getMessage()
           ], 500);
       }
   }

    // Show a post and all comments
    public function show($postId){

        try {
            $post = ForumPost::with('user')->find($postId);

            if (!$post) {
                return response()->json(['message' => 'Post not found'
                ], 404);}

            $threads = ForumThread::with('user')
                ->where('post_id', $postId)
                ->orderBy('created_at', 'desc')
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

    public function reply(Request $request, $postId){

    // Confirm minimum length requirements are met
       $validated = $request->validate([
           'content' => 'required|string|min:10',
           ]);

        try {
            Log::info('Creating reply', ['post_id' => $postId, 'user_id' => $request->user()->id]);


            $post = ForumPost::find($postId);
            if (!$post) {
                return response()->json(['message' => 'Post not found'
                ], 404);
                }

            $thread = ForumThread::create([
                'post_id' => $postId,
                'user_id' => $request->user()->id,
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
            'message' => 'Failed to create reply:',
            'error' => $e->getMessage()
            ], 500);
        }
    }
}
