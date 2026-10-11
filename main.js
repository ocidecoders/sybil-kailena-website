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

    // ===== HELPER: YouTube ID extract =====
    function getYouTubeId(embedUrl) {
        if (!embedUrl) return null;
        const patterns = [
            /youtube\.com\/embed\/([^?&/]+)/,
            /youtube\.com\/watch\?v=([^?&/]+)/,
            /youtu\.be\/([^?&/]+)/
        ];
        for (let p of patterns) {
            const m = embedUrl.match(p);
            if (m && m[1]) return m[1];
        }
        return null;
    }

    // ===== LOAD EXCLUSIVE CONTENT =====
    function loadExclusiveContent() {
        // Images
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

        // Videos
        const exVideos = document.getElementById('exclusiveVideos');
        if (exVideos && typeof exclusiveVideos !== 'undefined') {
            exclusiveVideos.forEach(vid => {
                const ytId = getYouTubeId(vid.embed);

                const videoItem = document.createElement('div');
                videoItem.className = 'video-item';

                const videoContainer = document.createElement('div');
                videoContainer.className = 'video-container';

                // Thumbnail wrapper
                const thumb = document.createElement('div');
                thumb.style.cssText = `
                    position: absolute; inset: 0;
                    background-size: cover; background-position: center;
                    background-color: #1a1a1a;
                    display: flex; align-items: center; justify-content: center;
                `;
                if (ytId) {
                    thumb.style.backgroundImage = `url('https://img.youtube.com/vi/${ytId}/maxresdefault.jpg')`;
                }

                // Play icon
                const playIcon = document.createElement('div');
                playIcon.className = 'video-play-icon';

                videoContainer.appendChild(thumb);
                videoContainer.appendChild(playIcon);

                // Click => modal
                videoContainer.addEventListener('click', () => openVideoLightbox(vid.embed, vid.title));

                videoItem.appendChild(videoContainer);

                // Title
                if (vid.title && vid.title.trim() !== '') {
                    const titleEl = document.createElement('p');
                    titleEl.textContent = vid.title;
                    videoItem.appendChild(titleEl);
                }

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
        closeBtn.addEventListener('click', (e) => { e.stopPropagation(); overlay.remove(); });

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
        const overlay = document.createElement('div');
        overlay.className = 'video-lightbox-overlay';

        const wrapper = document.createElement('div');
        wrapper.className = 'video-lightbox-wrapper';

        const closeBtn = document.createElement('span');
        closeBtn.className = 'video-lightbox-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            overlay.remove();
            document.body.style.overflow = '';
        });

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
        wrapper.appendChild(closeBtn);
        wrapper.appendChild(container);

        if (videoTitle && videoTitle.trim() !== '') {
            const titleEl = document.createElement('div');
            titleEl.className = 'video-lightbox-title';
            titleEl.textContent = videoTitle;
            wrapper.appendChild(titleEl);
        }

        overlay.appendChild(wrapper);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
                document.body.style.overflow = '';
            }
        });

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
