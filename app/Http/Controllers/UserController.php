<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\App;
use App\Models\User;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\RolePermissionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index()
    {
        $locale = App::getLocale();
        $pagination = config('admin_settings.pagination');
        $users = User::with('roles')->paginate($pagination);
        
                $roles = Role::pluck('name');
        
                return Inertia::render('MyUsers', [
                    'users' => $users,
                    'roles' => $roles,
                ]);
        // $users = User::select('id', 'name', 'email', 'created_at')->paginate(10);
        // $translations = getTranslations($locale, ['users', 'header','sidenav']); // Specify required namespaces
        // logger()->info('Translations', $translations);
        // return Inertia::render('MyUsers', [
        //     'users' => $users,
        //     'locale' => $locale,
        //     'translations' => $translations,
        //     'currentNamespaces' => ['users', 'header', 'sidenav'],
        // ]);
    }

    public function store(Request $request)
    { 
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'role' => 'required|string|exists:roles,name', // Ensure the role exists
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt('password'), // Default password, can be customized
            'created_by' => auth()->id(), // Set created_by field
        ]);

        $user->assignRole($validated['role']); // Assign role to the user

        return redirect()->back()->with('success', 'User created successfully!');
    }

    public function update(Request $request, User $user)
    {
        if ($user->created_by !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'role' => 'required|string|exists:roles,name',
        ]);

        $user->update($request->only(['name', 'email']));
        $user->syncRoles([$validated['role']]); // Update user role

        return redirect()->back()->with('success', 'User updated successfully!');
    }

    // Delete a user
    public function destroy(User $user)
    {
        // Ensure the logged-in user can delete this user (e.g., only delete users they created)
        if ($user->created_by !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $user->delete();

        return redirect()->back()->with('success', 'User deleted successfully!');
    }
}
