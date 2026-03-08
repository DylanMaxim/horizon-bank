// faq accordion functionality

function init() {
    var acc = document.getElementsByClassName("accordion");
    var i;
      
    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }
  }
  
  init();


// year for copyright in footer

window.addEventListener("load", () => {
    const yearElement = document.getElementById("year");
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear;
})

// Rotating logos loop followed from tutorial: https://www.youtube.com/watch?v=yZnmEwzHfZw 

const services = document.querySelector(".rotating-services-track").cloneNode(true);
document.querySelector(".rotating-services").appendChild(services);

// index.html scroll to top functionality 
$("a[href='#top']").click(function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });
 
// contact us submit button functionality

function submitMessage() {
    const formName = document.getElementById("name");
    const formNameValue = formName.value
    const email = document.getElementById("email");
    const emailValue = email.value
    const message = document.getElementById("message");
    const messageValue = message.value

    if (
        formNameValue === "" || messageValue === "" || emailValue === ""
    ) {
        return;
    } else {
        document.getElementById('submit-btn').addEventListener('click', 
            function(event) {
                event.preventDefault();
        });
        alert("Message Sent!");
    }  
}