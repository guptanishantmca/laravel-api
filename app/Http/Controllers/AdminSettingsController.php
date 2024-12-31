<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class AdminSettingsController extends Controller
{
    public function index()
    {
        // Fetch current settings from the config file
        $settings = config('admin_settings');

        return inertia('Admin/Settings', [
            'settings' => $settings,
        ]);
    }

    public function update(Request $request)
    {
        // Validate incoming request
        $validated = $request->validate([
            'pagination' => 'required|integer|min:1|max:100',
            'date_format' => 'required|string',
            'language' => 'required|string',
        ]);

        // Build the new settings array
        $newSettings = [
            'pagination' => $validated['pagination'],
            'date_format' => $validated['date_format'],
            'language' => $validated['language'],
        ];

        // Update the config file
        $this->updateConfigFile('admin_settings', $newSettings);

        return redirect()->back()->with('success', 'Settings updated successfully!');
    }

    private function updateConfigFile($fileName, array $settings)
    {
        $filePath = config_path($fileName . '.php');

        // Generate the PHP code for the config file
        $content = "<?php\n\nreturn " . var_export($settings, true) . ";\n";

        // Save the new content to the config file
        File::put($filePath, $content);

        // Optionally clear the config cache
        \Artisan::call('config:clear');
    }
}
