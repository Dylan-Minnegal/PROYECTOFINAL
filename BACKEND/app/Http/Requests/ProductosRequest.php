<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductosRequest extends FormRequest
{
    public function authorize()
    {
        return true; 
    }
    public function rules()
    {
        return [
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'precio' => 'required|numeric|min:0',
            'tallas' => 'nullable|array',
            'tallas.*.id' => 'required|integer|exists:tallas,id',
            'tallas.*.cantidad' => 'required|integer|min:1',
        ];
    }
    public function messages()
    {
        return [
            'nombre.required' => 'El nombre del producto es obligatorio.',
            'nombre.string' => 'El nombre debe ser una cadena de texto válida.',
            'nombre.max' => 'El nombre no puede tener más de :max caracteres.',

            'descripcion.string' => 'La descripción debe ser una cadena de texto válida.',

            'precio.required' => 'El precio del producto es obligatorio.',
            'precio.numeric' => 'El precio debe ser un valor numérico.',
            'precio.min' => 'El precio debe ser al menos :min.',

            'tallas.array' => 'Las tallas deben ser un array.',
            'tallas.*.id.required' => 'El ID de la talla es obligatorio.',
            'tallas.*.id.integer' => 'El ID de la talla debe ser un número entero.',
            'tallas.*.id.exists' => 'La talla seleccionada no es válida.',

            'tallas.*.cantidad.required' => 'Debes especificar la cantidad para cada talla.',
            'tallas.*.cantidad.integer' => 'La cantidad debe ser un número entero.',
            'tallas.*.cantidad.min' => 'La cantidad debe ser al menos :min.',
        ];
    }
}
