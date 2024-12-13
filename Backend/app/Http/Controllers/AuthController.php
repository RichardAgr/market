<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function index()
    {
        $users = User::all();
        return $users;
    }

    public function login(Request $request)
    {
        if(!Auth::attempt($request->only('email','password'))){
            return response([
                'message' => 'Invalid credentials'
            ], Response::HTTP_UNAUTHORIZED);
        }

        $user = Auth::user();
        $token = $user->createToken('authToken')->plainTextToken;


        return response([
            'message' => 'Success',
            'token' => $token,
            'user' => $user
        ]);
    }
    public function user(){
        return Auth::user();
    }

    public function logout(){
        auth()->user()->tokens()->delete();
        return [
            'message' => 'Logout successful'
        ];
    }

}




