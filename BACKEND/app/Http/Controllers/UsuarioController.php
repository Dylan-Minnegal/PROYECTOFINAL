<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use App\Http\Requests\UsuarioRequest;

class UsuarioController extends Controller
{
    public function store(UsuarioRequest $request)
    {
        $data = $request->validated(); 

        $data['rol'] = 'usuario';

        $usuario = Usuario::create($data);

        return response()->json($usuario, 201);
    }

   
    public function update(UsuarioRequest $request, $id)
    {
        $usuario = Usuario::find($id);

        if (!$usuario) {
            return response()->json(['message' => 'Usuario no encontrado.'], 404);
        }

        $data = $request->validated();

        $usuario->update($data);

        return response()->json($usuario);
    }
}
