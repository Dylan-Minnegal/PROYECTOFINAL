<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Model
{
    use HasFactory, HasApiTokens;

    // Definir los campos que se pueden asignar en masa
    protected $fillable = ['nombre', 'apellidos', 'email', 'direccion', 'contrasena', 'rol'];

    /**
     * Encriptar la contraseña automáticamente al asignarla.
     */
    public function setContrasenaAttribute($value)
    {
        $this->attributes['contrasena'] = Hash::make($value);
    }
    public function setRolAttribute($value)
    {
        $this->attributes['rol'] = $value ?? 'usuario';
    }
}
