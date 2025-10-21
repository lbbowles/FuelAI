<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ForumController extends Controller
{
    // Store new forum post
    public function store(Request $request)
    {

        // Validate input
        $validated = $request->validate([
            'title' => 'required|string|max:255|min:5',
            'content' => 'required|string|min:10',
            'forum_id' => 'required|exists:forums,id'
        ]);

        DB::beginTransaction();

        try {

            // Create thread
            $threadId = DB::table('forum_threads')->insertGetId([
                'forum_id' => $validated['forum_id'],
                'user_id' => $request->user()->id,
                'title' => $validated['title'],
                'created_at' => now()
            ]);

            // Create first post in thread
            DB::table('forum_posts')->insert([
                'thread_id' => $threadId,
                'user_id' => $request->user()->id,
                'content' => $validated['content'],
                'created_at' => now()
            ]);

            DB::commit();

            // Similar but different ending due to this being for the mobile app/not being able to use forums.index
            return response()->json([
                'message' => 'Thread created successfully',
                'thread_id' => $threadId
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Failed to create thread',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
