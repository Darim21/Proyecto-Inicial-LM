document.addEventListener("DOMContentLoaded", function () {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const listaCarrito = document.getElementById("lista-carrito");
    const totalCarrito = document.getElementById("total-carrito");
    const btnVaciar = document.getElementById("vaciar-carrito");
    const botonesAgregar = document.querySelectorAll(".producto button");

    function actualizarCarrito() {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    function mostrarCarrito() {
        if (!listaCarrito) return;
        listaCarrito.innerHTML = "";
        let total = 0;

        carrito.forEach((producto, index) => {
            const item = document.createElement("li");
            item.innerHTML = `
                <img src="${producto.imagen}" width="50" alt="${producto.nombre}"> 
                ${producto.nombre} - ${producto.precio} €
                <button class="eliminar" data-index="${index}">X</button>
            `;
            listaCarrito.appendChild(item);
            total += parseFloat(producto.precio);
        });

        totalCarrito.textContent = "Total: " + total.toFixed(2) + " €";
    }

    if (listaCarrito) {
        mostrarCarrito();

        listaCarrito.addEventListener("click", function (e) {
            if (e.target.classList.contains("eliminar")) {
                const index = e.target.dataset.index;
                carrito.splice(index, 1); 
                actualizarCarrito(); 
                mostrarCarrito(); 
            }
        });

        if (btnVaciar) {
            btnVaciar.addEventListener("click", function () {
                carrito = [];
                actualizarCarrito();
                mostrarCarrito(); 
            });
        }
    }

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", function () {
            const producto = this.closest(".producto");
            const nombre = producto.querySelector("h3").textContent;
            const precio = producto.querySelector(".precio").textContent.replace("€", "").trim();
            const imagen = producto.querySelector("img").src;

            const productoExistente = carrito.find(item => item.nombre === nombre && item.precio === precio);
            if (!productoExistente) {
                carrito.push({ nombre, precio, imagen });
                actualizarCarrito();
            }
        });
    });
});
