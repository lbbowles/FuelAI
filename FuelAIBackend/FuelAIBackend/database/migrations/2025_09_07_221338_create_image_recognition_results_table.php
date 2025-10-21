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
        Schema::create('image_recognition_results', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('image_url');
            $table->foreignId('detected_meal')->nullable()->constrained('meals')->nullOnDelete();
            $table->float('confidence_score')->nullable();
            $table->timestamp('detected_at')->nullable();
            $table->json('raw_data')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('image_recognition_results');
    }
};
