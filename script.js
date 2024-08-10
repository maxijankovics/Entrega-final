let productos = [
    {id: 1, nombre: "Menu ejecutivo", categoria: "menus completos", precio: 540, rutaImagen: "img/menu-ejecutivo.png"},
    {id: 2, nombre: "Menu express", categoria: "menus completos", precio: 370, rutaImagen: "img/menu-express.jpg"},
    {id: 3, nombre: "Petit entrecot con guarnicion", categoria: "platos carta", precio: 545, rutaImagen: "img/Entrecot-con-guarnición.jpg"},
    {id: 4, nombre: "Costillas de cerdo agridulces (con ananá) con guarnicion", categoria: "platos carta", precio: 520, rutaImagen: "img/costillas-de-cerdo-agridulces.jpg"},
    {id: 5, nombre: "Sorrentinos caseros", categoria: "platos carta", precio: 410, rutaImagen: "img/sorrentinos-caseros.jpg"},
    {id: 6, nombre: "Canelones de verdura con fileto", categoria: "platos carta", precio: 410, rutaImagen: "img/canelones-de-verdura.jpg"},
    {id: 7, nombre: "Berenjenas a la parmesana", categoria: "platos carta", precio: 450, rutaImagen: "img/berenjenas-a-la-parmesana.jpg"},
    {id: 8, nombre: "Copa de vino tinto", categoria: "vinos", precio: 150, rutaImagen: "img/copa-de-vino-tinto.png"},
    {id: 9, nombre: "Copa de vino blanco", categoria: "vinos", precio: 150, rutaImagen: "img/copa-vino-blanco.jpg"},
    {id: 10, nombre: "Pepsi", categoria: "refrescos", precio: 120, rutaImagen: "img/pepsi.png"},
    {id: 11, nombre: "Pepsi black", categoria: "refrescos", precio: 120, rutaImagen: "img/pepsi-black.png"},
    {id: 12, nombre: "Mirinda", categoria: "refrescos", precio: 120, rutaImagen: "img/mirinda.png"},
    {id: 13, nombre: "7up", categoria: "refrescos", precio: 120, rutaImagen: "img/7up.png"},
]

// Creando los productos desde el array

const contenedor = document.getElementById("contenedorProductos");
const buscador = document.getElementById("barraBuscadora");


// Funcion para crear las cartas

function renderizarProductos(productos) {
    contenedor.innerHTML = "";
    productos.forEach(producto => {
        const cartaProducto = document.createElement('div');
        cartaProducto.className = "tarjetaProducto";
    
        const img = document.createElement('img');
        img.src = producto.rutaImagen;
        img.alt = producto.nombre;
    
        const nombreProducto = document.createElement('h2');
        nombreProducto.className = "nombre";
        nombreProducto.textContent = producto.nombre;
    
        const precioProducto = document.createElement('p');
        precioProducto.className = "precio";
        precioProducto.textContent = `$${producto.precio}`;

        const botonCarrito = document.createElement('button');
        botonCarrito.className = "botonCarro"
        botonCarrito.textContent = "Agregar al carrito";
        botonCarrito.addEventListener("click", () => agregarAlCarrito(producto))
    
        cartaProducto.appendChild(img);
        cartaProducto.appendChild(nombreProducto);
        cartaProducto.appendChild(precioProducto);
        cartaProducto.appendChild(botonCarrito);
    
        contenedor.appendChild(cartaProducto);
    
    })
}

// Funcion para filtrar productos

function filtrarProductos() {
    const busqueda = buscador.value.toLowerCase();
    const productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(busqueda));
    
    renderizarProductos(productosFiltrados);
}

renderizarProductos(productos);

buscador.addEventListener("input", filtrarProductos);

// Filtrado de los botones

const botonesFiltrado = document.querySelectorAll(".filtros button");

function filtrarPorCategoria(event) {
    const categoriaSeleccionada = event.target.getAttribute("data-category");
    const productosFiltrados = productos.filter(producto => producto.categoria === categoriaSeleccionada);
    renderizarProductos(productosFiltrados);
}

botonesFiltrado.forEach(button => {button.addEventListener("click", filtrarPorCategoria)})

// Funciones del carrito

let carrito = [];

if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'));
} else {
    carrito = [];
}

function agregarAlCarrito(producto) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`${producto.nombre} ha sido agregado al carrito`);
}

function mostrarCarrito() {
    const contenedorCarrito = document.getElementById("contenedorCarrito");
    contenedorCarrito.innerHTML = "";

    if (carrito.length === 0) {
        contenedorCarrito.textContent = "El carrito esta vacio";
        return;
    }

    carrito.forEach((producto, index) => {
        const itemCarrito = document.createElement('div');
        itemCarrito.classname = "itemCarrito"

        const basura = document.createElement('img');
        basura.src = "./img/basura.png";
        basura.style.cursor = 'pointer';
        basura.addEventListener('click', () => eliminarDelCarrito(index));

        const infoProducto = document.createElement('div');
        infoProducto.textContent = `${producto.nombre} - $${producto.precio}`;

        itemCarrito.appendChild(basura);
        itemCarrito.appendChild(infoProducto);

        contenedorCarrito.appendChild(itemCarrito);
    })

    const precioTotal = carrito.reduce((total, producto) => total + producto.precio, 0);
    const elementoPrecioTotal = document.createElement('p');
    elementoPrecioTotal.className = 'precioTotal';
    elementoPrecioTotal.textContent = `Total: $${precioTotal}`;
    contenedorCarrito.appendChild(elementoPrecioTotal);
}

mostrarCarrito()

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);

    localStorage.setItem('carrito', JSON.stringify(carrito));

    mostrarCarrito();
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarCarrito();
});