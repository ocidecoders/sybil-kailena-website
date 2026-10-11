document.addEventListener('DOMContentLoaded', () => {

    // ===== HOMEPAGE GALLERY =====
    const galleryContainer = document.getElementById('gallery-container');
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

    // ===== AGE GATE (OnlySybilians) =====
    const ageGate = document.getElementById('ageGate');
    const exclusiveContent = document.getElementById('exclusiveContent');
    const enterBtn = document.getElementById('enterBtn');

    if (ageGate && exclusiveContent && enterBtn) {
        if (sessionStorage.getItem('ageConfirmed') === 'true') {
            ageGate.classList.add('hidden');
            exclusiveContent.classList.remove('hidden');
            loadExclusiveContent();
        }

        enterBtn.addEventListener('click', () => {
            sessionStorage.setItem('ageConfirmed', 'true');
            ageGate.classList.add('hidden');
            exclusiveContent.classList.remove('hidden');
            loadExclusiveContent();
        });
    }

    // ===== LOAD EXCLUSIVE CONTENT =====
    function loadExclusiveContent() {
        const exGallery = document.getElementById('exclusiveGallery');
        if (exGallery && typeof exclusiveImages !== 'undefined') {
            exclusiveImages.forEach(img => {
                const imgElement = document.createElement('img');
                imgElement.src = img.url;
                imgElement.alt = img.title;
                imgElement.loading = 'lazy';
                imgElement.addEventListener('click', () => openLightbox(img.url));
                exGallery.appendChild(imgElement);
            });
        }

        const exVideos = document.getElementById('exclusiveVideos');
        if (exVideos && typeof exclusiveVideos !== 'undefined') {
            exclusiveVideos.forEach(vid => {
                const videoItem = document.createElement('div');
                videoItem.className = 'video-item';
                videoItem.innerHTML = `
                    <div class="video-container">
                        <iframe src="${vid.embed}" allowfullscreen loading="lazy"></iframe>
                    </div>
                    <p>${vid.title}</p>
                `;
                exVideos.appendChild(videoItem);
            });
        }
    }

    // ===== LIGHTBOX WITH CLOSE BUTTON =====
    function openLightbox(url) {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';

        // Create close button (Cross)
        const closeBtn = document.createElement('span');
        closeBtn.className = 'lightbox-close';
        closeBtn.innerHTML = 'X'; // This is the X symbol
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent clicking background to close
            overlay.remove();
        });

        // Create image
        const image = document.createElement('img');
        image.src = url;
        image.className = 'lightbox-image';

        // Click on background also closes
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
