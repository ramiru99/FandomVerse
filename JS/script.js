document.addEventListener("DOMContentLoaded", () => {
  
    // --- 1. HERO SLIDER LOGIC ---
    const slides = document.querySelectorAll(".slide");
    if(slides.length > 0) {
        let current = 0;
        setInterval(() => {
          slides[current].classList.remove("active");
          current = (current + 1) % slides.length;
          slides[current].classList.add("active");
        }, 4000);
    }
  
    // --- 2. NEW ARRIVALS SLIDER LOGIC ---
    const container = document.getElementById('new-arrivals-container');
    
    if (container) {
        const products = JSON.parse(localStorage.getItem('fandomProducts')) || [];
  
        if (products.length === 0) {
            container.innerHTML = '<p style="text-align:center; width:100vw; color:#555;">No new items added yet.</p>';
        } else {
            // A. Render Cards
            products.forEach(product => {
                const card = document.createElement('div');
                card.className = 'collectioncard';
                
                const imgPath = `RSC/IMGS/${product.image}`;
  
                card.innerHTML = `
                    <img src="${imgPath}" alt="${product.name}" onerror="this.src='RSC/IMGS/LOGO.png'">
                    <div class="collection-overlay"></div>
                    <div class="collection-content">
                        <h3 style="position: static; color: white; background: transparent; text-shadow: 0 2px 4px rgba(0,0,0,0.7); margin-bottom: 5px;">
                            ${product.name}
                        </h3>
                        <p style="color: white; background-color: transparent !important; font-weight: bold; font-size: 1.2rem; text-shadow: 0 2px 4px rgba(0,0,0,0.7);">
                            LKR ${product.price}
                        </p>
                        <a href="product_detail.html?id=${product.id}" class="explore-btn" style="margin-top: 15px;">View Details</a>
                    </div>
                `;
                container.appendChild(card);
            });

            // B. Initialize Slider (Only if > 4 items)
            if (products.length > 4) {
                startInfiniteSlider(container);
            }
        }
    }
});

function startInfiniteSlider(track) {
    // Speed: 3000ms = 3 seconds
    setInterval(() => {
        const firstCard = track.firstElementChild;
        const cardWidth = firstCard.offsetWidth + 20; // Width + Gap (20px from CSS)

        // 1. Slide the track to the left
        track.style.transition = "transform 0.5s ease-in-out";
        track.style.transform = `translateX(-${cardWidth}px)`;

        // 2. After animation ends, physically move the first item to the end
        //    and reset the track position instantly.
        setTimeout(() => {
            track.style.transition = "none"; // Stop animation for the reset
            track.appendChild(firstCard);    // Move item to back of line
            track.style.transform = "translateX(0)"; // Reset position
        }, 500); // This 500ms matches the transition time above

    }, 3000);
}