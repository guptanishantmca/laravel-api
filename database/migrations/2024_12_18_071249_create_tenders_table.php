<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTendersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Create tenders table
        Schema::create('tenders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id'); // Owner of the tender
            $table->enum('category_type', ['Material', 'Work'])->nullable(); // Type of tender
            $table->enum('type', ['Request', 'Offer'])->nullable(); // Request or offer
            $table->string('title', 200)->nullable(); // Tender title
            $table->unsignedBigInteger('category_id')->nullable(); // Reference to categories table
            $table->mediumText('description')->nullable(); // Detailed description
            $table->decimal('quantity', 10, 2)->nullable(); // Quantity if applicable
            $table->decimal('cost_per_unit', 10, 2)->nullable(); // Cost per unit
            $table->enum('unit', ['Kg', 'M2', 'Liter', 'Pcs', 'Other', 'Per package', 'Total cost'])->nullable(); // Units
            $table->enum('budget_type', ['Fixed', 'Hourly', 'per_m2'])->nullable(); // Budget type
            $table->decimal('rate', 10, 2)->nullable(); // Rate per unit/hour/m2
            $table->date('available_from')->nullable(); // Start date
            $table->date('available_to')->nullable(); // End date
            $table->string('city', 50)->nullable(); // City
            $table->unsignedBigInteger('state_id'); // Reference to states table
            $table->unsignedBigInteger('country_id')->default(72); // Reference to countries table
            $table->string('pincode', 10)->nullable(); // Postal code
            $table->unsignedInteger('warranty')->nullable(); // Warranty period
            $table->enum('warranty_type', ['Days', 'Week', 'Month', 'Year'])->nullable(); // Warranty type
            $table->text('delivery_type_cost')->nullable(); // Delivery type and cost
            $table->string('delivery_type', 50)->nullable(); // Delivery type
            $table->timestamp('expiry_date')->nullable(); // Expiry date
            $table->string('attachment', 255)->nullable(); // File attachments
            $table->string('featured_image', 100)->nullable(); // Featured image
            $table->text('slider_images')->nullable(); // Slider images
            $table->unsignedTinyInteger('status')->default(1)->comment('0->Default, 1->Active, 2->Inactive, 3->Complete, 4->Pending, 5->Cancelled, 6->Ongoing, 7->Expired, 8->Accepted'); // Status field
            $table->unsignedTinyInteger('extra')->default(0)->comment('0->Default, 1->Material, 2->Work');
            $table->unsignedTinyInteger('source')->default(0)->comment('0 -> APP, 1 -> Website'); // Source of creation
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
            $table->foreign('category_id')->references('id')->on('categories')->nullOnDelete();
            $table->foreign('state_id')->references('id')->on('states')->cascadeOnDelete();
            $table->foreign('country_id')->references('id')->on('countries')->cascadeOnDelete();
        });

        // Create tender_statuses table for managing statuses
        Schema::create('tender_statuses', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Status name
            $table->string('description')->nullable(); // Optional description of status
            $table->timestamps();
        });

        // Seed the statuses
        DB::table('tender_statuses')->insert([
            ['name' => 'Default', 'description' => 'Default status'],
            ['name' => 'Active', 'description' => 'Active tender'],
            ['name' => 'Inactive', 'description' => 'Inactive tender'],
            ['name' => 'Complete', 'description' => 'Tender completed'],
            ['name' => 'Pending', 'description' => 'Pending approval'],
            ['name' => 'Cancelled', 'description' => 'Tender cancelled'],
            ['name' => 'Ongoing', 'description' => 'Ongoing work'],
            ['name' => 'Expired', 'description' => 'Tender expired'],
            ['name' => 'Accepted', 'description' => 'Tender accepted'],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tender_statuses');
        Schema::dropIfExists('tenders');
    }
}
