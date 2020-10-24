//variables
const formulario = document.querySelector("#formulario");
const listaHaceres = document.querySelector("#lista-haceres");
let planes = [];

//eventos
eventListener();
function eventListener() {
  //click a agregar a la lista
  formulario.addEventListener("submit", agregarLista);

  //get items localstorage
  document.addEventListener("DOMContentLoaded", () => {
    planes = JSON.parse(localStorage.getItem("plan")) || [];
    mostrarHTML();
  });
}

//funciones
function agregarLista(e) {
  e.preventDefault();

  const plan = document.querySelector("#plan").value;
  if (plan === "") {
    mensajeVacio("POR FAVOR, AGREGAR UN VALOR A LA LISTA");
    return;
  }

  const planObj = {
    id: Date.now(),
    texto: plan,
  };

  planes = [...planes, planObj];

  mostrarHTML();

  formulario.reset();
}

function mensajeVacio(msg) {
  const mensaje = document.createElement("p");
  mensaje.textContent = msg;
  mensaje.classList.add("error");

  const content = document.querySelector("#content-1");
  content.appendChild(mensaje);

  setTimeout(() => {
    mensaje.remove();
  }, 2000);
}

//RECORRER ARRAY Y MOSTRAR EN EL HTML LISTA
function mostrarHTML() {
  limpiarHTML();
  if (planes.length > 0) {
    planes.forEach((plan) => {
      const lista = document.createElement("li");
      lista.textContent = plan.texto;
      lista.classList.add("lista");
      listaHaceres.appendChild(lista);

      const btnBorrar = document.createElement("a");
      btnBorrar.textContent = "X";
      btnBorrar.classList.add("borrar-plan");
      lista.appendChild(btnBorrar);

      btnBorrar.onclick = () => {
        eliminarPlan(plan.id);
      };
    });
  }
  sincronizarLocalStorage();
}

function limpiarHTML() {
  while (listaHaceres.firstChild) {
    listaHaceres.removeChild(listaHaceres.firstChild);
  }
}

function eliminarPlan(id) {
  planes = planes.filter((plan) => plan.id !== id);
  mostrarHTML();
}

//set items en el localstorage
function sincronizarLocalStorage() {
  localStorage.setItem("plan", JSON.stringify(planes));
}
