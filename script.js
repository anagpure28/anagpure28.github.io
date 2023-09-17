const header = document.querySelector("header");
window.addEventListener("scroll", function() {
    header.classList.toggle("sticky", window.scrollY > 100)
})


// *=============================== github calender ==================================
// GitHubCalendar(".calendar", "anagpure28");

// // or enable responsive functionality:
// GitHubCalendar(".calendar", "anagpure28", { responsive: true });