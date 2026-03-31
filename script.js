const email = document.getElementById ('email');
const senha = document.getElementById ('senha');

const nextbtn = document.getElementById ('next-btn');
const backbtn = document.getElementById ('back-btn');

const login = document.querySelector('.container');
const sistema = document.querySelector('.second-container');

function setupEvents(){
    nextbtn.addEventListener("click", (e) => {
        e.preventDefault();

        if (email.value === "admin@gmail.com" && senha.value === "123"){
            login.style.display = "none";
            sistema.style.display = "block";
        }else{
            alert("Email ou senha incorretos");
        }
    });

    backbtn.addEventListener("click", (e) =>{
        login.style.display = "block";
        sistema.style.display = "none";
    });
}

setupEvents();