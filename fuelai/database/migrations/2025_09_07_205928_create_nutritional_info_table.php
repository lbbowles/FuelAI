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
        Schema::create('nutritional_info', function (Blueprint $table) {
            $table->id();
            $table->foreignId('meal_id')->constrained('meals')->cascadeOnDelete();
            $table->float('calories')->nullable();
            $table->float('protein')->nullable();
            $table->float('carbs')->nullable();
            $table->float('fat')->nullable();
            $table->float('fiber')->nullable();
            $table->float('sugar')->nullable();
            $table->float('sodium')->nullable();
            $table->text('other_nutrients')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nutritional_info');
    }
};
