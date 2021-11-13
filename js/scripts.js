//const URL_JSON = 'data/productos.json';

$(() => {

    let mostrarCarrito = false;

    const agregarEventoClickProductos = () => {
        if(typeof productos !== 'undefined') {
            productos.forEach((producto, i) => {
                $(`#producto-${i}`).on('click', () => {
                    agregarProducto(producto);
                });
            });
        }
    };

    const agregarEventoClickCarrito = () => {
        miCarrito.items.forEach((producto, i) => {
            $(`#producto-carrito-${i}`).on('click', () => {
                eliminarProducto(producto);
            });
        });
    };
    
    const actualizarCarritoDOM = () => {
        $('#carrito-cantidad').html(`${miCarrito.items.length}`);
        $('#carrito-total').html(`$${miCarrito.total}`);
        $('#carrito-productos').html('');

        if (miCarrito.items.length === 0) {
            $('#carrito-total-contenedor').hide();
            $('#carrito-botones').hide();
            $('#carrito-productos').html(`<li class="header__menu__carrito__detalle__productos__vacio">
                El Carrito está vacío
            </li>`);
            return;
        }
        
        $('#carrito-total-contenedor').show();
        $('#carrito-botones').show();

        miCarrito.items.forEach((producto, i) => {
            const productosCarrito = `
                <li class="header__menu__carrito__detalle__productos__item">
                    <span class="header__menu__carrito__detalle__productos__nombre">
                        ${producto.nombre}
                    </span>
                    <span class="header__menu__carrito__detalle__productos__subtotal">
                        $${producto.precio}
                    </span>
                    <span class="header__menu__carrito__detalle__productos__eliminar">
                        <button id="producto-carrito-${i}">X</button>
                    </span>
                </li>`;
            $('#carrito-productos').append(productosCarrito);
        });

        agregarEventoClickCarrito();
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
    agregarEventoClickProductos();

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

});
