<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HelloController;
use App\Http\Controllers\ReportingController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FAQController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DiscountController;
use App\Http\Controllers\PromotionController;

use App\Http\Controllers\ForgotPasswordController;

use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrdersController;


use App\Http\Controllers\VerificationController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\EmailController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get ('/hello', [HelloController::class, 'hello']);
 
Route::post('/agregar-stock',[InventoryController::class, "store"]);


Route::controller(DiscountController::class)->group(function () {
    Route::get('/discounts', 'index');
    Route::post('/discount', 'store');
    Route::get('/discount/{id}', 'show');
    Route::put('/discount/{id}', 'update');
    Route::delete('/discount/{id}', 'destroy');
});

Route::controller(PromotionController::class)->group(function () {
    Route::get('/promotions/product', 'getProductNames');
    Route::get('/promotions/products/{idDiscount}', 'getProductsThisPromotion');
    Route::get('/promotions/productsSelected/{idDiscount}', 'getProductsThisPromotionWithDetails');
    Route::post('/promotions/product', 'storePromotionDiscountAndProduct');
    Route::delete('/promotions/product', 'deletePromotionDiscountAndProduct');
    Route::delete('/promotions/{idPromotion}', 'destroyPromotion');
    Route::get('/promotions/productsNotSelected/{idDiscount}', 'getProductsNotThisPromotionWithDetails');
});


Route::post('/agregar-pregunta', [FAQController::class, "store"]);
Route::get('/faqs', [FAQController::class, "getFaq"]);

Route::post('/editar-pregunta/{id}', [FAQController::class, "update"]);
Route::delete('/{id}', [FAQController::class, "delete"]);

Route::prefix('/reporting')->group(function () {
    Route::get('/sale/{startDate}/{endDate}', [ReportingController::class, 'getSalesReport']);
    Route::get('/inventary/{startDate}/{endDate}', [ReportingController::class, 'getInventoryReport']);
    Route::get('/user/{startDate}/{endDate}', [ReportingController::class, 'getUserReport']);
    Route::get('/user-register', [ReportingController::class, 'getUserRegisterReport']);
    Route::delete('/user-register/{id}', [ReportingController::class, 'destroyUserRegistred']);
    Route::get('/economicReport', [ReportingController::class, 'getEconomicReport']);
    Route::get('/ordersYears', [ReportingController::class, 'getOrdersYears']);
    Route::get('/mostSelleds/{startDate}/{endDate}', [DashboardController::class, 'mostSelleds']);
    Route::get('/incomes/{year}', [DashboardController::class, 'incomesYear']);
    Route::get('/incomes/{startDate}/{endDate}', [DashboardController::class, 'incomes']);
    Route::get('/expensives/{year}', [DashboardController::class, 'expensivesYear']);
    Route::get('/expensives/{startDate}/{endDate}', [DashboardController::class, 'expensives']);
    Route::get('/users/{year}', [DashboardController::class, 'usersYear']);
    Route::get('/users/{startDate}/{endDate}', [DashboardController::class, 'users']);
    Route::get('/orders/{year}', [DashboardController::class, 'ordersYear']);
    Route::get('/orders/{startDate}/{endDate}', [DashboardController::class, 'orders']);
});

Route::controller(UserController::class)->group(function () {
    Route::get('/user', 'index');
    Route::post('/user', 'store');
    Route::get('/user/{id}', 'show');
    Route::put('/user/{id}', 'update');
    Route::delete('/user/{id}', 'destroy');
});

Route::controller(AuthController::class)->group(function () {
    Route::post('/login', 'login');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [App\Http\Controllers\AuthController::class, 'logout']);
    Route::get('user', [App\Http\Controllers\AuthController::class, 'user']);
});


Route::post('/create-product', [ProductController::class, 'store']);
Route::post('/create-category', [CategoryController::class, 'store']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get ('/product/{id}', [ProductController::class, 'show']);
Route::get ('/products', [ProductController::class, 'index']);
Route::get('/getProducts/{rowsPerPage}/{productsType}', [ProductController::class, 'getProducts']);



Route::post('/create-product', [ProductController::class, 'store']);
Route::post('/create-category', [CategoryController::class, 'store']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/product/{id}', [ProductController::class, 'show']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{rowsPerPage}', [ProductController::class, 'getProducts']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/verify-email', [VerificationController::class, 'verify'])->name('verification.verify');
    Route::get('/resend-email', [VerificationController::class, 'resend'])->name('verification.resend');
});
// Route::put('/restore/{id}', [App\Http\Controllers\UserController::class,'recoverPassword']);

Route::post('/forget-password', [ForgotPasswordController::class, 'submitForgetPasswordForm'])->name('forget.password.post');
Route::post('/restore', [ForgotPasswordController::class, 'submitResetPasswordForm']);

Route::middleware('auth:sanctum')->group(function(){
    Route::put('updateProfile', [App\Http\Controllers\UserController::class,'updateProfile']);
});

Route::prefix('/compra')->group(function () {
    Route::post('/guardar', [OrderController::class, 'store']);
    Route::get('/validar/{id}', [OrderController::class, 'validar']);
    Route::get('/payment/{id}', [OrderController::class, 'payment']);
});
Route::controller(EmailController::class)->group(function () {
    Route::get('/correoElectronico/{id}', 'index');
});
