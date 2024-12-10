<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = Role::create(['name' => 'super admin']);
        $admin = Role::create(['name' => 'admin']);
        $admin = Role::create(['name' => 'company']);
        $admin = Role::create(['name' => 'individual']);
        $admin = Role::create(['name' => 'consumer']);
        $admin = Role::create(['name' => 'resource']);
        $admin = Role::create(['name' => 'client']);
    }
}
