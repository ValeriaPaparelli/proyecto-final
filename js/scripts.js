//const URL_JSON = 'data/productos.json';

$(() => {

    let mostrarCarrito = false;

    const agregarEventoClickProductos = () => {
        productos.forEach((producto, i) => {
            $(`#producto-${i}`).on('click', () => {
                agregarProducto(producto);
            });
        });
    };
    
    const actualizarCarritoDOM = () => {
        $('#carrito-cantidad').html(`${miCarrito.items.length}`);
        $('#total').html(`$${miCarrito.total}`);
        $('#carrito-productos').html('');

        if (miCarrito.items.length === 0) {
            $('#carrito-productos').html(`<li class="header__menu__carrito__detalle__productos__vacio">
                El Carrito está vacío
            </li>`);
            return;
        }
    
        miCarrito.items.forEach((producto, i) => {
            const detalleCarrito = `
                <li class="header__menu__carrito__detalle__productos__item">
                    <span class="header__menu__carrito__detalle__productos__nombre">
                        ${producto.nombre}
                    </span>
                    <span class="header__menu__carrito__detalle__productos__canidad">
                        x2
                    </span>
                    <span class="header__menu__carrito__detalle__productos__subtotal">
                        $${producto.precio} x
                    </span>
                </li>`;
            $('#carrito-productos').append(detalleCarrito);
        });
    };
    
    const agregarProducto = (producto) => {
        miCarrito.agregarAlCarrito(producto);
        actualizarCarritoDOM();
    };
    
    const eliminarProducto = (posicion) => {
        miCarrito.quitarDelCarrito(posicion);
        actualizarCarritoDOM();
    }
    
    const eliminarProductos = () => {
        miCarrito.vaciarCarrito();
        actualizarCarritoDOM();
    }
    
    if (!localStorage.getItem('carrito')) {
        localStorage.setItem('carrito', JSON.stringify({ items: [], total: 0 }));
    }
    
    const carritoInicial = JSON.parse(localStorage.getItem('carrito'));
    const miCarrito = new Carrito(carritoInicial);

    actualizarCarritoDOM();

    $('#carrito').on('click', () => {
        if (mostrarCarrito) {
            $('#carrito-detalle').hide();
            mostrarCarrito = false;
        } else {
            $('#carrito-detalle').show();
            mostrarCarrito = true;
        }
    });

    $('#carrito-checkout').on('click', () => {
        console.log('Carrito Checkout');
    });

    $('#carrito-vaciar').on('click', () => eliminarProductos());

    agregarEventoClickProductos();
});

{/* <li class="header__menu__carrito__detalle__productos__item">
    <span class="header__menu__carrito__detalle__productos__nombre">
        Crema de manos
    </span>
    <span class="header__menu__carrito__detalle__productos__canidad">
        x2
    </span>
    <span class="header__menu__carrito__detalle__productos__subtotal">
        $1230,80
    </span>
</li> */}
{/* <li class="header__menu__carrito__detalle__productos__vacio">
    El Carrito está vacío
</li>  */}