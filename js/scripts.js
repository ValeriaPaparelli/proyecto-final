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
        miCarrito.items.forEach((item, i) => {
            $(`#item-${i}`).on('click', () => {
                eliminarItem(i);
            });
        });
    };
    
    const actualizarCarritoDOM = () => {
        $('#carrito-cantidad').html(`${miCarrito.cantidadProductos()}`);
        $('#carrito-cantidad-mobile').html(`${miCarrito.cantidadProductos()}`);
        $('#carrito-total').html(`$${miCarrito.total}`);
        $('#carrito-productos').html('');

        if (miCarrito.items.length === 0) {
            $('#carrito-total-contenedor').hide();
            $('#carrito-botones').hide();
            $('#carrito-productos').html(`<li class="header__menu__carrito__detalle__productos__vacio">
                El Carrito está vacío. <a href="/index.html#nuestros-productos">Ver productos</a>
            </li>`);
            return;
        }
        
        $('#carrito-total-contenedor').show();
        $('#carrito-botones').show();

        miCarrito.items.forEach((item, i) => {
            const productosCarrito = `
                <li class="header__menu__carrito__detalle__productos__item">
                    <span class="header__menu__carrito__detalle__productos__nombre">
                        <img src="${item.imagen}" height="40px" />
                        ${item.nombre}
                    </span>
                    <span class="header__menu__carrito__detalle__productos__cantidad">
                        x${item.cantidad}
                    </span>
                    <span class="header__menu__carrito__detalle__productos__subtotal">
                        $${item.total}
                    </span>
                    <span class="header__menu__carrito__detalle__productos__eliminar">
                        <button id="item-${i}">X</button>
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
    
    const eliminarItem = (posicion) => {
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
