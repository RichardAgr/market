<?php

namespace App\Http\Controllers;

use App\Models\CorreoElectronico;
use App\Models\Notification;
use Illuminate\Http\Request;
use App\Mail\userMail;
use Illuminate\Support\Facades\Mail;
use App\models\Discount;
use App\models\Product;
use App\models\Promotion;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class EmailController extends Controller
{
    public function index($id)
    {
      $product = Discount::find($id);
      $dataObject = json_decode($product);
      $adminUsers = User::where('is_admin', 0)->get();

      foreach ($adminUsers as $user) {
          Mail::to($user->email)->send(new userMail($dataObject));
      }
      
    }
   
   
}