<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // $admin = Permission::create(['name' => 'Dashboard','group'=>0]);
        // $admin = Permission::create(['name' => 'Users','group'=>1]);
        // $admin = Permission::create(['name' => 'Add Users','group'=>1]);
        // $admin = Permission::create(['name' => 'Edit Users','group'=>1]);
        // $admin = Permission::create(['name' => 'Delete Users','group'=>1]);
        // $admin = Permission::create(['name' => 'Settings','group'=>2]);
        // $admin = Permission::create(['name' => 'Permissions','group'=>2]);

        $permissions = Permission::all();
        $superAdminRole = Role::firstOrCreate(['name' => 'super admin']);

        // Assign all permissions to the super admin role
        $superAdminRole->syncPermissions($permissions);
    }
    
}
