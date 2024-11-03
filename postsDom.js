fetch('media/posts.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(posts => {
        // Selecciona el contenedor en el HTML donde se mostrarán los posts
        const postsContainer = document.getElementById("postsContainer");

        // Itera sobre el array de posts y genera el HTML para cada uno
        posts.forEach((post) => {
            // Crea el contenedor para el post
            const postElement = document.createElement("div");
            postElement.classList.add("post", "col-md-4", "mb-3");

            // Genera el contenido del post
            postElement.innerHTML = `
                <div class="card">
                    <a href="${post.link}" target="_blank">
                        <img src="${post.imageUrl}" class="card-img-top" alt="${post.title}">
                    </a>
                    <div class="card-body">
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">Fecha: ${post.date}</p>
                    </div>
                </div>
            `;

            // Agrega el post al contenedor principal en el HTML
            postsContainer.appendChild(postElement);
        });
    })
    .catch(error => {
        console.error('Error fetching the posts:', error);
    });
