document.addEventListener("DOMContentLoaded", function () {
    const login_form = document.getElementById("login_form");
    const register_form = document.getElementById("register_form");

    if (login_form) {
        login_form.addEventListener("submit", function (e) {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            const usuario = usuarios.find(user => user.email === email && user.password === password);

            if (usuario) {
                localStorage.setItem("usuario_actual", JSON.stringify(usuario));
                alert("Inicio de sesión exitoso");
                window.location.href = "perfil.html";
            } else {
                alert("Correo o contraseña incorrectos");
            }
        });
    }

    if (register_form) {
        register_form.addEventListener("submit", function (e) {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const nombre = document.getElementById("nombre").value;

            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            
            if (usuarios.some(user => user.email === email)) {
                alert("Este correo ya está registrado.");
                return;
            }

            const nuevo_usuario = { nombre, email, password };
            usuarios.push(nuevo_usuario);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            alert("Registro exitoso");
            window.location.href = "login.html";
        });
    }

    if (window.location.pathname.includes("perfil.html")) {
        const usuario_actual = JSON.parse(localStorage.getItem("usuario_actual"));
        if (usuario_actual) {
            document.getElementById("perfil_nombre").textContent = usuario_actual.nombre;
            document.getElementById("perfil_email").textContent = usuario_actual.email;
        } else {
            alert("No has iniciado sesión");
            window.location.href = "login.html";
        }
    }
});