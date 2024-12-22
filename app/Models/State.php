<?php 
// App\Models\State.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class State extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'country_id'];

    // Define the relationship with the Material model
    public function materials()
    {
        return $this->hasMany(Material::class);
    }

    // Define the relationship with the Country model
    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function translation()
    {
        $locale = app()->getLocale();
        return $this->hasOne(StateTranslation::class)
            ->where('locale', $locale)
            ->orWhere('locale', config('app.fallback_locale')); // Fallback locale
    }

}
