<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    public function run()
    {
        // Define categories
        $categories = [
            [
                'id' => 1,
                'parent_id' => null,
                'type' => 'Material',
                'created_at' => '2020-05-18 07:45:45',
                'updated_at' => '2020-05-18 07:45:45',
            ],
            [
                'id' => 2,
                'parent_id' => null,
                'type' => 'Material',
                'created_at' => '2020-05-18 07:46:01',
                'updated_at' => '2020-05-18 07:46:12',
            ],
            [
                'id' => 3,
                'parent_id' => null,
                'type' => 'Material',
                'created_at' => '2020-05-18 07:46:01',
                'updated_at' => '2020-05-18 07:46:12',
            ],
            [
                'id' => 7,
                'parent_id' => null,
                'type' => 'Material',
                'created_at' => '2020-05-18 07:46:01',
                'updated_at' => '2020-05-18 07:46:12',
            ],
            [
                'id' => 8,
                'parent_id' => null,
                'type' => 'Material',
                'created_at' => '2020-05-18 07:46:01',
                'updated_at' => '2020-05-18 07:46:12',
            ],
            [
                'id' => 9,
                'parent_id' => null,
                'type' => 'Material',
                'created_at' => '2020-05-18 07:46:01',
                'updated_at' => '2020-05-18 07:46:12',
            ],
            [
                'id' => 10,
                'parent_id' => null,
                'type' => 'Material',
                'created_at' => '2020-05-18 07:46:01',
                'updated_at' => '2020-05-18 07:46:12',
            ],
            [
                'id' => 11,
                'parent_id' => null,
                'type' => 'Material',
                'created_at' => '2020-05-18 07:46:01',
                'updated_at' => '2020-05-18 07:46:12',
            ],
            [
                'id' => 12,
                'parent_id' => null,
                'type' => 'Material',
                'created_at' => '2020-05-18 07:46:01',
                'updated_at' => '2020-05-18 07:46:12',
            ],
            [
                'id' => 13,
                'parent_id' => null,
                'type' => 'Material',
                'created_at' => '2020-05-18 07:46:01',
                'updated_at' => '2020-05-18 07:46:12',
            ],
            [
                'id' => 15,
                'parent_id' => null,
                'type' => 'Material',
                'created_at' => '2020-05-18 07:46:01',
                'updated_at' => '2020-05-18 07:46:12',
            ],
            [
                'id' => 16,
                'parent_id' => null,
                'type' => 'Material',
                'created_at' => '2020-05-18 07:46:01',
                'updated_at' => '2020-05-18 07:46:12',
            ],
            [
                'id' => 17,
                'parent_id' => null,
                'type' => 'Work',
                
            ],
            // Add more categories here
        ];

        // Insert categories
        DB::table('categories')->insert($categories);

        // Define translations
        $translations = [
            [
                'category_id' => 1,
                'locale' => 'en',
                'name' => 'Kitchen',
            ],
            [
                'category_id' => 1,
                'locale' => 'fi',
                'name' => 'Keittiö',
            ],
            [
                'category_id' => 2,
                'locale' => 'en',
                'name' => 'Bathroom',
            ],
            [
                'category_id' => 2,
                'locale' => 'fi',
                'name' => 'Kylpyhuone',
            ],
            [
                'category_id' => 3,
                'locale' => 'en',
                'name' => 'WC',
            ],
            [
                'category_id' => 3,
                'locale' => 'fi',
                'name' => 'WC',
            ],
            [
                'category_id' => 7,
                'locale' => 'en',
                'name' => 'Furniture',
            ],
            [
                'category_id' => 7,
                'locale' => 'fi',
                'name' => 'Kalusteet',
            ],
            // Add more translations here
        ];

        // Insert translations
        DB::table('category_translations')->insert($translations);
    }
}
