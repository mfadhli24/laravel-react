<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;
    
    protected $fillable = ['parent_id', 'title', 'url', 'icon', 'order', 'is_active'];

    // Relasi ke Sub-menu (Children)
    public function children()
    {
        return $this->hasMany(Menu::class, 'parent_id')->orderBy('order', 'asc');
    }

    // Relasi balik ke Menu Induk (Parent)
    public function parent()
    {
        return $this->belongsTo(Menu::class, 'parent_id');
    }
}