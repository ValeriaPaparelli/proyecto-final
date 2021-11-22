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
        const cabecera = `<li class="checkout__productos__item checkout__productos__cabecera">
                <span class="checkout__productos__nombre">
                    Nombre
                </span>
                <span class="checkout__productos__precio">
                    Precio
                </span>
                <span class="checkout__productos__cantidad">
                    Cantidad
                </span>
                <span class="checkout__productos__subtotal">
                    Subtotal
                </span>
                <span class="checkout__productos__eliminar">
                    Eliminar
                </span>
            </li>`;
        $('#productos-seleccionados').append(cabecera);

        miCarrito.items.forEach((item, i) => {
            productosCarrito = `
                <li class="checkout__productos__item">
                    <span class="checkout__productos__nombre">
                        <img src="${item.imagen}" height="120px" />
                        ${item.nombre}
                    </span>
                    <span class="checkout__productos__precio">
                        $${item.precio}
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
        $('#form-compra').validate({
            rules: {
                email: {
                    required: true,
                    email: true,
                }
            },
            messages: {
                email: "El Email es requerido y debe contener un formato válido."
            },
            submitHandler: () => {
                $('#detalle-carrito').hide();
                $('#compra').show();
                miCarrito.vaciarCarrito();
            }
        });
            
    } else {
        $('#carrito-vacio').show();
    }
});