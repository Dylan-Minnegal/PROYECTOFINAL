<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Talla extends Model
{
    use HasFactory;

    protected $fillable = ['talla'];

    public function productos()
    {
        return $this->belongsToMany(Producto::class, 'producto_tallas')
                    ->withPivot('cantidad');
    }
}