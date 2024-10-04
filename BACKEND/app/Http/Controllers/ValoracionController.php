<?php

namespace App\Http\Controllers;

use App\Models\Valoracion;
use App\Http\Requests\ValoracionRequest;
use Illuminate\Http\Request;

class ValoracionController extends Controller
{
    /**
     * Muestra todas las valoraciones.
     */
    public function index()
    {
        // Obtener todas las valoraciones sin la relación del producto
        $valoraciones = Valoracion::all();
        return response()->json($valoraciones);
    }

    /**
     * Crea una nueva valoración.
     */
    public function store(ValoracionRequest $request)
    {
        // Crear la valoración usando datos validados
        try {
            // Crear la valoración usando datos validados
            $valoracion = Valoracion::create($request->validated());
    
            return response()->json([
                'message' => 'Valoración creada con éxito.',
                'valoracion' => $valoracion
            ], 201);
        } catch (\Exception $e) {
            \Log::error('Error al crear la valoración: ' . $e->getMessage());
            return response()->json(['message' => 'Error interno al crear la valoración.'], 500);
        }
    }

    /**
     * Muestra todas las valoraciones de un producto específico.
     */
    public function show($product_id)
    {
        // Obtener todas las valoraciones para un producto específico sin la relación del producto
        $valoraciones = Valoracion::where('product_id', $product_id)->get();

        if ($valoraciones->isEmpty()) {
            return response()->json(['message' => 'No hay valoraciones para este producto.'], 404);
        }

        return response()->json($valoraciones);
    }

    /**
     * Actualiza una valoración específica.
     */
    public function update(ValoracionRequest $request, $id)
    {
        $valoracion = Valoracion::find($id);

        if (!$valoracion) {
            return response()->json(['message' => 'Valoración no encontrada.'], 404);
        }

        // Actualizar la valoración con los datos validados
        $valoracion->update($request->validated());

        return response()->json([
            'message' => 'Valoración actualizada con éxito.',
            'valoracion' => $valoracion
        ]);
    }

    /**
     * Elimina una valoración específica.
     */
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
