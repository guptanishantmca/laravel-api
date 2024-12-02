<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\File;

class LocalizationController extends Controller
{
    public function index()
    {
        $locale = request()->get('locale', App::getLocale());
        $namespace = request()->get('namespace', 'frontend'); // Default to 'common'

        $path = resource_path("lang/{$locale}/{$namespace}.json");

        if (!File::exists($path)) {
            return response()->json(['translations' => []]);
        }

        $translations = json_decode(File::get($path), true);

        return response()->json(['translations' => $translations]);
    }
}
