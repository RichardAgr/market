<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_code',
        'name',
        'total',
        'user_id',
        'product_amount',
        'payment_status'
    ];
    public $timestamps = true;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function selectionDetails(){
        return $this->hasMany(SelectionDetail::class);
    }
}
