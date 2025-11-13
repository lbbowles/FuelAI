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
        Schema::table('users', function (Blueprint $table) {
            $table->longText('image_data')->nullable()->after('email');
        $table->string('mime_type')->nullable()->after('image_data');
         $table->dropColumn('profile_image_url');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['image_data', 'mime_type']);
            $table->string('profile_image_url')->nullable();
        });
    }
};
