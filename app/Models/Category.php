<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'parent_id', 
        'type'
    ];

    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }
    public function translation()
    {
        $locale = app()->getLocale();
        return $this->hasOne(CategoryTranslation::class)
            ->where('locale', $locale)
            ->orWhere('locale', config('app.fallback_locale')); // Fallback locale
    }
}
