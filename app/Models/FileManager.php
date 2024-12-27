<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FileManager extends Model
{
    use HasFactory;
    protected $table = 'file_manager';
    protected $fillable = [
        'name',
        'path',
        'type',
        'folder_id',
    ];

    public function folder()
    {
        return $this->belongsTo(Folder::class);
    }
}
