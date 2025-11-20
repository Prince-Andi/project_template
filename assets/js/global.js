// AUTO SET ACTIVE SESUAI URL
const currentPage = location.pathname.split("/").pop();
const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

// HAMBURGER RESPONSIVE
const toggle = document.getElementById("navToggle");
const navMenu = document.querySelector(".nav-menu");

toggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

// ================= LOAD FOOTER GLOBAL =================
fetch("footer.html")
  .then(res => res.text())
  .then(data => {
    document.body.insertAdjacentHTML("beforeend", data);
  });
