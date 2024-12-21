<?php 
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMaterialRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'user_id' => ['required', 'exists:users,id'],
            'type' => ['required', 'in:Request,Offer'],
            'title' => ['required', 'string', 'max:200'],
            'category_id' => ['nullable', 'exists:categories,id'],
            'description' => ['nullable', 'string'],
            'quantity' => ['nullable', 'numeric'],
            'cost_per_unit' => ['nullable', 'numeric'],
            'unit' => ['nullable', 'in:Kg,M2,Liter,Pcs,Other,Per package,Total cost'],
            'budget_type' => ['nullable', 'in:Fixed,Hourly,per_m2'],
            'rate' => ['nullable', 'numeric'],
            'available_from' => ['nullable', 'date'],
            'available_to' => ['nullable', 'date'],
            'city' => ['nullable', 'string', 'max:50'],
            'state_id' => ['required', 'exists:states,id'],
            'country_id' => ['required', 'exists:countries,id'],
            'pincode' => ['nullable', 'string', 'max:10'],
            'warranty' => ['nullable', 'integer'],
            'warranty_type' => ['nullable', 'in:Days,Week,Month,Year'],
            'delivery_type_cost' => ['nullable', 'string'],
            'delivery_type' => ['nullable', 'string', 'max:50'],
            'expiry_date' => ['nullable', 'date'],
        ];
    }
}
