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
        $translations = $this->getTranslations($locale, ['dashboard', 'common']); // Specify required namespaces

        return Inertia::render('Dashboard', [
            'locale' => $locale,
            'translations' => $translations,
        ]);
    }

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
