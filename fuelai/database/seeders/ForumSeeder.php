<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\ForumPost;
use App\Models\ForumThread;

class ForumSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();

        if ($users->isEmpty()) {
            return;
        }

        $categoryId = DB::table('categories')->where('name', 'General')->value('id');

        if (!$categoryId) {
            $categoryId = DB::table('categories')->insertGetId([
                'name' => 'General',
                'description' => 'General discussion about workouts, meal plans, and FuelAI.',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        ForumThread::truncate();
        ForumPost::truncate();

        $topics = [
            [
                'title' => 'Best workout split to pair with a high-protein FuelAI meal plan?',
                'content' => 'FuelAI gave me a high-protein 7–day meal plan. For those of you lifting 3–4x per week, what workout split are you using to match your calories and protein?',
                'replies' => [
                    'I do an upper/lower split 4x per week and let FuelAI handle the protein. I just select “muscle gain”.',
                    'Push/pull/legs 3x a week works well for me. I tell FuelAI I train “moderate to intense” and it bumps my carbs on leg day.',
                    'I use full-body workouts 3x/week and keep the same FuelAI meal plan. I only adjust my pre-workout snack manually.',
                ],
            ],
            [
                'title' => 'Meal plan suggestions for morning workouts?',
                'content' => 'I always go to the gym at 6 AM. Any tips on which FuelAI settings or meals work best for early morning workouts?',
                'replies' => [
                    'I set my first meal as “light breakfast” and FuelAI usually gives me toast + eggs or yogurt + fruit.',
                    'Try increasing your carbs for the first meal in the preferences. Oats or toast from FuelAI helps a lot for me.',
                    'I do coffee + banana before the gym, then a bigger FuelAI breakfast right after lifting.',
                ],
            ],
            [
                'title' => 'Cutting phase with FuelAI: macros for fat loss?',
                'content' => 'Has anyone used FuelAI during a cut? What macro ratios did you choose and how aggressive was your calorie deficit?',
                'replies' => [
                    'I chose the “fat loss” goal and “slow and steady”. FuelAI kept me around a 300–400 kcal deficit with high protein.',
                    'High protein, moderate carbs, low fat worked best. FuelAI did all the math; I just watched my weekly check-ins.',
                    'Don’t go too aggressive. When I set a big deficit my strength dropped; smaller deficit with FuelAI felt better.',
                ],
            ],
            [
                'title' => 'Bulk-friendly recipes FuelAI generated for leg day',
                'content' => 'I selected muscle gain and high-carb in FuelAI, and it gave me some really carb-heavy meals on leg day. Anyone else getting good bulk recipes?',
                'replies' => [
                    'My leg day dinner was chicken, rice, and veggies plus an extra overnight oats snack from FuelAI.',
                    'FuelAI keeps giving me pasta + lean meatballs on heavy days and I’m not mad about it.',
                    'I like that it adds an extra snack around my workout when I pick “intense training” in the activity settings.',
                ],
            ],
            [
                'title' => 'How do you log custom workouts alongside FuelAI plans?',
                'content' => 'I use my own lifting program but FuelAI for food. How are you combining custom workouts with the meal planner?',
                'replies' => [
                    'I just set my activity level to “active” and let FuelAI handle meals; I don’t micromanage per workout.',
                    'I log my lifts in tasks and keep FuelAI’s meal plan fixed unless my weight stalls.',
                    'It would be awesome if FuelAI synced workouts and auto-adjusted calories based on sets/reps.',
                ],
            ],
        ];

        foreach ($topics as $topic) {
            $author = $users->random();

            $post = ForumPost::create([
                'category_id' => $categoryId,
                'user_id'     => $author->id,
                'title'       => $topic['title'],
                'content'     => $topic['content'],
            ]);

            foreach ($topic['replies'] as $replyContent) {
                $replyUser = $users->random();

                ForumThread::create([
                    'post_id' => $post->id,
                    'user_id' => $replyUser->id,
                    'content' => $replyContent,
                ]);
            }
        }
    }
}
