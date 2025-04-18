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
use App\Http\Controllers\MaterialController; 
use App\Http\Controllers\LocationController; 
use App\Http\Controllers\CategoryController; 
use App\Http\Controllers\FileManagerController; 
use App\Http\Controllers\AdminSettingsController;

Route::middleware(['auth', 'role:super admin'])->group(function () {
    Route::get('/admin/settings', [AdminSettingsController::class, 'index'])->name('admin.settings');
    Route::post('/admin/settings', [AdminSettingsController::class, 'update']);
});

Route::get('/countries', [LocationController::class, 'getCountries']);
Route::get('/states/{country_id}', [LocationController::class, 'getStates']);
Route::get('/categories', [CategoryController::class, 'getCategories']);

Route::prefix('mybusniess/filemanager')->middleware(['auth'])->group(function () {
    Route::get('/', [FileManagerController::class, 'index'])->name('filemanager.index');
    Route::get('/get_files', [FileManagerController::class, 'get_files'])->name('filemanager.get_files');
    
    Route::post('/folder', [FileManagerController::class, 'createFolder']);
    Route::delete('/folder/{id}', [FileManagerController::class, 'deleteFolder']);
    Route::post('/upload', [FileManagerController::class, 'upload']);
    Route::post('/upload_file', [FileManagerController::class, 'uploadFile']);
    Route::delete('/file/{id}', [FileManagerController::class, 'deleteFile']);
});



Route::middleware(['auth'])->prefix('marketplace/materials')->name('materials.')->group(function () {
    Route::get('/', [MaterialController::class, 'index'])->name('index');
    Route::get('/create', [MaterialController::class, 'create'])->name('create');
    Route::post('/store', [MaterialController::class, 'store'])->name('store');
    Route::get('/{material}/edit', [MaterialController::class, 'edit'])->name('edit');
    Route::put('/update/{material}', [MaterialController::class, 'update'])->name('update');
    
    Route::delete('/{id}', [MaterialController::class, 'destroy'])->name('materials.destroy');
});

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



        Route::middleware(['auth'])->group(function () {
            Route::get('/users', [UserController::class, 'index'])->name('users');
            
        });


    // Route::get('/users', function () {
    //     $users = User::with('roles')->get()->map(function ($user) {
    //         return [
    //             'id' => $user->id,
    //             'name' => $user->name,
    //             'email' => $user->email,
    //             'role' => $user->roles->pluck('name')->first(), // Assuming a single role per user
    //             'created_at' => $user->created_at,
    //         ];
    //     });

    //     $roles = Role::pluck('name');

    //     return Inertia::render('MyUsers', [
    //         'users' => $users,
    //         'roles' => $roles,
    //     ]);
    // })->name('users');
});
Route::middleware([SetLocale::class])->group(function () {
    Route::get('/', function () {
        return view('welcome');
    });

    // Add your other routes here...
    

// Route::post('/switch-language', function (Request $request) {
//     $locale = $request->input('locale');

//     if (!in_array($locale, ['en', 'fi'])) {
//         abort(400, 'Invalid locale');
//     }

//     // Optionally, persist the locale in the session or a cookie
//     session(['locale' => $locale]);


//     // Set locale for the current request
//     \App::setLocale($locale);

    
//     return response()->json(['message' => 'Language switched to ' . $locale]);
// });

});
Route::middleware(['web'])->group(function () {
    Route::post('/switch-language', [LocalizationController::class, 'switchLanguage'])->name('switch-language');
});


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

Route::middleware(['auth'])->group(function () {
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    Route::put('/users/{user}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
});
// Route::post('/users', function (Request $request) {
//     $request->validate([
//         'name' => 'required|string|max:255',
//         'email' => 'required|email|unique:users,email',
//         'role' => 'required|string|exists:roles,name', // Ensure the role exists
//     ]);

//     $user = User::create([
//         'name' => $request->name,
//         'email' => $request->email,
//         'password' => bcrypt('password'),
//     ]);

//     $user->assignRole($request->role); // Assign role to the user

//     return redirect()->back();
// });

// Route::put('/users/{user}', function (Request $request, User $user) {
//     $request->validate([
//         'name' => 'required|string|max:255',
//         'email' => 'required|email|unique:users,email,' . $user->id,
//         'role' => 'required|string|exists:roles,name',
//     ]);

//     $user->update($request->only(['name', 'email']));
//     $user->syncRoles([$request->role]); // Update user role

//     return redirect()->back();
// });


// Route::delete('/users/{user}', function (User $user) {
//     $user->delete();

//     return redirect()->back();
// });

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
