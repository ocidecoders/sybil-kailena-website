document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('gallery');
    if (galleryContainer && typeof galleryImages !== 'undefined') {
        galleryImages.forEach(img => {
            const imgElement = document.createElement('img');
            imgElement.src = img.url;
            imgElement.alt = img.title;
            galleryContainer.appendChild(imgElement);
        });
    }
});
