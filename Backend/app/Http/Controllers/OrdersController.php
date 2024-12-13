<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Orders;

class OrdersController extends Controller
{
    public function getPoints($id)
    {
        try {
          
            if (!is_numeric($id)) {
                return response()->json(['error' => 'ID no válido'], 400);
            }

            $orders = Orders::where('user_id', $id)
                ->where('payment_status', 1)
                ->get();
          
            return response()->json(['puntos' => count($orders)*10]);
        } catch (\Exception $e) {
            
            return response()->json(['error' => 'Error en el servidor'], 500);
        }
    }
}