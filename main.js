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
            initImmersiveFeatures();
        }
        enterBtn.addEventListener('click', () => {
            sessionStorage.setItem('ageConfirmed', 'true');
            ageGate.classList.add('hidden');
            exclusiveContent.classList.remove('hidden');
            loadExclusiveContent();
            initImmersiveFeatures();
        });
    }

    // ===== LOAD EXCLUSIVE CONTENT =====
    function loadExclusiveContent() {
        // ---- Tease Carousel ----
        const teaseCarousel = document.getElementById('teaseCarousel');
        if (teaseCarousel && typeof teaseImages !== 'undefined') {
            teaseImages.forEach((url, i) => {
                const card = document.createElement('div');
                card.className = 'tease-card';

                const img = document.createElement('img');
                img.src = url;
                img.alt = 'Tease ' + (i + 1);
                img.loading = 'lazy';

                const num = document.createElement('span');
                num.className = 'tease-number';
                num.textContent = String(i + 1).padStart(2, '0');

                const overlay = document.createElement('div');
                overlay.className = 'tease-overlay';
                const overlayText = document.createElement('span');
                overlayText.textContent = 'Tap to view';
                overlay.appendChild(overlayText);

                card.appendChild(img);
                card.appendChild(num);
                card.appendChild(overlay);

                card.addEventListener('click', () => openLightbox(url));
                teaseCarousel.appendChild(card);
            });

            const prevBtn = document.querySelector('.tease-prev');
            const nextBtn = document.querySelector('.tease-next');
            if (prevBtn) prevBtn.addEventListener('click', () => teaseCarousel.scrollBy({ left: -320, behavior: 'smooth' }));
            if (nextBtn) nextBtn.addEventListener('click', () => teaseCarousel.scrollBy({ left: 320, behavior: 'smooth' }));
        }

        // ---- Exclusive Images ----
        const exGallery = document.getElementById('exclusiveGallery');
        if (exGallery && typeof exclusiveImages !== 'undefined') {
            exclusiveImages.forEach(img => {
                const imgElement = document.createElement('img');
                imgElement.src = img.url;
                imgElement.alt = 'Bold ' + img.id;
                imgElement.loading = 'lazy';
                imgElement.addEventListener('click', () => openLightbox(img.url));
                exGallery.appendChild(imgElement);
            });
        }

        // ---- Videos (Grouped) ----
        const exVideosContainer = document.getElementById('exclusiveVideos');
        if (exVideosContainer && typeof exclusiveVideoGroups !== 'undefined') {
            exclusiveVideoGroups.forEach(group => {
                if (!group.videos || group.videos.length === 0) return;

                const groupSection = document.createElement('div');
                groupSection.className = 'video-group-section reveal';

                const groupTitle = document.createElement('h3');
                groupTitle.className = 'video-group-title';
                groupTitle.textContent = group.groupTitle;
                groupSection.appendChild(groupTitle);

                const videoGrid = document.createElement('div');
                videoGrid.className = 'video-grid';

                group.videos.forEach(vid => {
                    const videoItem = document.createElement('div');
                    videoItem.className = 'video-item';

                    const videoContainer = document.createElement('div');
                    videoContainer.className = 'video-container';

                    const thumb = document.createElement('div');
                    thumb.style.cssText = `
                        position: absolute; inset: 0;
                        background-size: cover; background-position: center;
                        background-color: #1a1a1a;
                        display: flex; align-items: center; justify-content: center;
                    `;
                    if (vid.thumb) {
                        thumb.style.backgroundImage = `url('${vid.thumb}')`;
                    }

                    const playIcon = document.createElement('div');
                    playIcon.className = 'video-play-icon';

                    videoContainer.appendChild(thumb);
                    videoContainer.appendChild(playIcon);
                    videoContainer.addEventListener('click', () => openVideoLightbox(vid.embed, vid.title));

                    videoItem.appendChild(videoContainer);

                    if (vid.title && vid.title.trim() !== '') {
                        const titleEl = document.createElement('p');
                        titleEl.textContent = vid.title;
                        videoItem.appendChild(titleEl);
                    }

                    videoGrid.appendChild(videoItem);
                });

                groupSection.appendChild(videoGrid);
                exVideosContainer.appendChild(groupSection);
            });
        }
    }

    // ===== IMMERSIVE FEATURES =====
    function initImmersiveFeatures() {
        // Scroll Reveal
        const reveals = document.querySelectorAll('.reveal');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        reveals.forEach(el => revealObserver.observe(el));

        // Animated Counters
        const counters = document.querySelectorAll('.stat-number');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-target'), 10);
                    animateCounter(el, target);
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        counters.forEach(el => counterObserver.observe(el));

        // Active Side Dot
        const sections = document.querySelectorAll('section[id]');
        const sideDots = document.querySelectorAll('.side-dot');
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(sec => {
                const top = sec.offsetTop - 200;
                if (window.scrollY >= top) current = sec.getAttribute('id');
            });
            sideDots.forEach(dot => {
                dot.classList.remove('active');
                if (dot.getAttribute('href') === '#' + current) dot.classList.add('active');
            });
        });
    }

    function animateCounter(el, target) {
        const duration = 1800;
        const start = performance.now();
        function step(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target;
        }
        requestAnimationFrame(step);
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
