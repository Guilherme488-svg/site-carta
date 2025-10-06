document.addEventListener('DOMContentLoaded', () => {
  // --- fotos fullscreen ---
  const photoThumbs = Array.from(document.querySelectorAll('.photo img'));

  function openModal(srcs, startIdx = 0) {
    let idx = startIdx;
    const modal = document.createElement('div');
    modal.className = 'fullscreen';

    const imgEl = document.createElement('img');
    imgEl.src = srcs[idx];
    modal.appendChild(imgEl);

    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-btn';
    closeBtn.textContent = 'Fechar';
    closeBtn.addEventListener('click', closeModal);
    modal.appendChild(closeBtn);

    if (srcs.length > 1) {
      const prev = document.createElement('button');
      prev.className = 'nav-btn nav-prev';
      prev.innerHTML = '&#10094;';
      prev.addEventListener('click', () => { idx = (idx - 1 + srcs.length) % srcs.length; update(); });

      const next = document.createElement('button');
      next.className = 'nav-btn nav-next';
      next.innerHTML = '&#10095;';
      next.addEventListener('click', () => { idx = (idx + 1) % srcs.length; update(); });

      modal.appendChild(prev);
      modal.appendChild(next);
    }

    function update() { imgEl.src = srcs[idx]; }
    function closeModal() { document.removeEventListener('keydown', onKey); modal.remove(); }
    function onKey(e) {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') { idx = (idx - 1 + srcs.length) % srcs.length; update(); }
      if (e.key === 'ArrowRight') { idx = (idx + 1) % srcs.length; update(); }
    }

    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.body.appendChild(modal);
    document.addEventListener('keydown', onKey);
  }

  photoThumbs.forEach((img, i) => {
    img.addEventListener('click', () => openModal(photoThumbs.map(x => x.src), i));
  });

  // --- carrossel ---
  const carousel = document.getElementById("carousel");
  if (carousel) {
    const images = carousel.querySelectorAll("img");
    let index = 0;
    const showImage = i => carousel.style.transform = `translateX(${-i * 100}%)`;
    const nextSlide = () => { index = (index + 1) % images.length; showImage(index); };
    const prevSlide = () => { index = (index - 1 + images.length) % images.length; showImage(index); };
    const nextBtn = document.querySelector(".carousel .next");
    const prevBtn = document.querySelector(".carousel .prev");
    if (nextBtn) nextBtn.addEventListener("click", () => { nextSlide(); resetAuto(); });
    if (prevBtn) prevBtn.addEventListener("click", () => { prevSlide(); resetAuto(); });
    let autoSlide = setInterval(nextSlide, 4000);
    const resetAuto = () => { clearInterval(autoSlide); autoSlide = setInterval(nextSlide, 4000); };
    showImage(index);
  }

  // --- animação ao rolar ---
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
});
