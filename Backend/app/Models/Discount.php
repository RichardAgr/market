<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discount extends Model
{
    use HasFactory;
    protected $fillable = ['name','description','type_discount','value','start_date','final_date','use_max','is_discount','is_coupon','code_coupon'];

    public function promotions()
    {
        return $this->hasMany(Promotion::class);
    }

    public function product()
    {
        return $this->belongsToMay(Product::class, promotions);
    }
}
