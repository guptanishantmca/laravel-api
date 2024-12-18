<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategoriesAndTranslationsTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Create categories table
        Schema::create('categories', function (Blueprint $table) {
            $table->id(); // Auto-increment primary key
            $table->foreignId('parent_id')->nullable()->constrained('categories')->nullOnDelete();
            $table->string('slug');
            $table->enum('type', ['Material', 'Work'])->default('Material');
            $table->timestamps(); // created_at and updated_at columns
        });

        // Create category_translations table
        Schema::create('category_translations', function (Blueprint $table) {
            $table->id(); // Auto-increment primary key
            $table->foreignId('category_id')->constrained('categories')->cascadeOnDelete();
            $table->string('locale', 10); // Language code, e.g., 'en', 'fi'
            $table->string('name'); // Localized category name
            $table->unique(['category_id', 'locale']); // Unique category-locale pair
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('category_translations');
        Schema::dropIfExists('categories');
    }
}
