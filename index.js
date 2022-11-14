const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("nav-menu_visible");

  if (navMenu.classList.contains("nav-menu_visible")) {
    navToggle.setAttribute("aria-label", "Cerrar menú");
  } else {
    navToggle.setAttribute("aria-label", "Abrir menú");
  }
});

const mostrarData = (data) => {
  let body = "";
  for (var i = 0; i < data.data.length; i++) {
    console.log(data.data);
    body += `<div class="card">
    <div class="card-image">
      <img
        src="${data.data[i].url_image}"
        alt="..."
      />
      <i class="bx bx-star"></i>
    </div>
    <div class="card-content">
      <h3>${data.data[i].name}</h3>
      <p>Descripcion del producto</p>
      <h3>$${data.data[i].price}</h3>
      <button class="add-to-cart">Comprar</button>
    </div>
  </div>`;
  }
  document.getElementById("data").innerHTML = body;
  console.log(body);
};

//Obtener productos fetch inicial

let product = {};
const getResponse = async () => {
  let url = "http://localhost:8080/api/products/";

  // const response = await fetch(url, {
  //   method: "GET",
  // });
  // if (!response.ok) {
  //   throw new Error(`HTTP error! Estado : ${response.status}`);
  // }
  // product = await response.json();
  fetch(url)
    .then((response) => response.json())
    .then((data) => mostrarData(data))
    .catch((error) => console.log(error));
};
getResponse();
