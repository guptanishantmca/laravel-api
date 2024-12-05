<?php

if (!function_exists('getTranslations')) {
      function getTranslations(string $locale, array $namespaces): array
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
