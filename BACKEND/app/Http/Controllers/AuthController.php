<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'contrasena' => 'required|string|min:8'
        ]);

        $usuario = Usuario::where('email', $request->email)->first();

        if (!$usuario || !Hash::check($request->contrasena, $usuario->contrasena)) {
            return response()->json(['message' => 'Credenciales incorrectas.'], 401); // Error de autenticación
        }

        $token = $usuario->createToken('token-de-acceso')->plainTextToken;

        return response()->json([
            'message' => 'Inicio de sesión exitoso.',
            'usuario' => $usuario,
            'token' => $token
        ], 200);
    }

    
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Sesión cerrada correctamente.'], 200);
    }

   
    public function perfil(Request $request)
    {
        return response()->json($request->user());
    }
}
