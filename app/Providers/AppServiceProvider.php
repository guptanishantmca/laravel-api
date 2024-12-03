<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share('locale', function () {
            return app()->getLocale(); // The current locale
        });
       
        Inertia::share('translations', function () {
            $locale = app()->getLocale();
            $path = resource_path("lang/{$locale}.json");

            if (file_exists($path)) {
                return json_decode(file_get_contents($path), true);
            }

            return [];
        });
    }
}
