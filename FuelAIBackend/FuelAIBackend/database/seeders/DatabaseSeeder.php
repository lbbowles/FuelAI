<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'username' => 'Test User',
            'email' => 'test@example.com',
            'password_hash' => Hash::make('password'),
            'role' => 'user',
        ]);
    }
}
