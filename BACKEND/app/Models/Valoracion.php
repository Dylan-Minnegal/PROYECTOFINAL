<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Valoracion extends Model
{
    use HasFactory;

    protected $table = 'valoraciones';
    
    protected $fillable = [
        'product_id',
        'calificacion',
        'comentario'
    ];

    // Relación inversa con el modelo Producto
    public function producto()
    {
        return $this->belongsTo(Producto::class, 'product_id');
    }
}
