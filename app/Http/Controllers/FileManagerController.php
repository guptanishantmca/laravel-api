<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\File;
use App\Models\Folder;

class FileManagerController extends Controller
{
    public function index()
    {
        $folders = Folder::where('created_by', auth()->id())->get();
        $files = File::where('uploaded_by', auth()->id())->get();
        return view('filemanager.index', compact('folders', 'files'));
    }

    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file|max:2048', // 2MB max size
            'folder_id' => 'nullable|exists:folders,id',
        ]);

        $path = $request->file('file')->store('filemanager/' . auth()->id());
        File::create([
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
        $file = File::findOrFail($id);
        Storage::delete($file->path);
        $file->delete();

        return back()->with('success', 'File deleted successfully.');
    }
}
