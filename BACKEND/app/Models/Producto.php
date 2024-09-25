<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;

    protected $fillable = ['nombre', 'descripcion', 'precio'];

    // Relación muchos a muchos con tallas
    public function tallas()
    {
        return $this->belongsToMany(Talla::class, 'producto_tallas')->withPivot('cantidad')
            ->withPivot('cantidad');
    }
}
