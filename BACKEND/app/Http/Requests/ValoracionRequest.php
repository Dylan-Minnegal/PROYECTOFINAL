<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ValoracionRequest extends FormRequest
{
    
    public function authorize()
    {
        return true;
    }

    
    public function rules()
    {
        return [
            'product_id' => 'required|exists:productos,id',
            'id_usuario' => 'required|exists:usuarios,id|numeric', 
            'calificacion' => 'required|integer|min:1|max:5',
            'comentario' => 'nullable|string'
        ];
    }

    
    public function messages()
    {
        return [
            'product_id.required' => 'El campo product_id es obligatorio.',
            'product_id.exists' => 'El producto especificado no existe.',
            'calificacion.required' => 'La calificación es obligatoria.',
            'calificacion.integer' => 'La calificación debe ser un número entero.',
            'calificacion.min' => 'La calificación mínima es 1.',
            'calificacion.max' => 'La calificación máxima es 5.',
            'comentario.string' => 'El comentario debe ser un texto válido.'
        ];
    }
}
