<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    { 
        $locale = App::getLocale();
        //dd($locale);
       // dd(session('locale'));
        $translations = $this->getTranslations($locale, ['dashboard',  'header','sidenav']); // Specify required namespaces

        return Inertia::render('Dashboard', [
            'locale' => $locale,
            'translations' => $translations,
            'currentNamespaces' => ['dashboard', 'header', 'sidenav'],
            
        ]);
    }
    // public function dashboard()
    // {
    //     return Inertia::render('Dashboard', [
    //         'locale' => app()->getLocale(),
    //         'languages' => [
    //             'en' => 'English',
    //             'fi' => 'Finnish',
    //         ],
    //     ]);
    // }
    private function getTranslations(string $locale, array $namespaces): array
    {
        $translations = [];

        foreach ($namespaces as $namespace) {
            $path = resource_path("lang/{$locale}/{$namespace}.json");
            if (File::exists($path)) {
                $translations[$namespace] = json_decode(File::get($path), true);
            }
        }

        return $translations;
    }
}
