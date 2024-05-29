import { cars } from "./cars.js";

let search = document.querySelector(".search-box");

document.querySelector("#search-icon").onclick = () => {
  search.classList.toggle("active");
  menu.classList.remove("active");
};

let menu = document.querySelector(".navbar");

document.querySelector("#menu-icon").onclick = () => {
  menu.classList.toggle("active");
  search.classList.remove("active");
};
// SCROLL
window.onscroll = () => {
  menu.classList.remove("active");
  search.classList.remove("active");
};

let header = document.querySelector("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("shadow", window.scrollY > 0);
});

function getCarsList(cars) {
  let divParent = document.getElementById("carsList");

  cars.forEach((car) => {
    let div = document.createElement("DIV");
    div.classList.add("box");

    let img = document.createElement("IMG");
    img.src = `./assets/img/${car.img}`;

    let h2 = document.createElement("h2");
    h2.innerText = `${car.cost} zł.`;

    let button = document.createElement("button");
    button.innerText = `${car.brand} ${car.name}`;
    button.setAttribute("data-id", car.id);

    div.appendChild(img);
    div.appendChild(h2);
    div.appendChild(button);
    divParent.appendChild(div);
  });
}

getCarsList(cars);

function getDataFromLocalStorage() {
  try {
    let data = JSON.parse(localStorage.getItem("car"));
    return data;
  } catch (error) {
    console.error(error);
  }
}

function choosenCar(cars) {
  const $btnCars = document.getElementById("carsList");

  $btnCars.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      let button = e.target;
      let carId = button.dataset.id;

      let car = cars.find((obj) => obj.id === Number(carId));

      localStorage.setItem("car", JSON.stringify(car));
      $btnCars.classList.toggle("hidden");
      const $summary = document.getElementById("summary");
      $summary.classList.toggle("hidden");

      let getData = getDataFromLocalStorage();
      console.log(getData);
      let $brand = document.getElementById("brand");
      $brand.innerText = getData.brand;
      let $model = document.getElementById("model");
      $model.innerText = `${getData.name} (rocznik ${getData.model})`;

      let $price = document.getElementById("price");
      $price.innerText = `${getData.cost} zł`
    }
  });
}
choosenCar(cars);
