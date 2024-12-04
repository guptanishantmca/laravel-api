<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class ExportTranslations extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'translations:export';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Export Laravel language files to JSON format for React';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Define the languages you want to export
        $languages = ['en', 'fi']; // Add more languages if needed

        // Define the output directory for the React app
        $outputPath = resource_path('../resources/js/assets/locales'); // Adjust the path to your React app

        foreach ($languages as $language) {
            $this->exportLanguage($language, $outputPath);
        }

        $this->info('Translations exported successfully.');
    }

    /**
     * Export a specific language to JSON files.
     */
    private function exportLanguage(string $language, string $outputPath)
    {
        $langPath = resource_path("lang/{$language}");
        $outputLangPath = "{$outputPath}/{$language}";

        if (!File::exists($langPath)) {
            $this->warn("Language folder not found: {$langPath}");
            return;
        }

        // Ensure the output directory exists
        if (!File::exists($outputLangPath)) {
            File::makeDirectory($outputLangPath, 0755, true);
        }

        foreach (File::allFiles($langPath) as $file) {
            $namespace = $file->getFilenameWithoutExtension();
            $translations = json_decode(File::get($file), true);

            if ($translations) {
                File::put(
                    "{$outputLangPath}/{$namespace}.json",
                    json_encode($translations, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
                );
                $this->info("Exported: {$language}/{$namespace}.json");
            } else {
                $this->warn("Failed to export: {$language}/{$namespace}");
            }
        }
    }
}
