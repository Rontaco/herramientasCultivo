fetch('media/calculadoras.json')
    .then(response => response.json())  // Convierte la respuesta en formato JSON
    .then(data => {
        // Obtén el elemento donde se insertará el header (usando el id navbar)
        const navbar = document.querySelector('#navbar');

        // Crear el HTML del header
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
                                    <ul class="dropdown-menu" id="navbarCalculadoras"> <!-- Se agregarán las calculadoras aquí -->
                                        <!-- Los elementos <li> se agregarán dinámicamente con JavaScript -->
                                    </ul>
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

        // Inserta el HTML del header dentro del contenedor con id navbar
        navbar.innerHTML = headerHTML;

        // Después de insertar el header, llenamos el dropdown con las calculadoras
        const dropdownMenu = document.querySelector('#navbarCalculadoras'); // Ahora podemos usar #navbarCalculadoras ya que el header está insertado

        // Itera sobre cada calculadora y agrega un enlace al dropdown
        data.forEach(calculadora => {
            const li = document.createElement('li');  // Crea un nuevo <li> para cada calculadora
            const a = document.createElement('a');   // Crea un nuevo <a> para el enlace
            a.classList.add('dropdown-item');         // Añade la clase de Bootstrap para el estilo del enlace
            a.href = calculadora.link;               // Asigna el enlace que viene del JSON
            a.textContent = calculadora.title;       // Asigna el nombre de la calculadora como texto del enlace

            li.appendChild(a);                       // Añade el <a> al <li>
            dropdownMenu.appendChild(li);            // Añade el <li> al <ul> del menú desplegable
        });
    })
    .catch(error => console.error('Error al cargar el JSON:', error));  // Manejo de errores
