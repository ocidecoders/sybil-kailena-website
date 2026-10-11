document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('gallery-container');

    // Inject gallery images from data.js
    if (galleryContainer && typeof galleryImages !== 'undefined') {
        galleryImages.forEach(img => {
            const imgElement = document.createElement('img');
            imgElement.src = img.url;
            imgElement.alt = img.title;
            imgElement.loading = 'lazy';
            imgElement.addEventListener('click', () => openLightbox(img.url));
            galleryContainer.appendChild(imgElement);
        });
    }

    // Simple Lightbox
    function openLightbox(url) {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed; inset: 0; background: rgba(0,0,0,0.92);
            display: flex; align-items: center; justify-content: center;
            z-index: 9999; cursor: pointer; padding: 20px;
        `;
        const image = document.createElement('img');
        image.src = url;
        image.style.cssText = `
            max-width: 95%; max-height: 90vh;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            border-radius: 4px;
        `;
        overlay.appendChild(image);
        overlay.addEventListener('click', () => overlay.remove());
        document.body.appendChild(overlay);
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
});
