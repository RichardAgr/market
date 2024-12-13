<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('index');
});

Route::get('/register', function () {
    return view('register');
});

Route::get('/login', function () {
    return view('login');
});

Route::get('/profile', function () {
    return view('profile');
});

Route::get('/modifyProfile', function () {
    return view('modifyProfile');
});

Route::get('/support', function () {
    return view('dashboard');
});

Route::get('/cart', function () {
    return view('dashboard');
});

Route::get('/reportes', function () {
    return view('reportes');
});

Route::get('/reportes/clientes', function () {
    return view('reportes/clientes');
});

Route::get('/reportes/ventas', function () {
    return view('reportes/ventas');
});

Route::get('/reportes/inventarios', function () {
    return view('reportes/inventarios');
});

Route::get('/reportes/usuariosRegistrados', function () {
    return view('reportes/usuariosRegistrados');
});

Route::get('/reportes/economicReport', function () {
    return view('reportes/ecomicReport');
});

Route::get('/{any}', function () {
    return view('404');
})->where('any', '.*');