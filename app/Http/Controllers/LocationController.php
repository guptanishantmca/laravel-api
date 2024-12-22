<?php 
namespace App\Http\Controllers;

use App\Models\Country;
use App\Models\State;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function getCountries()
    {
        return response()->json(Country::all());
    }

    public function getStates($countryId)
{
    $states = State::where('country_id', $countryId)
        ->with(['translation']) // Load only the current locale's translation
        ->get();

    return response()->json($states);
}
}
