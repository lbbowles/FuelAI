<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\ForumPost;
use Illuminate\Http\Request;

class ForumPostController extends Controller
{
    /**
     * Remove a specific forum post
     * (Admin only)
     *
     * @param  \App\Models\ForumPost  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(ForumPost $post)
    {
        $post->delete();

        return response()->noContent();
    }
}

