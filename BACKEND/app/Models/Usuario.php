<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;  
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Model;


class Usuario extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;  

    protected $fillable = ['nombre', 'apellidos', 'email', 'direccion', 'password', 'rol'];

    protected $hidden = ['password'];
    
    
    public function getAuthPassword()
{
    return $this->password;
}


    public function getJWTIdentifier()
    {
        return $this->getKey(); 
    }

    public function getJWTCustomClaims()
    {
        return [];  
    }
    public function valoraciones()
    {
        return $this->hasMany(Valoracion::class, 'id_usuario');
    }

}
