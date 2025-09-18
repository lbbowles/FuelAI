<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;

class ForumController extends Controller
{

    public function index(Request $request) {

        $posts = $this->getForumPosts();
        $categories = $this->getCategories();

        return Inertia::render('Forums', [
            'initialPosts' => $posts,
            'categories' => $categories,
            'forums' => []
        ]);

    }

    // Get functions

    private function getForumPosts()
    {
        $posts = DB::table('forum_posts')
            ->join('forum_threads', 'forum_posts.thread_id', '=', 'forum_threads.id')
            ->join('users', 'forum_posts.user_id', '=', 'users.id')
            ->join('forums', 'forum_threads.forum_id', '=', 'forums.id')
            ->select([
                'forum_posts.id',
                'forum_posts.content',
                'forum_posts.created_at',
                'forum_threads.title',
                'users.email as author', // Add a name field to user
                'forums.name as category'
            ])
            ->orderBy('forum_posts.created_at', 'desc')
            ->limit(20)
            ->get();


        //
        return $posts->map(function ($post) {
            return [
                'id' => $post->id,
                'title' => $post->title,
                'excerpt' => $this->createExcerpt($post->content),
                'content' => $post->content,
                'author' => $post->author,
                'authorAvatar' => strtoupper(substr($post->author, 0, 1)),
                'category' => $post->category,
                'replies' => 0, // placeholder
                'views' => 0, // placeholder
                'lastActivity' => $this->formatDate($post->created_at),
                'tags' => [], // placeholder
                'isPinned' => false,
                'isAnswered' => false
            ];
        });
    }

    private function getCategories()
    {
        $forums = DB::table('forums')->get();

        return $forums->map(function ($forum) {
            // Count threads in each forum
            $count = DB::table('forum_threads')
                ->where('forum_id', $forum->id)
                ->count();

            return [
                'id' => strtolower(str_replace(' ', '-', $forum->name)),
                'name' => $forum->name,
                'count' => $count
            ];
        });
    }

    // Helper functions

    // Shorten the content so we can display it
    // Length, CHARs
    private function createExcerpt($content, $length = 150)
    {
        $stripped = strip_tags($content);
        return strlen($stripped) > $length ? substr($stripped, 0, $length) . '...' : $stripped;
    }


    private function formatDate($date)
    {
        $carbon = \Carbon\Carbon::parse($date);

        if ($carbon->isToday()) {
            return 'today';
        } elseif ($carbon->isYesterday()) {
            return 'yesterday';
        } elseif ($carbon->diffInDays() < 7) {
            return $carbon->diffInDays() . ' days ago';
        } else {
            return $carbon->format('M j, Y');
        }
    }







}
