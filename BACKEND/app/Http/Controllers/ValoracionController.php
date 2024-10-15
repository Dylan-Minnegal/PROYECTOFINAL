<?php

namespace App\Http\Controllers;

use App\Models\Valoracion;
use App\Http\Requests\ValoracionRequest;
use Illuminate\Http\Request;

class ValoracionController extends Controller
{
    
    public function index()
    {
        $valoraciones = Valoracion::all();
        return response()->json($valoraciones);
    }

   
    public function store(ValoracionRequest $request)
    {
        try {
            $valoracion = Valoracion::create($request->validated());
    
            return response()->json([
                'message' => 'Valoración creada con éxito.',
                'valoracion' => $valoracion
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error interno al crear la valoración.'], 500);
        }
    }

   
    public function show($product_id)
    {
        $valoraciones = Valoracion::where('product_id', $product_id)->get();

        if ($valoraciones->isEmpty()) {
            return response()->json(['message' => 'No hay valoraciones para este producto.']);
        }

        return response()->json($valoraciones);
    }

   
    public function update(ValoracionRequest $request, $id)
    {
        $valoracion = Valoracion::find($id);

        if (!$valoracion) {
            return response()->json(['message' => 'Valoración no encontrada.'], 404);
        }

        $valoracion->update($request->validated());

        return response()->json([
            'message' => 'Valoración actualizada con éxito.',
            'valoracion' => $valoracion
        ]);
    }

    public function destroy($id)
    {
        $valoracion = Valoracion::find($id);

        if (!$valoracion) {
            return response()->json(['message' => 'Valoración no encontrada.'], 404);
        }

        $valoracion->delete();

        return response()->json(['message' => 'Valoración eliminada con éxito.']);
    }
}
