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
//Funcion para renderizar Componentes Navbar
const renderNavbar = (data) => {
  let body = "";
  for (var i = 0; i < data.length; i++) {
    body += ` <li class="nav-menu-item">
    <a href="#" class="nav-menu-link nav-link" key=${data[i].i}>${data[i].name}</a>
  </li>`;
  }
  document.getElementById("navbar").innerHTML = body;
};

//Funcion para renderizar Cards en Home
const mostrarData = (data) => {
  let body = "";
  // if(!data[0].name)
  console.log(data);
  if (data.data.length == 0) {
    body =
      "<div class='err'><h1>NO HAY DATOS</h1><img class='cat' src='cat.png'/></div>";
    return (document.getElementById("data").innerHTML = body);
  }
  for (var i = 0; i < data.data.length; i++) {
    body += `<div class="card">
    <div class="card-image">
      <img
        src="${data.data[i].url_image}"
        alt="..."
      />
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
};

//Obtener productos fetch inicial

let products = [];
const getResponse = async () => {
  //FETCH CATEGORIAS
  let category = "http://localhost:8080/api/category/";
  const res = await fetch(category, {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error(`HTTP error! Estado : ${res.status}`);
  }
  const { data } = await res.json();
  renderNavbar(data);

  // FETCH PRODUCTOS
  let url = "http://localhost:8080/api/products/";
  const response = await fetch(url, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error(`HTTP error! Estado : ${response.status}`);
  }
  products = await response.json();
  mostrarData(products);
};
getResponse();

const busqueda = async () => {
  let url = `http://localhost:8080/api/products/${
    document.getElementById("busqueda").value
  }`;
  const response = await fetch(url, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error(`HTTP error! Estado : ${response.status}`);
  }
  products = await response.json();
  mostrarData(products);
};
