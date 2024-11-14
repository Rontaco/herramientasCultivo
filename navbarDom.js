fetch('media/calculadoras.json')
    .then(response => response.json())
    .then(data => {
        const navbar = document.querySelector('#navbar');

        // Generar el header dinámicamente
        const headerHTML = `
            <header>
                <nav class="navbar navbar-configuracion navbar-expand-sm navbar-dark">
                    <div class="container-fluid">
                        <a href="index.html">
                            <img class="navbar-brand img-fluid" id="logoHC" src="media/logoHC.svg" alt="Logo de herramientas de cultivo">
                        </a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="collapsibleNavbar">
                            <ul class="navbar-nav">
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle dropdown-herramientasdecultivo" href="#" role="button" data-bs-toggle="dropdown">
                                        HERRAMIENTAS DE CULTIVO
                                    </a>
                                    <ul class="dropdown-menu" id="navbarCalculadoras"></ul>
                                </li>
                                <li>
                                    <a class="nav-link a-posts" href="posts.html">POSTS</a>
                                </li>
                            </ul>
                        </div>
                        <button id="modoOscuroClaro">CAMBIAR A MODO OSCURO</button>
                    </div>
                </nav>
            </header>
        `;

        navbar.innerHTML = headerHTML;

        // Llenar el dropdown con los datos del JSON
        const dropdownMenu = document.querySelector('#navbarCalculadoras');
        data.forEach(calculadora => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.classList.add('dropdown-item');
            a.href = calculadora.link;
            a.textContent = calculadora.title;
            li.appendChild(a);
            dropdownMenu.appendChild(li);
        });

        // Agregar el manejo del modo oscuro después de insertar el header
        const modoOscuroClaro = document.querySelector("#modoOscuroClaro");
        const body = document.body;
        const modo = localStorage.getItem("modo");
        const imgLogo = document.querySelector("#logoHC");

        body.className = modo || "claro";
        if (modo === "oscuro") {
            modoOscuroClaro.innerText = "CAMBIAR A MODO CLARO";
            imgLogo.className = "logoHCOscuro";
        } else {
            modoOscuroClaro.innerText = "CAMBIAR A MODO OSCURO";
            imgLogo.className = "logoHCClaro";
        }

        modoOscuroClaro.addEventListener("click", () => {
            if (body.className === "oscuro") {
                body.className = "claro";
                modoOscuroClaro.innerText = "CAMBIAR A MODO OSCURO";
                imgLogo.className = "logoHCClaro";
            } else {
                body.className = "oscuro";
                modoOscuroClaro.innerText = "CAMBIAR A MODO CLARO";
                imgLogo.className = "logoHCOscuro";
            }
            localStorage.setItem("modo", body.className);
        });
    })
    .catch(error => console.error('Error al cargar el JSON:', error));
