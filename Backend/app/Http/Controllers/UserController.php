<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Notifications\VerifyEmailNotification;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $Users = User::all();
        return $Users;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string',
        ], [
            'email.unique' => 'El correo electrónico ya está registrado. Por favor, elige otro.',
        ]);

        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')),
        ]);

        return $user;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::find($id);
        return $user;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($request->id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->city = $request->city;
        $user->address = $request->address;
        $user->phone = $request->phone;
        $user->avatar = $request->avatar;
        $user->is_admin = $request->is_admin;
        $user->save();
        return $user;
    }

    public function updateProfile(Request $request)
    {
        $user = auth()->user();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->city = $request->city;
        $user->address = $request->address;
        $user->phone = $request->phone;
        $user->avatar = $request->avatar;
        $user->is_admin = $request->is_admin;
        $user->save();
        return $user;
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::destroy($id);
        return $user;
    }

    public function updatePassword(Request $request, $id)
    {
        $user = auth()->user();
        $user->password = bcrypt($request->password);
        $user->save();
        return response()->json(['message' => 'Contraseña actualizada correctamente']);
    }
    public function recoverPassword(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->password = bcrypt($request->input('password'));
        $user->save();
        return response()->json(['message' => 'Contraseña actualizada correctamente']);
    }
}

