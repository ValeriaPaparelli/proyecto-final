class Carrito { 
    constructor(carritoInicial){
        this.items = carritoInicial.items; 
        this.total = carritoInicial.total;
    }
    
    agregarAlCarrito = (producto) => {
        let item = this.items.find(item => item.id === producto.id); 
        // Esto es para agrupar por producto y que no se repita al agregarlo más de una vez
        if (!item) {
            item = {
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: 1,
                total: producto.precio,
                imagen: producto.imagen
            };
            this.items.push(item);
        } else {
            item.cantidad ++;
            item.total = item.precio * item.cantidad;
        }
        this.total += item.precio;
        this.guardarEnStorage();
    }

    quitarDelCarrito = (posicion) => {
        let itemEliminado = this.items.splice(posicion, 1);
        this.total -= itemEliminado[0].total;
        this.guardarEnStorage();
    }

    vaciarCarrito = () => {
        this.items = [];
        this.total = 0;
        this.guardarEnStorage();
    }

    cantidadProductos = () => {
        let cantidad = 0; 
        this.items.forEach(item => {
            cantidad += item.cantidad;
        });
        return cantidad;
    }

    guardarEnStorage = () => {
        localStorage.setItem('carrito', JSON.stringify(this));
    }
}
