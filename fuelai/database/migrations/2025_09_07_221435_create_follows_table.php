<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('follows', function (Blueprint $table) {
            $table->foreignId('following_user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('followed_user_id')->constrained('users')->cascadeOnDelete();

            // This single line creates both `created_at` and `updated_at` columns.
            $table->timestamps();

            $table->primary(['following_user_id', 'followed_user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('follows');
    }
};
