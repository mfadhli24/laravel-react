<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    protected $fillable = ['parent_id', 'title', 'url', 'icon', 'order', 'is_active'];

    // Relasi ke anak (children) - Rekursif
    public function children()
    {
        return $this->hasMany(Menu::class, 'parent_id')->with('children')->orderBy('order', 'asc');
    }

    // Scope untuk mengambil menu utama (tanpa parent)
    public function scopeRoot($query)
    {
        return $query->whereNull('parent_id')->where('is_active', true)->orderBy('order', 'asc');
    }
}