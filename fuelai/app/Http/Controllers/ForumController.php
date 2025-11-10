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

        try {
            // Create post in forum_posts table
            $postId = DB::table('forum_posts')->insertGetId([
                'forum_id' => $validated['forum_id'],
                'user_id' => Auth::id(),
                'title' => $validated['title'],
                'content' => $validated['content'],
                'created_at' => now(),
                'updated_at' => now()
            ]);

            return redirect()->route('forums.index')
                ->with('success', 'Forum post created successfully!');

        } catch (\Exception $e) {
            return back()
                ->withErrors(['error' => 'Failed to create forum post: ' . $e->getMessage()])
                ->withInput();
        }
    }

    // Show individual forum post with its threads (replies)
    public function show($id)
    {
        $post = DB::table('forum_posts')
            ->join('forums', 'forum_posts.forum_id', '=', 'forums.id')
            ->join('users', 'forum_posts.user_id', '=', 'users.id')
            ->where('forum_posts.id', $id)
            ->select([
                'forum_posts.id',
                'forum_posts.title',
                'forum_posts.content',
                'forum_posts.user_id',
                'forum_posts.created_at',
                'forums.name as category',
                'users.username as author'
            ])
            ->first();

        if (!$post) {
            abort(404);
        }

        // Get all replies (threads) for this post
        $threads = DB::table('forum_threads')
            ->join('users', 'forum_threads.user_id', '=', 'users.id')
            ->where('forum_threads.post_id', $id)
            ->select([
                'forum_threads.id',
                'forum_threads.content',
                'forum_threads.user_id',
                'forum_threads.created_at',
                'users.username as author'
            ])
            ->orderBy('forum_threads.created_at', 'asc')
            ->get()
            ->map(function ($thread) {
                return [
                    'id' => $thread->id,
                    'content' => $thread->content,
                    'author' => $thread->author,
                    'userId' => $thread->user_id,
                    'authorAvatar' => strtoupper(substr($thread->author, 0, 1)),
                    'createdAt' => $this->formatDate($thread->created_at)
                ];
            });

        return Inertia::render('ForumThread', [
            'post' => [
                'id' => $post->id,
                'title' => $post->title,
                'content' => $post->content,
                'category' => $post->category,
                'author' => $post->author,
                'userId' => $post->user_id,
                'createdAt' => $this->formatDate($post->created_at)
            ],
            'threads' => $threads
        ]);
    }

    // Reply to a post (creates a thread)
    public function reply(Request $request, $id)
    {
        $validated = $request->validate([
            'content' => 'required|string|min:10'
        ]);

        try {
            DB::table('forum_threads')->insert([
                'post_id' => $id,
                'user_id' => Auth::id(),
                'content' => $validated['content'],
                'created_at' => now(),
                'updated_at' => now()
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
        $posts = DB::table('forum_posts')
            ->join('forums', 'forum_posts.forum_id', '=', 'forums.id')
            ->join('users', 'forum_posts.user_id', '=', 'users.id')
            ->select(
                'forum_posts.id as post_id',
                'forum_posts.title',
                'forum_posts.content',
                'forum_posts.created_at as post_created_at',
                'users.username as author',
                'forums.name as category'
            )
            ->orderBy('forum_posts.created_at', 'desc')
            ->limit(20)
            ->get();

        return $posts->map(function ($post) {
            // Count replies (threads)
            $replyCount = DB::table('forum_threads')
                ->where('post_id', $post->post_id)
                ->count();

            // Get last reply
            $lastThread = DB::table('forum_threads')
                ->where('post_id', $post->post_id)
                ->orderBy('created_at', 'desc')
                ->first();

            return [
                'id' => $post->post_id,
                'title' => $post->title,
                'excerpt' => $this->createExcerpt($post->content),
                'content' => $post->content,
                'author' => $post->author,
                'authorAvatar' => strtoupper(substr($post->author, 0, 1)),
                'category' => $post->category,
                'replies' => $replyCount,
                'views' => 0,
                'lastActivity' => $this->formatDate($lastThread->created_at ?? $post->post_created_at),
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
            // Count posts in each forum
            $count = DB::table('forum_posts')
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
        // Get post and all threads for context
        $post = DB::table('forum_posts')
            ->where('id', $id)
            ->first();

        if (!$post) {
            return response()->json(['error' => 'Post not found'], 404);
        }

        $threads = DB::table('forum_threads')
            ->join('users', 'forum_threads.user_id', '=', 'users.id')
            ->where('post_id', $id)
            ->orderBy('forum_threads.created_at', 'asc')
            ->select('forum_threads.content', 'users.username', 'forum_threads.created_at')
            ->get();

        // Build conversation context
        $conversationContext = "Original Post Title: {$post->title}\n\n";
        $conversationContext .= "Original Post Content: {$post->content}\n\n";
        $conversationContext .= "Replies:\n\n";

        foreach ($threads as $thread) {
            $conversationContext .= "{$thread->username}: {$thread->content}\n\n";
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

            // Get or create AI user
            $aiUser = DB::table('users')->where('username', 'Openrouter')->first();

            if (!$aiUser) { // Should never happen but in case.
                return response()->json(['error' => 'AI user not configured'], 500);
            }

            // Create AI reply as a thread
            DB::table('forum_threads')->insert([
                'post_id' => $id,
                'user_id' => $aiUser->id,
                'content' => $aiResponse,
                'created_at' => now(),
                'updated_at' => now()
            ]);

            return response()->json(['success' => true]);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to generate AI response: ' . $e->getMessage()], 500);
        }
    }

    // Delete & Edit functions

    public function destroy($id)
    {
        $post = DB::table('forum_posts')
            ->where('id', $id)
            ->where('user_id', Auth::id())
            ->first();

        if (!$post) {
            return back()->withErrors(['error' => 'Post not found or you do not have permission to delete it.']);
        }


        try {
            // Delete all threads (replies) for this post
            DB::table('forum_threads')->where('post_id', $id)->delete();

            // Delete the post
            DB::table('forum_posts')->where('id', $id)->delete();

            DB::commit();

            return redirect()->route('forums.index');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Failed to delete post: ' . $e->getMessage()]);
        }
    }

    // Delete individual thread (reply)
    public function destroyThread($postId, $threadId)
    {
        $thread = DB::table('forum_threads')
            ->where('id', $threadId)
            ->where('post_id', $postId)
            ->where('user_id', Auth::id())
            ->first();

        if (!$thread) {
            return back()->withErrors(['error' => 'Reply not found or you do not have permission to delete it.']);
        }

        try {
            DB::table('forum_threads')->where('id', $threadId)->delete();
            return back();

        } catch (\Exception $e) {
            \Log::error('Thread deletion failed: ' . $e->getMessage());
            return back()->withErrors(['error' => 'Failed to delete reply: ' . $e->getMessage()]);
        }
    }

    // Update thread (reply)
    public function updateThread(Request $request, $postId, $threadId)
    {
        $thread = DB::table('forum_threads')
            ->where('id', $threadId)
            ->where('post_id', $postId)
            ->where('user_id', Auth::id())
            ->first();

        if (!$thread) {
            return back()->withErrors(['error' => 'Reply not found or you do not have permission to edit it.']);
        }

        $validated = $request->validate([
            'content' => 'required|string|min:10'
        ]);

        try {
            DB::table('forum_threads')
                ->where('id', $threadId)
                ->update([
                    'content' => $validated['content'],
                    'updated_at' => now()
                ]);

            return back();

        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to update reply: ' . $e->getMessage()]);
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
