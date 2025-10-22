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
       // Getting a 500 error after dropping a column.  Trying to diagnose it
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
}
