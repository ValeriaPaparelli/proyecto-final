$(() => {
    const carritoInicial = JSON.parse(localStorage.getItem('carrito'));
    const miCarrito = new Carrito(carritoInicial);

    const eliminarItem = (posicion) => {
        miCarrito.quitarDelCarrito(posicion);
        if(miCarrito.items.length) {
            mostrarProductos();
        } else {
            $('#detalle-carrito').hide();
            $('#carrito-vacio').show();
        }
    }

    const agregarEventoClickProductos = () => {
        miCarrito.items.forEach((item, i) => {
            $(`#item-${i}`).on('click', () => {
                eliminarItem(i);
            });
        });
    };

    const mostrarProductos = () => {
        $('#total').html(`$${miCarrito.total}`);
        $('#productos-seleccionados').html('');
        miCarrito.items.forEach((item, i) => {
            const productosCarrito = `
                <li class="checkout__productos__item">
                    <span class="checkout__productos__nombre">
                        <img src="${item.imagen}" height="40px" />
                        ${item.nombre}
                    </span>
                    <span class="checkout__productos__cantidad">
                        x${item.cantidad}
                    </span>
                    <span class="checkout__productos__subtotal">
                        $${item.total}
                    </span>
                    <span class="checkout__productos__eliminar">
                        <button id="item-${i}">X</button>
                    </span>
                </li>`;
            $('#productos-seleccionados').append(productosCarrito);
        });
        agregarEventoClickProductos();
    }
    
    if(miCarrito.items.length) {
        mostrarProductos();
        $('#detalle-carrito').show();
        $('#confirmar-compra').on('click', (e) => {
            e.preventDefault();
            $('#detalle-carrito').hide();
            $('#compra').show();
            miCarrito.vaciarCarrito();
        });
    } else {
        $('#carrito-vacio').show();
    }
});