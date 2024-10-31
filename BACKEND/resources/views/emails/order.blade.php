@component('mail::message')
# Detalles de tu Pedido

Gracias por tu compra. Aquí tienes los detalles de tu pedido:

@foreach ($orderDetails['items'] as $item)
- **Producto:** {{ $item['nombre'] }}
- **Talla:** {{ $item['talla'] }}
- **Cantidad:** {{ $item['cantidad'] }}
- **Precio:** ${{ $item['precio'] }}
@endforeach

**Total:** ${{ $orderDetails['total'] }}

Gracias,<br>
{{ config('app.name') }}
@endcomponent
