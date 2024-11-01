<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use App\Http\Requests\UsuarioRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UsuarioController extends Controller
{
    public function store(UsuarioRequest $request)
{
    $data = $request->validated();

    $data['password'] = Hash::make($data['password']); 

    $data['rol'] = 'usuario';

    $usuario = Usuario::create($data);

    return response()->json($usuario, 201);
}

   
public function update(Request $request)
{
    $user = Auth::user();

    if (!$user) {
        return response()->json(['error' => 'No autenticado.'], 401);
    }

    $data = $request->validate([
        'nombre' => 'required|string|max:255',
        'apellidos' => 'required|string|max:255',
        'email' => 'required|email|max:255|unique:users,email,' . $user->id,
        'direccion' => 'nullable|string|max:255',
    ]);

    $user->update($data);

    return response()->json(['message' => 'Perfil actualizado con éxito.', 'user' => $user]);
}
    public function show($id)
    {
        $usuario = Usuario::findOrFail($id);
    
        if (!$usuario) {
            return response()->json([
                'message' => 'Usuario no encontrado'
           ], 404); 
    }

        return response()->json([
           'message' => 'Usuario encontrado con éxito',
           'nombre' => $usuario->nombre,
           'apellidos' => $usuario->apellidos, 
            'email' => $usuario->email,
            'id' => $usuario->id,
        ], 200);
    }

}
    