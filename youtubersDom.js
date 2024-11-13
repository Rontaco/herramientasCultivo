const API_KEY = 'AIzaSyBwm0BPF_3tfngK9cmduPCARz1wz2alDYk';
const CAROUSEL_ID = 'carouselExampleDark';
const carouselInner = document.querySelector(`#${CAROUSEL_ID} .carousel-inner`);
const carouselIndicators = document.querySelector(`#${CAROUSEL_ID} .carousel-indicators`);

async function fetchYoutubers() {
    try {
        const response = await fetch('media/youtubers.json');
        const youtubers = await response.json();

        youtubers.forEach(async (youtuber, index) => {
            const channelData = await fetchChannelData(youtuber.channelId);
            if (channelData) {
                addYoutuberToCarousel(channelData, youtuber, index);
            }
        });
    } catch (error) {
        console.error('Error al cargar los youtubers:', error);
    }
}

async function fetchChannelData(channelId) {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.items ? data.items[0] : null;
}

function addYoutuberToCarousel(channelData, youtuber, index) {
    const { title, thumbnails } = channelData.snippet;

    // Crear el indicador
    const indicator = document.createElement('button');
    indicator.type = 'button';
    indicator.dataset.bsTarget = `#${CAROUSEL_ID}`;
    indicator.dataset.bsSlideTo = index;
    indicator.ariaLabel = `Slide ${index + 1}`;
    if (index === 0) indicator.classList.add('active');

    carouselIndicators.appendChild(indicator);

    // Crear el slide
    const slide = document.createElement('div');
    slide.classList.add('carousel-item');
    if (index === 0) slide.classList.add('active');

    slide.innerHTML = `
        <a href="${youtuber.link}" target="_blank">
            <img src="${thumbnails.high.url}" class="d-block w-100" alt="${title}">
        </a>
        <div class="carousel-caption d-none d-md-block">
            <h5>${title}</h5>
            <p>${youtuber.description}</p>
        </div>
    `;

    carouselInner.appendChild(slide);
}

document.addEventListener('DOMContentLoaded', fetchYoutubers);
