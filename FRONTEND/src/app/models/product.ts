export interface Talla {
    id: number; // El identificador de la talla
    talla: string; // El valor de la talla, por ejemplo: "S", "M", "L"
    pivot: {
        producto_id: number; // El ID del producto asociado a esta talla
        talla_id: number; // El ID de la talla (posiblemente redundante)
        cantidad: number; // La cantidad de esta talla disponible
    };
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
