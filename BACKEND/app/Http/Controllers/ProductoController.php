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
        $producto = Producto::create($request->only('nombre', 'descripcion', 'precio'));

        foreach ($request->tallas as $talla) {
            $producto->tallas()->attach($talla['id'], ['cantidad' => $talla['cantidad']]);
        }

        return response()->json($producto, 201);
    }



    public function update(ProductosRequest $request, $id)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'precio' => 'required|numeric',
            'tallas' => 'nullable|array',
            'tallas.*.id' => 'required|integer|exists:tallas,id',
            'tallas.*.cantidad' => 'required|integer|min:1',
        ]);

        $producto = Producto::find($id);
        if (!$producto) {
            return response()->json(['error' => 'Producto no encontrado'], 404);
        }

        $producto->update($request->only('nombre', 'descripcion', 'precio'));

        if ($request->has('tallas')) {
            foreach ($request->tallas as $talla) {
                if ($producto->tallas()->where('talla_id', $talla['id'])->exists()) {
                    $cantidadActual = $producto->tallas()->where('talla_id', $talla['id'])->first()->pivot->cantidad;
                    $nuevaCantidad = $cantidadActual + $talla['cantidad'];
                    $producto->tallas()->updateExistingPivot($talla['id'], ['cantidad' => $nuevaCantidad]);
                } else {
                    $producto->tallas()->attach($talla['id'], ['cantidad' => $talla['cantidad']]);
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
