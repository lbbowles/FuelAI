<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'test@example.com'],
            ['username' => 'Test User',
                'password_hash' => Hash::make('password'),
                'role' => 'admin',
                'profile_image_url' => null,
            ]
        );

        $this->call([
            ForumSeeder::class,
        ]);
    }
}
