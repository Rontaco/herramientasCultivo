fetch('media/calculadoras.json')
    .then(response => response.json())  // Convierte la respuesta en formato JSON
    .then(data => {
        // Obtén el elemento de la lista de dropdown del navbar
        const dropdownMenu = document.querySelector('.dropdown-menu'); // o usa getElementById si es necesario

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
