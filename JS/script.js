

let menu=document.getElementById("menu-icon");
let navbar=document.querySelector(".navbar");
let m=document.querySelector(".main-body")
let count=0;
menu.addEventListener('click',()=>{
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('open');
    
    m.style.marginTop="200px";
    count++;
    if(count%2==0){
        m.style.marginTop="0px";

    }

    if(m.classList.contains("m-t")){
        m.classList.remove("m-t");
    }
    else{
        m.classList.add("m-t");
    }
});


GitHubCalendar(".calendar", "anagpure28");
GitHubCalendar(".calendar", "anagpure28", { responsive: true });


function resume(){
    window.open("https://drive.google.com/file/d/1GcYbXrLwf2yxK4e9sVYqd4Cc1itBnLP3/view?usp=sharing")
}

// let resume1 = document.getElementById("resume-button-1").addEventListener("click", NewTab)
// let resume2 = document.getElementById("resume-button-2").addEventListener("click", NewTab)

// function NewTab() {
//     window.open(
//         "https://drive.google.com/file/d/1rO5-y7PLzKe6JJVbWWduynCAHPkk_g1J/view?usp=drive_link",
//         "_blank"
//     );
// }