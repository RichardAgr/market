<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $table = 'categories';
    protected $hidden = [
        
    ];
    protected $fillable = ['name', 'detail', 'icon', 'category_parent_id','created_at',
    'updated_at'];
    public $timestamps = true;
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
