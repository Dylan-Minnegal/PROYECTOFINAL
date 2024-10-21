<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Producto;
use App\Http\Requests\ProductosRequest;


class ProductoController extends Controller
{
    public function index()
    {
        return Producto::with('tallas')->get();
    }
    public function show($id)
    {
        $producto = Producto::with('tallas')->find($id);
        if (!$producto) {
            return response()->json(['error' => 'Producto no encontrado'], 404);
        }
        return response()->json($producto, 200);
    }


    public function store(ProductosRequest $request)
    {
        $producto = Producto::create($request->only('nombre', 'descripcion', 'precio', 'color', 'imagen', 'sexo', 'categoria'));

        foreach ($request->tallas as $talla) {
            $producto->tallas()->attach($talla['id'], ['cantidad' => $talla['cantidad']]);
        }

        return response()->json($producto->load('tallas'), 201);
    }



    public function update(ProductosRequest $request)
{
    $producto = Producto::find($request->id);
    if (!$producto) {
        return response()->json(['error' => 'Producto no encontrado'], 404);
    }

    $producto->update($request->only('nombre', 'descripcion', 'precio', 'color', 'imagen', 'sexo', 'categoria'));

    if ($request->has('tallas')) {
        foreach ($request->tallas as $talla) {
            if (!isset($talla['pivot']['cantidad'])) {
                return response()->json(['error' => 'La cantidad es requerida para cada talla'], 422);
            }

            $pivotData = [
                'cantidad' => $talla['pivot']['cantidad'], 
                'producto_id' => $producto->id,
                'talla_id' => $talla['id']
            ];

            if ($producto->tallas()->where('talla_id', $talla['id'])->exists()) {
                $producto->tallas()->updateExistingPivot($talla['id'], ['cantidad' => $pivotData['cantidad']]);
            } else {
                $producto->tallas()->attach($talla['id'], $pivotData);
            }
        }
    }

    return response()->json([
        'message' => 'Producto actualizado con éxito',
        'producto' => $producto->load('tallas')
    ], 200);
}







    public function destroy($id)
    {
        $producto = Producto::find($id);

        if (!$producto) {
            return response()->json(['error' => 'Producto no encontrado'], 404);
        }

        $producto->delete();

        return response()->json(['message' => 'Producto eliminado con éxito'], 200);
    }
}
