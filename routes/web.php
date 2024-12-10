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

// Route::get('/users', function () {
//     return inertia('MyUsers');
// })->name('users');
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
 
Route::get('/localization', [LocalizationController::class, 'index'])->name('users');

Route::get('/users', [UserController::class, 'index'])->name('users');


Route::post('/users', function (Request $request) {
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
    ]);

    User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => bcrypt('password'), // Assign a default password
    ]);

    return redirect()->back();
});

Route::put('/users/{user}', function (Request $request, User $user) {
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email,' . $user->id,
    ]);

    $user->update($request->only(['name', 'email']));

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
