<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = 'products';
    protected $fillable = ['name', 'code', 'description', 'price', 'stock', 'brand', 'provider', 'image', 'category_id', 'updated_at', 'created_at'];

    public function inventories()
    {
        return $this->hasMany(Inventary::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function promotions()
    {
        return $this->hasMany(Promotion::class);
    }

    public function selectionDetails(){
        return $this->hasMany(SelectionDetail::class);
    }

    public function discount()
    {
        return $this->belongsToMay(Discount::class, promotions);
    }
}
