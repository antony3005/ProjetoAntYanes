import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDk4ecjc_nUqIDpwk8KcwvGs40j-NAnA0M",
  authDomain: "projetoantyanes.firebaseapp.com",
  databaseURL: "https://projetoantyanes-default-rtdb.firebaseio.com",
  projectId: "projetoantyanes",
  storageBucket: "projetoantyanes.firebasestorage.app",
  messagingSenderId: "269109133484",
  appId: "1:269109133484:web:fb6da20f3159d8598e1f09",
  measurementId: "G-GGM594RS8P"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

const distancia = ref(db, "Dispositivo/Sensor/Distancia");
const status = ref(db, "Dispositivo/Sensor/Status");

const email = document.getElementById ('email');
const senha = document.getElementById ('senha');

const nextbtn = document.getElementById ('next-btn');
const backbtn = document.getElementById ('back-btn');

const login = document.querySelector('.container');
const sistema = document.querySelector('.second-container');

const dist = document.getElementById('dt');
const situ = document.getElementById('st');

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

onValue(distancia, (snapshot) =>{
const valorDistancia = snapshot.val();

dist.innerText = valorDistancia + ' m';
});

onValue(status, (snapshot) => {
const statu = snapshot.val();


if(statu === false){
    situ.innerText = "Desligado";   
}else if(statu === true){
    situ.innerText = "Ligado"
}else{
    situ.innerText = "Indefeinido"
}
});