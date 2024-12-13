<?php

namespace App\Http\Controllers;
use App\models\Discount;
use App\models\Product;
use App\models\Promotion;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;

class PromotionController extends Controller
{
    public function getProductNames(){
        $productNames = Product::select('id', 'name', 'price', 'stock','brand')-> get();
        return $productNames;
     }

     public function getProductsThisPromotion($id){
        $products = DB::table('promotions')->select('*')->where('discount_id', $id)->get();
        return $products;
     }

     public function getProductsThisPromotionWithDetails($id){
      $productsDetails = product::join('promotions','promotions.product_id','=','products.id')
                  ->select('products.id','products.name','products.code','products.price','products.stock','products.brand','products.provider','products.image','products.category_id')
                  ->where('promotions.discount_id',$id)->orderBy('products.id','ASC')
                  ->get();
      return $productsDetails;
   }
   public function getProductsNotThisPromotionWithDetails($id){
      $productsDetails = product::join('promotions','promotions.product_id','=','products.id')
                  ->select('products.id','products.name','products.code','products.price','products.stock','products.brand','products.provider','products.image','products.category_id')
                  ->where('promotions.discount_id','<>',$id)->orderBy('products.id','ASC')
                  ->get();
      return $productsDetails;
   }
   public function storePromotionDiscountAndProduct(Request $request){
      $promotion = new Promotion();
      $promotion->product_id = $request->product_id;
      $promotion->discount_id = $request->discount_id;
      $promotion->save();
      return $promotion;
   }

   public function deletePromotionDiscountAndProduct(Request $request)
   {  
      $promotion = DB::table('promotions')->select('*')->where('discount_id', $request->discount_id)
                  ->where('product_id', $request->product_id)->delete();
      return $promotion;
   }

   public function destroyPromotion($id)
   {
       $promotion = Promotion::destroy($id);
       return $promotion;
   }
}
