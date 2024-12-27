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
        $folders = Folder::where('parent_id', $currentFolderId)->get();
        $files = FileManager::where('folder_id', $currentFolderId)->get();

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
            'file' => 'required|file|max:2048', // 2MB max size
            'folder_id' => 'nullable|exists:folders,id',
        ]);

        $path = $request->file('file')->store('filemanager/' . auth()->id());
        FileManager::create([
            'name' => $request->file->getClientOriginalName(),
            'path' => $path,
            'type' => $request->file->getMimeType(),
            'folder_id' => $request->folder_id,
            'uploaded_by' => auth()->id(),
        ]);

        return back()->with('success', 'File uploaded successfully.');
    }

    public function createFolder(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:folders,id',
        ]);

        Folder::create([
            'name' => $request->name,
            'parent_id' => $request->parent_id,
            'created_by' => auth()->id(),
        ]);

        return back()->with('success', 'Folder created successfully.');
    }

    public function deleteFolder($id)
    {
        $folder = Folder::findOrFail($id);
        $folder->delete();

        return back()->with('success', 'Folder deleted successfully.');
    }

    public function deleteFile($id)
    {
        $file = FileManager::findOrFail($id);
        Storage::delete($file->path);
        $file->delete();

        return back()->with('success', 'File deleted successfully.');
    }
}
