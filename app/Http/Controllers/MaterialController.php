<?php 
namespace App\Http\Controllers;

use App\Models\Material;
use App\Http\Requests\StoreMaterialRequest;
use App\Http\Requests\UpdateMaterialRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;


class MaterialController extends Controller
{
    // List Materials
    public function index()
    {
        $pagination = config('admin_settings.pagination');
        $materials = Material::with(['category', 'state', 'country'])
            ->paginate($pagination);

        return Inertia::render('Marketplace/Materials/Index', [
            'materials' => $materials,
        ]);
    }

    // Show Create Form
    public function create()
    {
        return Inertia::render('Marketplace/Materials/Create');
    }

    // Store Material
    
    public function store(StoreMaterialRequest $request)
    {
        $validated = $request->validated();

        // Ensure the 'materials' directory exists
        $userDir = 'uploads/' . auth()->id() . '/materials';
        if (!Storage::exists($userDir)) {
            Storage::makeDirectory($userDir);
        }

        // Handle featured_image upload
        if ($request->hasFile('featured_image')) {
            $validated['featured_image'] = $request->file('featured_image')->store($userDir);
        }

        $userDir = 'uploads/' . auth()->id() . '/materials/slider_images';
        // Ensure the 'materials/slider' directory exists
        if (!Storage::exists($userDir)) {
            Storage::makeDirectory($userDir);
        }

        // Handle slider_images upload
        if ($request->hasFile('slider_images')) {
            $sliderImages = [];
            foreach ($request->file('slider_images') as $image) {
                $path = $image->store($userDir);
                $sliderImages[] = $path;
            }
            $validated['slider_images'] = json_encode($sliderImages);
        }

        // Assign user_id from the authenticated user
        $validated['user_id'] = Auth::id();
        $validated['category_type'] = 'Material';

        // Create the Material
        Material::create($validated);

        return response()->json(['message' => 'Material created successfully'], 201);
    }





    // Show Edit Form
    public function edit(Material $material)
    {
        return Inertia::render('Marketplace/Materials/Edit', [
            'material' => $material->load(['category', 'state', 'country']),
        ]);
    }

    // Update Material
    public function update(UpdateMaterialRequest $request, Material $material)
    { 
        $material->update($request->validated());

        return redirect()->route('materials.index')
            ->with('success', 'Material updated successfully.');
    }
}
