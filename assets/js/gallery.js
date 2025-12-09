document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".gallery-card");

  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const moveX = (x - rect.width / 2) / 20;
      const moveY = (y - rect.height / 2) / 20;

      card.style.transform = `translateZ(20px) rotateX(${moveY}deg) rotateY(${-moveX}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
  });
});
