<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;
    protected $table = "Notifications";
    protected $fillable = ['user_id','message'];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
