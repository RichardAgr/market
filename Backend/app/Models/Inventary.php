<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventary extends Model
{

    use HasFactory;

    protected $table = 'inventories';
    protected $fillable = ['buying_price', 'buying_date', 'buying_amount', 'product_id','updated_at', 'created_at'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
