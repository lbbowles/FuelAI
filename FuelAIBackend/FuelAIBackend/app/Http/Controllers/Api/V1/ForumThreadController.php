<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\ForumThread;
use App\Http\Resources\ForumThreadResource;

class ForumThreadController extends Controller
{
    // Get all forum threads
    public function index()
    {
        $threads = ForumThread::with('user')->latest()->get();
        return ForumThreadResource::collection($threads);
    }

    // Get a single thread with all its posts
    public function show(ForumThread $thread)
    {
        $thread->load('user', 'posts.user');
        return new ForumThreadResource($thread);
    }
}
