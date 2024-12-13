<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function store(Request $request){

        $code = 'UM-' . Str::random(8);
        while (Order::where('order_code', $code)->exists()) {
            $code = 'UM-' . Str::random(8);
        }

        $orderData = [
            'order_code' => $code,
            'name' => $request->get('name'),
            'total' => $request->get('total'),
            'user_id' => $request->get('user_id'),
            'product_amount' => $request->get('product_amount'),
            'payment_status' => false
        ];
    
        $order = new Order($orderData);
        $order->save();
        $orderId = $order->id;
        foreach ($request->input('details') as $detail) {
            $order->selectionDetails()->create($detail);
        }
        
        return response()->json(['message' => 'Order created successfully', 'id' => $orderId], 201);
    }

    public function validar($id){
        $order = order::findOrFail($id);
        return response()->json(['pago' => $order->payment_status]);
    }

    public function payment($id){
        $order = Order::findOrFail($id);

        $order->payment_status = true;
        $order->save();
        return response()->json(['message' => 'pago realizado con exito '], 201);
    }
}
