<?php 
namespace App\Http\Controllers;

use App\Models\Material;
use App\Http\Requests\StoreMaterialRequest;
use App\Http\Requests\UpdateMaterialRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

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

        // Assign user_id from the authenticated user
        $validated['user_id'] = Auth::id();
        $validated['category_type'] = 'Material';
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
