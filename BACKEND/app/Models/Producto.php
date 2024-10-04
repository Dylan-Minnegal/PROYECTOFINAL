<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;

    protected $fillable = ['nombre', 'descripcion', 'precio', 'color', 'imagen', 'sexo', 'categoria'];

    public function tallas()
    {
        return $this->belongsToMany(Talla::class, 'producto_tallas')->withPivot('cantidad')
            ->withPivot('cantidad');
    }
    public function valoraciones()
    {
        return $this->hasMany(Valoracion::class, 'product_id');
    }
}
