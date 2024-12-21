<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    use HasFactory;
    protected $table = 'tenders';
    protected $fillable = [
        'user_id',
        'category_type',
        'type',
        'title',
        'category_id',
        'description',
        'quantity',
        'cost_per_unit',
        'unit',
        'budget_type',
        'rate',
        'available_from',
        'available_to',
        'city',
        'state_id',
        'country_id',
        'pincode',
        'warranty',
        'warranty_type',
        'delivery_type_cost',
        'delivery_type',
        'expiry_date',
        'attachment',
        'featured_image',
        'slider_images',
        'status',
        'extra',
        'source',
    ];

    // Define any relationships (e.g., user, category, state)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function state()
    {
        return $this->belongsTo(State::class);
    }

    public function country()
    {
        return $this->belongsTo(Country::class);
    }
}
