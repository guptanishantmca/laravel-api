<?php

namespace App\Http\Controllers;

use App\Models\Work;
use Illuminate\Http\Request;

class WorkController extends Controller
{
    // Display a listing of the works
    public function index()
    {
        $works = Work::all();
        return view('work.index', compact('works'));
    }

    // Show the form for creating a new work
    public function create()
    {
        return view('work.create');
    }

    // Store a newly created work in storage
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        Work::create($request->all());

        return redirect()->route('work.index')->with('success', 'Work created successfully.');
    }

    // Display the specified work
    public function show(Work $work)
    {
        return view('work.show', compact('work'));
    }

    // Show the form for editing the specified work
    public function edit(Work $work)
    {
        return view('work.edit', compact('work'));
    }

    // Update the specified work in storage
    public function update(Request $request, Work $work)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $work->update($request->all());

        return redirect()->route('work.index')->with('success', 'Work updated successfully.');
    }

    // Remove the specified work from storage
    public function destroy(Work $work)
    {
        $work->delete();

        return redirect()->route('work.index')->with('success', 'Work deleted successfully.');
    }
}

