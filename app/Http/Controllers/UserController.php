<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\App;
use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $locale = App::getLocale();
        $users = User::select('id', 'name', 'email', 'created_at')->get();
        $translations = getTranslations($locale, ['users', 'header','sidenav']); // Specify required namespaces
        logger()->info('Translations', $translations);
        return Inertia::render('MyUsers', [
            'users' => $users,
            'locale' => $locale,
            'translations' => $translations,
            'currentNamespaces' => ['users', 'header', 'sidenav'],
        ]);
    }
}
