<?php 
namespace App\Http\Controllers;

use App\Models\Category; 
use Illuminate\Http\Request;

class CategoryController extends Controller
{
 

    public function getCategories()
{
    $categories = Category::with(['translation']) // Load only the current locale's translation
        ->get();

    return response()->json($categories);
}
}
