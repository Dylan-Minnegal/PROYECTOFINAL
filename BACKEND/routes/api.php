<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\ValoracionController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OrderController;



Route::get('/productos', [ProductoController::class, 'index']);
Route::get('/productos/{id}', [ProductoController::class, 'show']);


Route::get('/valoraciones', [ValoracionController::class, 'index']);
Route::get('/valoraciones/{id}', [ValoracionController::class, 'show']);
Route::post('/valoraciones', [ValoracionController::class, 'store']);


Route::get('/usuarios/{id}', [UsuarioController::class, 'show']);


Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::post('/usuarios', [UsuarioController::class, 'store']);


Route::middleware(['auth:api', 'admin'])->group(function () {
    Route::post('/productos', [ProductoController::class, 'store']);
    Route::delete('/productos/{id}', [ProductoController::class, 'destroy']);
    Route::put('/productos/{id}', [ProductoController::class, 'update']);

    Route::delete('/valoraciones/{id}', [ValoracionController::class, 'destroy']);
    Route::put('/valoraciones/{id}', [ValoracionController::class, 'update']);
    
    Route::put('/usuarios', [UsuarioController::class, 'update']);
});


Route::post('/pedidos', [OrderController::class, 'enviarEmail']);
