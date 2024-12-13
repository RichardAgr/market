<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Mail;
use App\Notifications\VerifyEmailNotification;

class VerificationController extends Controller
{
    use Notifiable;

    public function verify(Request $request)
    {
        $verification_code = $request->input('verificationCode');
        $user = auth()->user();

        if ($user->verification_code !== $verification_code) {
            return response()->json(['message' => 'Código de verificación incorrecto'], 400);
        }

        $user->email_verified_at = now();
        $user->verification_code = null;
        $user->save();

        return response()->json(['message' => 'Correo electrónico verificado con éxito'], 200);
    }

    public function resend(Request $request)
    {
        $user = auth()->user();

        if ($user->email_verified_at) {
            return response()->json(['message' => 'Correo electrónico ya verificado'], 400);
        }

        $user->verification_code = rand(0000000, 9999999);
        $user->save();

        $user->notify(new VerifyEmailNotification($user->verification_code));

        return response()->json(['message' => 'Código de verificación reenviado'], 200);
    }
}
