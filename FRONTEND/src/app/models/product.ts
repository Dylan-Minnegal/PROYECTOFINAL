// models/product.ts
export interface Talla {
    id: number;          // Identificador de la talla
    cantidad: number;    // Cantidad disponible de la talla
}

export interface Producto {
    id: number;                // Identificador del producto
    nombre: string;            // Nombre del producto
    descripcion: string;       // Descripción del producto
    precio: number;            // Precio del producto
    color: string;             // Color del producto
    imagen: string;            // Imagen del producto (puede ser base64 o una URL)
    tallas: Talla[];           // Array de tallas
}
