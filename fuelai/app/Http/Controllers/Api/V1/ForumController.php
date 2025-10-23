<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ForumController extends Controller
{
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
        Log::info('User ID:', ['user_id' => $request->user()->id]);

           $postId = DB::table('forum_posts')->insertGetId([
               'forum_id' => $validated['forum_id'],
               'user_id' => $request->user()->id,
               'title' => $validated['title'],
               'content' => $validated['content'],
               'created_at' => now(),
               'updated_at' => now(),
           ]);

           return response()->json([
               'message' => 'Post created successfully',
               'post_id' => $postId
           ], 201);

       } catch (\Exception $e) {
           return response()->json([
               'message' => 'Failed to create post',
               'error' => $e->getMessage()
           ], 500);
       }
   }

    public function reply(Request $request, $postId){

    // Confirm minimum length requirements are met
       $validated = $request->validate([
           'content' => 'required|string|min:10',
           ]);
    }

    try {
        Log::info('Creating reply', ['post_id' => $postId, 'user_id' => $request->user()->id]);

        // Confirm this is a post that exists
        $post = DB::table('forum_posts')->where('id', $postID)->first();
        if(!$post) {
            return response()->json([
                'message' => 'Post not found'
                ], 404);
        }

        // Attempt table insert
        $threadID = DB::table('forum_threads')->insertGetId([
            'post_id' => $postID,
            'user_id' => $request->user()->id,
            'content' => $validated['content'],
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Log::info('Comment posted successfully', ['thread_id' => $threadId]);

        // Successful
        return response()->json([
            'message' => 'Reply created successfully',
            'thread_id' => $threadId
            ], 201);

        // Non-successful
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
