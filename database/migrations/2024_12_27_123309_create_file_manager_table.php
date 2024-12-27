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
        Schema::create('folders', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Folder name
            $table->unsignedBigInteger('parent_id')->nullable(); // Parent folder ID (for nested folders)
            $table->unsignedBigInteger('created_by'); // User ID
            $table->foreign('parent_id')->references('id')->on('folders')->onDelete('cascade');
            $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
        Schema::create('file_manager', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // File name
            $table->string('path'); // File path
            $table->string('type'); // MIME type (e.g., image/jpeg)
            $table->unsignedBigInteger('folder_id')->nullable(); // Folder ID (nullable for root-level files)
            $table->unsignedBigInteger('uploaded_by'); // User ID
            $table->foreign('folder_id')->references('id')->on('folders')->onDelete('cascade');
            $table->foreign('uploaded_by')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });

        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('file_manager');
        Schema::dropIfExists('folders');
    }
};
