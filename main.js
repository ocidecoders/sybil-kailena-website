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

    // ===== AGE GATE =====
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
        // Exclusive Images
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

        // Exclusive Videos (with click-to-open-modal)
        const exVideos = document.getElementById('exclusiveVideos');
        if (exVideos && typeof exclusiveVideos !== 'undefined') {
            exclusiveVideos.forEach(vid => {
                const videoItem = document.createElement('div');
                videoItem.className = 'video-item';

                const videoContainer = document.createElement('div');
                videoContainer.className = 'video-container';

                // Create a thumbnail-style placeholder (no autoplay, no direct iframe)
                const thumbnail = document.createElement('div');
                thumbnail.style.cssText = `
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                `;

                const playIcon = document.createElement('div');
                playIcon.className = 'video-play-icon';

                videoContainer.appendChild(thumbnail);
                videoContainer.appendChild(playIcon);

                // Click to open video modal
                videoContainer.addEventListener('click', () => openVideoLightbox(vid.embed, vid.title));

                const title = document.createElement('p');
                title.textContent = vid.title;

                videoItem.appendChild(videoContainer);
                videoItem.appendChild(title);
                exVideos.appendChild(videoItem);
            });
        }
    }

    // ===== IMAGE LIGHTBOX =====
    function openLightbox(url) {
        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';

        const closeBtn = document.createElement('span');
        closeBtn.className = 'lightbox-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            overlay.remove();
        });

        const image = document.createElement('img');
        image.src = url;
        image.className = 'lightbox-image';

        overlay.addEventListener('click', () => overlay.remove());
        overlay.appendChild(closeBtn);
        overlay.appendChild(image);
        document.body.appendChild(overlay);
    }

    // ===== VIDEO LIGHTBOX =====
    function openVideoLightbox(embedUrl, videoTitle) {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'video-lightbox-overlay';

        // Wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'video-lightbox-wrapper';

        // Close button (X)
        const closeBtn = document.createElement('span');
        closeBtn.className = 'video-lightbox-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            overlay.remove();
            document.body.style.overflow = '';
        });

        // Video container
        const container = document.createElement('div');
        container.className = 'video-lightbox-container';

        const iframe = document.createElement('iframe');
        iframe.src = embedUrl;
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', 'true');
        iframe.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture; fullscreen; clipboard-write');
        iframe.setAttribute('referrerpolicy', 'no-referrer');
        iframe.setAttribute('scrolling', 'no');
        iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-presentation allow-forms allow-popups');

        container.appendChild(iframe);

        // Title
        const titleEl = document.createElement('div');
        titleEl.className = 'video-lightbox-title';
        titleEl.textContent = videoTitle;

        wrapper.appendChild(closeBtn);
        wrapper.appendChild(container);
        wrapper.appendChild(titleEl);

        overlay.appendChild(wrapper);

        // Close on background click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
                document.body.style.overflow = '';
            }
        });

        // Prevent body scroll while modal open
        document.body.style.overflow = 'hidden';

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
