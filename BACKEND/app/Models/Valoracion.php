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
        'id_usuario',
        'calificacion',
        'comentario'
    ];

    public function producto()
    {
        return $this->belongsTo(Producto::class, 'product_id');
    }
    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id_usuario');
    }

}
