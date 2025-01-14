export interface Talla {
    id: number;
    talla: string;
    cantidad?: number;
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
export interface NuevoProducto {
    nombre: string;
    descripcion: string;
    precio: number;
    color: string;
    imagen: string;
    sexo: string;
    categoria: string;
    tallas: { id: number; cantidad: number; }[];
}

export interface Valoracion {
    id: number;
    calificacion: number;
    comentario: string;
    product_id: number;
    id_usuario: number;
    nombreUsuario?: string;
    apellidosUsuario?: string;
}
export interface ValoracionCrear {
    product_id: number;
    id_usuario: number;
    calificacion: number;
    comentario: string;
}
export interface CartProduct {
    id: number;
    imagen: string,
    nombre: string;
    precio: number;
    cantidad: number;
    talla: string;
    stock: number
}