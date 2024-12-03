<?php
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;

return [
    // Other middlewares
    'SetLocale' => function ($request, $next) {
        $locale = Session::get('locale', config('app.locale'));
        App::setLocale($locale);
        return $next($request);
    },
];
