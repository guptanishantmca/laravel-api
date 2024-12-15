<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
 
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LocalizationController;
use App\Http\Middleware\SetLocale;
use Illuminate\Support\Facades\App;
use Illuminate\Http\Request;
use App\Models\User;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\RolePermissionController;

Route::group(['middleware' => ['role_or_permission:Settings|Permissions']], function () {
     
    Route::get('/roles/manage', function () {
        return Inertia::render('RolePermissionManager');
    })->middleware(['auth'])->name("roles.manage");

});


Route::middleware('role_or_permission:Users')->group(function () {
    
    Route::get('/roles-and-permissions', [RolePermissionController::class, 'getRolesAndPermissions'])
        ->name('roles.permissions')
        ->middleware(['auth']);

        Route::get('/roles/grouped-permissions', [RolePermissionController::class, 'getGroupedPermissions'])
        ->name('roles.grouped-permissions')
        ->middleware(['auth']);
        Route::get('/roles/{roleId}/permissions', [RolePermissionController::class, 'getRolePermissions']);

    // Route to update role permissions
    Route::post('/roles/{role}/permissions', [RolePermissionController::class, 'updateRolePermissions'])
        ->name('roles.permissions.update')
        ->middleware(['auth']);

    Route::get('/users', function () {
        $users = User::with('roles')->get()->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->roles->pluck('name')->first(), // Assuming a single role per user
                'created_at' => $user->created_at,
            ];
        });

        $roles = Role::pluck('name');

        return Inertia::render('MyUsers', [
            'users' => $users,
            'roles' => $roles,
        ]);
    })->name('users');
});
Route::middleware([SetLocale::class])->group(function () {
    Route::get('/', function () {
        return view('welcome');
    });

    // Add your other routes here...
    

Route::post('/switch-language', function (Request $request) {
    $locale = $request->input('locale');

    if (!in_array($locale, ['en', 'fi'])) {
        abort(400, 'Invalid locale');
    }

    // Set locale for the current request
    \App::setLocale($locale);

    // Optionally, persist the locale in the session or a cookie
    session(['locale' => $locale]);

    return response()->json(['message' => 'Language switched to ' . $locale]);
});

});
//Route::post('/switch-language', [LocalizationController::class, 'switch']);


Route::get('/localization/{locale}/{namespace}', function ($locale, $namespace) {
    $locale = App::getLocale();
    
    $path = resource_path("lang/{$locale}/{$namespace}.json");

    if (!file_exists($path)) {
        abort(404, 'Localization file not found');
    }

    return response()->json([
        'locale' => $locale,
        'translations' => json_decode(file_get_contents($path), true),
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');
 
//Route::get('/localization', [LocalizationController::class, 'index'])->name('users');

//Route::get('/users', [UserController::class, 'index'])->name('users');


Route::post('/users', function (Request $request) {
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'role' => 'required|string|exists:roles,name', // Ensure the role exists
    ]);

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => bcrypt('password'),
    ]);

    $user->assignRole($request->role); // Assign role to the user

    return redirect()->back();
});

Route::put('/users/{user}', function (Request $request, User $user) {
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email,' . $user->id,
        'role' => 'required|string|exists:roles,name',
    ]);

    $user->update($request->only(['name', 'email']));
    $user->syncRoles([$request->role]); // Update user role

    return redirect()->back();
});


Route::delete('/users/{user}', function (User $user) {
    $user->delete();

    return redirect()->back();
});

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

 

require __DIR__.'/auth.php';
