<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\App;
use App\Models\User;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\RolePermissionController;

class UserController extends Controller
{
    public function index()
    {
        $locale = App::getLocale();
        $users = User::with('roles')->paginate(10);
        
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
}
