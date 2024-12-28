<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Folder extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'parent_id',
        'created_by',
    ];

    /**
     * Relationship: Subfolders of this folder
     */
    public function subfolders()
    {
        return $this->hasMany(Folder::class, 'parent_id');
    }

    /**
     * Relationship: Files within this folder
     */
    public function files()
    {
        return $this->hasMany(Filemanager::class);
    }
}
