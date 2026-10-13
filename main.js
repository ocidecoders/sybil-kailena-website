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

    // ===== FEED — Full-screen vertical scroller =====
    const feedScroller = document.getElementById('feedScroller');
    const feedProgress = document.getElementById('feedProgress');
    if (feedScroller && typeof feedImages !== 'undefined' && feedImages.length > 0) {
        feedImages.forEach((url, i) => {
            const item = document.createElement('div');
            item.className = 'feed-item';
            if (i === 0) item.classList.add('visible');

            const img = document.createElement('img');
            img.src = url;
            img.alt = 'Feel Sybil ' + (i + 1);
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

        // IntersectionObserver — reveal current item
        const items = feedScroller.querySelectorAll('.feed-item');
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const visible = entry.isIntersecting && entry.intersectionRatio > 0.5;
                entry.target.classList.toggle('visible', visible);
            });
        }, { threshold: [0, 0.5, 1], root: feedScroller });
        items.forEach(item => obs.observe(item));

        // Progress bar
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
            const href = this.getAttribute('href');
            if (href.length < 2) return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});
