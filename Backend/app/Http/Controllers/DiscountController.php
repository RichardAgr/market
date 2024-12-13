<?php

namespace App\Http\Controllers;
use App\Models\Discount;
use Illuminate\Http\Request;

class DiscountController extends Controller
{
    public function index()
    {
        $discounts = Discount::All();
        return $discounts;
    }

    public function store(Request $request)
    {
        $discount = new Discount();
        $discount->name = $request->name;
        $discount->description = $request->description;
        $discount->type_discount = $request->type_discount;
        $discount->value = $request->value;
        $discount->date_start = $request->date_start;
        $discount->date_end = $request->date_end;
        $discount->use_max = $request->use_max;
        $discount->discount = $request->discount;
        $discount->cupon = $request->cupon;
        $discount->code = $request->code;
        $discount->save();
        return $discount;
        
    }

    public function show($id)
    {
        $discount = Discount::find($id);
        return [$discount];
    }

    public function update(Request $request, $id)
    {
        $discount = Discount::findOrFail($request->id);
        $discount->name = $request->name;
        $discount->description = $request->description;
        $discount->type_discount = $request->type_discount;
        $discount->value = $request->value;
        $discount->date_start = $request->date_start;
        $discount->date_end = $request->date_end;
        $discount->use_max = $request->use_max;
        $discount->cupon = $request->cupon;
        $discount->code = $request->code;
        $discount->save();
        return $discount;
    }

    public function destroy($id)
    {
        $discount = Discount::destroy($id);
        return $discount;
    }
    
}
