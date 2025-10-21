<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

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

    // Create
    public function create()
    {
        $forums = DB::table('forums')
            ->select('id', 'name', 'description')
            ->orderBy('name')
            ->get();

        return Inertia::render('ForumCreate', [
            'forums' => $forums
        ]);
    }

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
                'user_id' => Auth::id(),
                'title' => $validated['title'],
                'created_at' => now()
            ]);

            // Create first post in thread
            DB::table('forum_posts')->insert([
                'thread_id' => $threadId,
                'user_id' => Auth::id(),
                'content' => $validated['content'],
                'created_at' => now()
            ]);

            DB::commit();

            return redirect()->route('forums.index')
                ->with('success', 'Forum post created successfully!');

        } catch (\Exception $e) {
            DB::rollBack();

            return back()
                ->withErrors(['error' => 'Failed to create forum post: ' . $e->getMessage()])
                ->withInput();
        }
    }

    // Show individual forum thread
    public function show($id)
    {
        $thread = DB::table('forum_threads')
            ->join('forums', 'forum_threads.forum_id', '=', 'forums.id')
            ->join('users', 'forum_threads.user_id', '=', 'users.id')
            ->where('forum_threads.id', $id)
            ->select([
                'forum_threads.id',
                'forum_threads.title',
                'forum_threads.user_id',
                'forum_threads.created_at',
                'forums.name as category',
                'users.username as author'
            ])
            ->first();

        if (!$thread) {
            abort(404);
        }

        $posts = DB::table('forum_posts')
            ->join('users', 'forum_posts.user_id', '=', 'users.id')
            ->where('forum_posts.thread_id', $id)
            ->select([
                'forum_posts.id',
                'forum_posts.content',
                'forum_posts.user_id',
                'forum_posts.created_at',
                'users.username as author'
            ])
            ->orderBy('forum_posts.created_at', 'asc')
            ->get()
            ->map(function ($post) {
                return [
                    'id' => $post->id,
                    'content' => $post->content,
                    'author' => $post->author,
                    'userId' => $post->user_id,
                    'authorAvatar' => strtoupper(substr($post->author, 0, 1)),
                    'createdAt' => $this->formatDate($post->created_at)
                ];
            });

        return Inertia::render('ForumThread', [
            'thread' => [
                'id' => $thread->id,
                'title' => $thread->title,
                'category' => $thread->category,
                'author' => $thread->author,
                'userId' => $thread->user_id,
                'createdAt' => $this->formatDate($thread->created_at)
            ],
            'posts' => $posts
        ]);
    }

    public function reply(Request $request, $id)
    {
        $validated = $request->validate([
            'content' => 'required|string|min:10'
        ]);

        try {
            DB::table('forum_posts')->insert([
                'thread_id' => $id,
                'user_id' => Auth::id(),
                'content' => $validated['content'],
                'created_at' => now()
            ]);

            return back();

        } catch (\Exception $e) {
            \Log::error('Reply creation failed: ' . $e->getMessage());

            return back()
                ->withErrors(['error' => 'Failed to post reply: ' . $e->getMessage()])
                ->withInput();
        }
    }



    // Get functions

    private function getForumPosts()
    {
        $threads = DB::table('forum_threads')
            ->join('forums', 'forum_threads.forum_id', '=', 'forums.id')
            ->join('users', 'forum_threads.user_id', '=', 'users.id')
            ->select(
                'forum_threads.id as thread_id',
                'forum_threads.title',
                'forum_threads.created_at as thread_created_at',
                'users.username as author',
                'forums.name as category'
            )
            ->orderBy('forum_threads.created_at', 'desc')
            ->limit(20)
            ->get();

        return $threads->map(function ($thread) {
            // Get the first post content for excerpt
            $firstPost = DB::table('forum_posts')
                ->where('thread_id', $thread->thread_id)
                ->orderBy('created_at', 'asc')
                ->first();

            // Count replies (subtract 1 for original post)
            $replyCount = DB::table('forum_posts')
                    ->where('thread_id', $thread->thread_id)
                    ->count() - 1;


            $lastPost = DB::table('forum_posts')
                ->where('thread_id', $thread->thread_id)
                ->orderBy('created_at', 'desc')
                ->first();

            return [
                'id' => $thread->thread_id,
                'title' => $thread->title,
                'excerpt' => $firstPost ? $this->createExcerpt($firstPost->content) : '',
                'content' => $firstPost ? $firstPost->content : '',
                'author' => $thread->author,
                'authorAvatar' => strtoupper(substr($thread->author, 0, 1)),
                'category' => $thread->category,
                'replies' => max(0, $replyCount),
                'views' => 0,
                'lastActivity' => $this->formatDate($lastPost->created_at ?? $thread->thread_created_at),
                'tags' => [],
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

    // AI function

    public function aiReply(Request $request, $id)
    {
        // Get thread and all posts for context
        $thread = DB::table('forum_threads')
            ->where('id', $id)
            ->first();

        if (!$thread) {
            return response()->json(['error' => 'Thread not found'], 404);
        }

        $posts = DB::table('forum_posts')
            ->join('users', 'forum_posts.user_id', '=', 'users.id')
            ->where('thread_id', $id)
            ->orderBy('forum_posts.created_at', 'asc')
            ->select('forum_posts.content', 'users.username', 'forum_posts.created_at')
            ->get();

        // Build conversation context
        $conversationContext = "Thread Title: {$thread->title}\n\n";
        foreach ($posts as $post) {
            $conversationContext .= "{$post->username}: {$post->content}\n\n";
        }

        try {
            $apiKey = env('VITE_OPENROUTER_API_KEY');

            if (!$apiKey) {
                return response()->json(['error' => 'API key not configured'], 500);
            }


            $prompt = "You are a helpful food and cooking assistant. Based on the following forum discussion, provide a helpful, informative response. Be conversational and friendly.\n\n{$conversationContext}\n\nProvide a helpful response:";

            $ch = curl_init('https://openrouter.ai/api/v1/chat/completions');
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                "Authorization: Bearer {$apiKey}",
                "HTTP-Referer: " . $request->getSchemeAndHttpHost(),
                "X-Title: FuelAI Forum",
                "Content-Type: application/json"
            ]);

            $payload = json_encode([
                "model" => "openai/gpt-4o-mini",
                "messages" => [
                    [
                        "role" => "system",
                        "content" => "You are a knowledgeable and friendly food and cooking assistant. Provide helpful, accurate advice about recipes, cooking techniques, nutrition, and food-related questions. Be conversational but informative."
                    ],
                    [
                        "role" => "user",
                        "content" => $prompt
                    ]
                ],
                "temperature" => 0.7,
                "max_tokens" => 1000
            ]);

            curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);

            $response = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

            if (curl_errno($ch)) {
                $error = curl_error($ch);
                curl_close($ch);
                return response()->json(['error' => 'Network error: ' . $error], 500);
            }

            curl_close($ch);

            if ($httpCode !== 200) {
                return response()->json(['error' => 'AI service returned error: ' . $httpCode], 500);
            }

            $data = json_decode($response, true);

            if (!$data) {
                return response()->json(['error' => 'Invalid response from AI service'], 500);
            }

            $aiResponse = $data['choices'][0]['message']['content'] ?? null;

            if (!$aiResponse) {
                return response()->json(['error' => 'No response from AI'], 500);
            }

            // Create AI post
            DB::table('forum_posts')->insert([
                'thread_id' => $id,
                'user_id' => 6, // This needs to become dynamic, as the ID isn't the same on all devices
                'content' => "AI Assistant:\n\n" . $aiResponse,
                'created_at' => now()
            ]);

            return response()->json(['success' => true]);

        } catch (\Exception $e) {

            return response()->json(['error' => 'Failed to generate AI response: ' . $e->getMessage()], 500);
        }
    }

    // Delete & Edit functions

    public function destroy($id)
    {
        $thread = DB::table('forum_threads')
            ->where('id', $id)
            ->where('user_id', Auth::id())
            ->first();

        if (!$thread) {
            return back()->withErrors(['error' => 'Thread not found or you do not have permission to delete it.']);
        }

        DB::beginTransaction();

        try {
            // Delete all posts in the thread
            DB::table('forum_posts')->where('thread_id', $id)->delete();

            // Delete the thread
            DB::table('forum_threads')->where('id', $id)->delete();

            DB::commit();

            return redirect()->route('forums.index');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Failed to delete thread: ' . $e->getMessage()]);
        }
    }

    // Delete individual post
    public function destroyPost($threadId, $postId)
    {
        $post = DB::table('forum_posts')
            ->where('id', $postId)
            ->where('thread_id', $threadId)
            ->where('user_id', Auth::id())
            ->first();

        if (!$post) {
            return back()->withErrors(['error' => 'Post not found or you do not have permission to delete it.']);
        }

        // Don't allow deleting the first post (which would orphan the thread)
        $firstPost = DB::table('forum_posts')
            ->where('thread_id', $threadId)
            ->orderBy('created_at', 'asc')
            ->first();

        if ($firstPost->id == $postId) {
            return back()->withErrors(['error' => 'Cannot delete the original post. Delete the entire thread instead.']);
        }

        try {
            DB::table('forum_posts')->where('id', $postId)->delete();
            return back();

        } catch (\Exception $e) {
            \Log::error('Post deletion failed: ' . $e->getMessage());
            return back()->withErrors(['error' => 'Failed to delete post: ' . $e->getMessage()]);
        }
    }

    // Update post
    public function updatePost(Request $request, $threadId, $postId)
    {
        $post = DB::table('forum_posts')
            ->where('id', $postId)
            ->where('thread_id', $threadId)
            ->where('user_id', Auth::id())
            ->first();

        if (!$post) {
            return back()->withErrors(['error' => 'Post not found or you do not have permission to edit it.']);
        }

        $validated = $request->validate([
            'content' => 'required|string|min:10'
        ]);

        try {
            DB::table('forum_posts')
                ->where('id', $postId)
                ->update([
                    'content' => $validated['content']
                ]);

            return back();

        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to update post: ' . $e->getMessage()]);
        }
    }


    // Helper functions

    // Shorten the content so we can display it
    // Length, CHARs
    private function createExcerpt($content, $length = 200)
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
