<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\FileManager;
use App\Models\Folder;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class FileManagerController extends Controller
{
    public function index(Request $request)
    {
        $currentFolderId = $request->query('folder');
        $currentFolder = Folder::find($currentFolderId);
        $folders = Folder::where('parent_id', $currentFolderId)->where('created_by', auth()->id())->get();
        $files = FileManager::where('folder_id', $currentFolderId)->where('uploaded_by', auth()->id())->get();

        return Inertia::render('MyBusiness/FileManager/Index', [
            'folders' => $folders,
            'files' => $files,
            'currentFolder' => $currentFolder,
            'parentFolderId' => $currentFolder->parent_id ?? null,
        ]);
    }


    public function upload(Request $request)
    {
        $request->validate([
            'files.*' => 'required|file|mimes:jpg,png,jpeg,gif,pdf,docx',
            'folder_id' => 'nullable|integer|exists:folders,id',
        ]);

        $folderId = $request->input('folder_id');
            // Determine the folder path
            $folderPath = $folderId ? "folders/$folderId" : "files";

        foreach ($request->file('files') as $file) {


            // Store the file
            $path = $file->store($folderPath, 'public');
            FileManager::create([
                'name' => $file->getClientOriginalName(),
                'path' => $path,
                'type' => $file->getClientMimeType(),
                'folder_id' => $folderId,
                'uploaded_by' => auth()->id(),
            ]);
        }

        return back()->with('success', 'Files uploaded successfully!');
    }



   

    public function createFolder(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $parentId = $request->input('parent_id', null);
        $folderPath = $parentId ? "folders/$parentId" : "root";

        // Create the directory if it doesn't exist
        if (!Storage::disk('public')->exists($folderPath)) {
            Storage::disk('public')->makeDirectory($folderPath);
        }

        // Save the folder record in the database
        Folder::create([
            'name' => $request->input('name'),
            'parent_id' => $parentId,
            'created_by' => auth()->id(),
        ]);

        return redirect()->back()->with('success', 'Folder created successfully.');
    }


     

    public function deleteFolder($id)
    {
        $folder = Folder::findOrFail($id);

        // Debug: Log folder details
        \Log::info('Deleting folder: ' . $folder->id);

        // Delete all files in the folder
        foreach ($folder->files as $file) {
            // Debug: Log file details
            \Log::info('Deleting file: ' . $file->id);

            Storage::delete($file->path); // Delete physical file
            $file->delete(); // Delete database record
        }

        // Delete all subfolders recursively
        foreach ($folder->subfolders as $subfolder) {
            \Log::info('Deleting subfolder: ' . $subfolder->id);
            $this->deleteFolder($subfolder->id); // Recursive call
        }

        // Finally delete the folder
        \Log::info('Deleting folder record: ' . $folder->id);
        $folder->delete();
    }




    public function deleteFile($id)
    {
        $file = FileManager::findOrFail($id);
        Storage::delete($file->path);
        $file->delete();

        return back()->with('success', 'File deleted successfully.');
    }
}
