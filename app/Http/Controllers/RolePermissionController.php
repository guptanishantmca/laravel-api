<?php 
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionController extends Controller
{
    public function getRolesAndPermissions()
    {
        $roles = Role::with('permissions')->get();
        $permissions = Permission::all();

        return response()->json([
            'roles' => $roles,
            'permissions' => $permissions,
        ]);
    }

    public function updateRolePermissions(Request $request, $roleId)
    {
        $role = Role::findById($roleId);

        if (!$role) {
            return response()->json(['message' => 'Role not found'], 404);
        }

        $permissions = $request->input('permissions', []);
        $role->syncPermissions($permissions);

        return response()->json(['message' => 'Permissions updated successfully']);
    }

    public function getGroupedPermissions()
    {
        $permissions = Permission::all()->groupBy('group')->map(function ($group) {
            return [
                'group_name' => $group->first()->name ?? 'Unnamed Group', // Use the name of the first record in the group
                'permissions' => $group->toArray() // Include all permissions in the group
            ];
        });

        $roles = Role::all();

        return response()->json([
            'permissions' => $permissions,
            'roles' => $roles,
        ]);
    }


    public function getRolePermissions($roleId)
    {
        // Find the role
        $role = Role::findOrFail($roleId);

        // Get the permissions assigned to this role
        $permissions = $role->permissions()->get();

        return response()->json([
            'permissions' => $permissions
        ]);
    }

}
