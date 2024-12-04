<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\File;

class LocalizationController extends Controller
{
    public function index()
    {
        $locale = request()->get('locale', App::getLocale());
        $namespace = request()->get('namespace', 'dashboard'); // Default to 'common'

        $path = resource_path("lang/{$locale}/{$namespace}.json");

        if (!File::exists($path)) {
            return response()->json(['translations' => []]);
        }

        $translations = json_decode(File::get($path), true);

        return response()->json(['translations' => $translations]);
    }

    public function switch(Request $request)
    {
        $locale = $request->input('locale');

        // Validate the locale
        if (!in_array($locale, ['en', 'fi'])) {
            return response()->json(['error' => 'Invalid locale'], 400);
        }

        // Persist the locale in the session
        session(['locale' => $locale]);
        

        return response()->json(['message' => 'Language switched to ' . $locale]);
    }
}
