document.addEventListener('DOMContentLoaded', () => {

    // ===== HERO SLIDESHOW =====
    const slideshowContainer = document.getElementById('heroSlideshow');
    if (slideshowContainer && typeof heroImages !== 'undefined' && heroImages.length > 0) {
        heroImages.forEach((url, i) => {
            const slide = document.createElement('div');
            slide.className = 'slideshow-slide' + (i === 0 ? ' active' : '');
            slide.style.backgroundImage = `url('${url}')`;
            slideshowContainer.appendChild(slide);
        });
        const slides = slideshowContainer.querySelectorAll('.slideshow-slide');
        let currentIndex = 0;
        setInterval(() => {
            slides[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % slides.length;
            slides[currentIndex].classList.add('active');
        }, 5000);
    }

    // ===== FEATURED HIGHLIGHTS =====
    const featuredGrid = document.getElementById('featuredGrid');
    if (featuredGrid && typeof featuredImages !== 'undefined') {
        featuredImages.forEach((url, i) => {
            const img = document.createElement('img');
            img.src = url;
            img.alt = 'Featured ' + (i + 1);
            img.loading = 'lazy';
            img.addEventListener('click', () => openLightbox(url));
            featuredGrid.appendChild(img);
        });
    }

    // ===== FEED GRID =====
    const feedGrid = document.getElementById('feedGrid');
    if (feedGrid && typeof feedImages !== 'undefined') {
        feedImages.forEach((url, i) => {
            const img = document.createElement('img');
            img.src = url;
            img.alt = 'Feed ' + (i + 1);
            img.loading = 'lazy';
            img.style.animationDelay = (i * 0.06) + 's';
            img.addEventListener('click', () => openLightbox(url));
            feedGrid.appendChild(img);
        });
    }

    // ===== LIGHTBOX =====
    function openLightbox(url) {
        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        const closeBtn = document.createElement('span');
        closeBtn.className = 'lightbox-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', (e) => { e.stopPropagation(); overlay.remove(); });
        const image = document.createElement('img');
        image.src = url;
        image.className = 'lightbox-image';
        overlay.addEventListener('click', () => overlay.remove());
        overlay.appendChild(closeBtn);
        overlay.appendChild(image);
        document.body.appendChild(overlay);
    }

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

});
