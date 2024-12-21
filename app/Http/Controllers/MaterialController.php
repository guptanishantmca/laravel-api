<?php 
namespace App\Http\Controllers;

use App\Models\Material;
use App\Http\Requests\StoreMaterialRequest;
use App\Http\Requests\UpdateMaterialRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MaterialController extends Controller
{
    // List Materials
    public function index()
    {
        $materials = Material::with(['category', 'state', 'country'])
            ->paginate(10);

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
        Material::create($request->validated());

        return redirect()->route('materials.index')
            ->with('success', 'Material created successfully.');
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
