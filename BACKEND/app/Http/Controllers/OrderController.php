<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderMail;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function enviarEmail(Request $request)
    {
        $request->validate([
            'items' => 'required|array',
            'total' => 'required|numeric',
            'customerEmail' => 'required|email'
        ]);

        $orderDetails = $request->all();

        DB::beginTransaction();

        try {
            foreach ($orderDetails['items'] as &$item) {
                $productoTalla = DB::table('producto_tallas')
                    ->where('producto_id', $item['id'])
                    ->where('talla_id', $item['talla_id'])
                    ->first();

                if ($productoTalla && $productoTalla->cantidad >= $item['cantidad']) {
                    DB::table('producto_tallas')
                        ->where('producto_id', $item['id'])
                        ->where('talla_id', $item['talla_id'])
                        ->update(['cantidad' => $productoTalla->cantidad - $item['cantidad']]);
                    
                    $item['talla'] = $this->getTallaNombre($item['talla_id']);
                } else {
                    return response()->json(['error' => 'Stock insuficiente para ' . $item['nombre'] . ' en talla ' . $item['talla_id']], 400);
                }
            }

            Mail::to($orderDetails['customerEmail'])->send(new OrderMail($orderDetails));

            DB::commit();

            return response()->json(['message' => 'Pedido procesado y correo enviado'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Error al procesar el pedido: ' . $e->getMessage()], 500);
        }
    }

    private function getTallaNombre($tallaId)
    {
        $tallasMap = [
            1 => 'S',
            2 => 'M',
            3 => 'L',
            4 => 'XL',
        ];

        return $tallasMap[$tallaId] ?? 'Desconocido';
    }
}
