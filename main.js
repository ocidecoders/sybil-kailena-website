document.addEventListener('DOMContentLoaded', () => {

    // ===== SMART ALT TEXT POOLS (SEO Optimized) =====
    const altPoolHero = [
        'Sybil Kailena portrait photography',
        'Sybil Kailena editorial fashion',
        'Sybil Kailena model portrait',
        'Sybil Kailena ukrainian model',
        'Sybil Kailena glamour photography',
        'Sybil Kailena fashion photoshoot'
    ];
    const altPoolFeatured = [
        'Sybil Kailena photoshoot',
        'Sybil Kailena portrait photography',
        'Sybil Kailena editorial fashion',
        'Sybil Kailena lifestyle photography',
        'Sybil Kailena model portrait',
        'Sybil Kailena ukrainian model',
        'Sybil Kailena artist photograph'
    ];
    const altPoolFeed = [
        'Sybil Kailena photoshoot',
        'Sybil Kailena portrait photography',
        'Sybil Kailena editorial fashion',
        'Sybil Kailena lifestyle photography',
        'Sybil Kailena model portrait',
        'Sybil Kailena ukrainian model',
        'Sybil Kailena fashion photography',
        'Sybil Kailena artistic portrait',
        'Sybil Kailena natural light portrait'
    ];

    // ===== HERO SLIDESHOW =====
    const slideshowContainer = document.getElementById('heroSlideshow');
    if (slideshowContainer && typeof heroImages !== 'undefined' && heroImages.length > 0) {
        heroImages.forEach((url, i) => {
            const slide = document.createElement('div');
            slide.className = 'slideshow-slide' + (i === 0 ? ' active' : '');
            slide.style.backgroundImage = `url('${url}')`;
            slide.setAttribute('role', 'img');
            slide.setAttribute('aria-label', altPoolHero[i % altPoolHero.length]);
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

    // ===== INTRO IMAGE (static HTML already exists, just ensure alt) =====
    const introImg = document.querySelector('.intro-image-wrap img');
    if (introImg && (!introImg.alt || introImg.alt === 'Sybil Kailena Portrait')) {
        introImg.alt = 'Sybil Kailena portrait photography — Ukrainian model';
    }

    // ===== FEATURED HIGHLIGHTS =====
    const featuredGrid = document.getElementById('featuredGrid');
    if (featuredGrid && typeof featuredImages !== 'undefined') {
        featuredImages.forEach((url, i) => {
            const img = document.createElement('img');
            img.src = url;
            img.alt = altPoolFeatured[i % altPoolFeatured.length];
            img.loading = 'lazy';
            img.addEventListener('click', () => openLightbox(url, img.alt));
            featuredGrid.appendChild(img);
        });
    }

    // ===== FEED GRID =====
    const feedGrid = document.getElementById('feedGrid');
    if (feedGrid && typeof feedImages !== 'undefined') {
        feedImages.forEach((url, i) => {
            const img = document.createElement('img');
            img.src = url;
            img.alt = altPoolFeed[i % altPoolFeed.length];
            img.loading = 'lazy';
            img.style.animationDelay = (i * 0.06) + 's';
            img.addEventListener('click', () => openLightbox(url, img.alt));
            feedGrid.appendChild(img);
        });
    }

    // ===== FEED SCROLLER (OnlySybilians — actually feed.html) =====
    const feedScroller = document.getElementById('feedScroller');
    const feedProgress = document.getElementById('feedProgress');
    if (feedScroller && typeof feedImages !== 'undefined' && feedImages.length > 0) {
        feedImages.forEach((url, i) => {
            const item = document.createElement('div');
            item.className = 'feed-item';
            if (i === 0) item.classList.add('visible');

            const img = document.createElement('img');
            img.src = url;
            img.alt = altPoolFeed[i % altPoolFeed.length];
            img.loading = i < 2 ? 'eager' : 'lazy';

            const counter = document.createElement('span');
            counter.className = 'feed-count';
            counter.textContent = String(i + 1).padStart(2, '0') + ' / ' + String(feedImages.length).padStart(2, '0');

            item.appendChild(img);
            item.appendChild(counter);

            if (i === 0) {
                const hint = document.createElement('div');
                hint.className = 'feed-hint';
                hint.textContent = 'Scroll to explore';
                item.appendChild(hint);
            }

            feedScroller.appendChild(item);
        });

        const items = feedScroller.querySelectorAll('.feed-item');
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const visible = entry.isIntersecting && entry.intersectionRatio > 0.5;
                entry.target.classList.toggle('visible', visible);
            });
        }, { threshold: [0, 0.5, 1], root: feedScroller });
        items.forEach(item => obs.observe(item));

        if (feedProgress) {
            feedScroller.addEventListener('scroll', () => {
                const scrollTop = feedScroller.scrollTop;
                const total = feedScroller.scrollHeight - feedScroller.clientHeight;
                const pct = total > 0 ? (scrollTop / total) * 100 : 0;
                feedProgress.style.width = pct + '%';
            }, { passive: true });
        }
    }

    // ===== LIGHTBOX =====
    function openLightbox(url, altText) {
        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        const closeBtn = document.createElement('span');
        closeBtn.className = 'lightbox-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', (e) => { e.stopPropagation(); overlay.remove(); });
        const image = document.createElement('img');
        image.src = url;
        image.alt = altText || 'Sybil Kailena';
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
