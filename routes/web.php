<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LocalizationController;

// Route::get('/users', function () {
//     return inertia('MyUsers');
// })->name('users');
Route::middleware([SetLocale::class])->group(function () {
    Route::get('/', function () {
        return view('welcome');
    });

    // Add your other routes here...
    Route::post('/switch-language', function (Illuminate\Http\Request $request) {
        $locale = $request->input('locale', config('app.locale'));
        session(['locale' => $locale]);
        return response()->json(['success' => true]);
    });
});

Route::get('/localization', function () {
    $locale = App::getLocale();
    
    $path = resource_path("lang/{$locale}.json");

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
