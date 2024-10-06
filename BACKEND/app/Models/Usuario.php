<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;  // Importar Notifiable para notificaciones
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Usuario extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;  

    protected $fillable = ['nombre', 'apellidos', 'email', 'direccion', 'password', 'rol'];

    protected $hidden = ['password'];
    
    
    public function getAuthPassword()
{
    return $this->password;
}


    // Métodos requeridos por la interfaz JWTSubject
    public function getJWTIdentifier()
    {
        return $this->getKey();  // Usar la clave primaria del modelo como identificador del JWT
    }

    public function getJWTCustomClaims()
    {
        return [];  // Retornar un array vacío si no hay claims personalizados
    }
}
