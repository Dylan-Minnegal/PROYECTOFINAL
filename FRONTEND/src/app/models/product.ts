export interface Talla {
    id: number;
    talla: string;
    pivot: {
        producto_id: number;
        talla_id: number;
        cantidad: number;
    };
}



export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    color: string;
    sexo: string;
    categoria: string;
    imagen: string;
    tallas: Talla[];
}
export interface Valoracion {
    calificacion: number;
    comentario: string;
    product_id: number;
    id_usuario: number; 
    nombreUsuario?: string; 
    apellidosUsuario?: string; 
}
export interface CartProduct {
    id: number;
    imagen: string,
    nombre: string;
    precio: number;
    cantidad: number;
    talla: string;
}