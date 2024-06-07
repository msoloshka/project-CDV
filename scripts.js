import { cars } from "./cars.js";

const $search = document.querySelector(".search-box");
const $menu = document.querySelector(".navbar");
const $header = document.querySelector("header");

function searchCarButton() {
  const searchIcon = document.getElementById("search-icon");
  searchIcon.addEventListener("click", () => {
    $search.classList.toggle("active");
    $menu.classList.remove("active");
  });
}

function menuNavigateButton() {
  const menuIcon = document.getElementById("menu-icon");
  menuIcon.addEventListener("click", () => {
    $menu.classList.toggle("active");
    $search.classList.remove("active");
  });
}
// SCROLL
window.onscroll = () => {
  $menu.classList.remove("active");
  $search.classList.remove("active");
};


window.addEventListener("scroll", () => {
  $header.classList.toggle("shadow", window.scrollY > 0);
});

function getCarsList(cars) {
  const divParent = document.getElementById("carsList");
  try {
    cars.forEach((car) => {
      const div = document.createElement("DIV");
      div.classList.add("box");

      const img = document.createElement("IMG");
      img.src = `./img/${car.img}`;

      const h2 = document.createElement("h2");
      h2.innerText = `${car.cost} zł.`;
      h2.classList.add("priceInfo");

      const button = document.createElement("button");
      button.innerText = `${car.brand} ${car.name}`;
      button.setAttribute("data-id", car.id);

      div.appendChild(img);
      div.appendChild(h2);
      div.appendChild(button);
      divParent.appendChild(div);
    });
  } catch (error) {
    console.error(error);
  }
}

function getDataFromLocalStorage() {
  try {
    const data = JSON.parse(localStorage.getItem("car"));
    return data;
  } catch (error) {
    console.error(error);
  }
}

function selectedCar(cars) {
  const $btnCars = document.getElementById("carsList");

  $btnCars.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const button = e.target;
      const carId = button.dataset.id;

      const car = cars.find((obj) => obj.id === Number(carId));

      localStorage.setItem("car", JSON.stringify(car));
      $btnCars.classList.toggle("hidden");
      const $summary = document.getElementById("summary");
      $summary.classList.toggle("hidden");

      const getData = getDataFromLocalStorage();
      const $brand = document.getElementById("brand");
      $brand.innerText = getData.brand;
      const $model = document.getElementById("model");
      $model.innerText = `${getData.name} (rocznik ${getData.model})`;

      const $price = document.getElementById("price");
      $price.innerText = `${getData.cost} zł`;
      window.scrollTo({
        top: 300,
        behavior: "smooth",
      });
    }
  });
}

function validateRadioButtonsInForms() {
  try {
    const radioButton = document.getElementsByName("payment");
    let selectValue;

    for (const option of radioButton) {
      if (option.checked) {
        selectValue = option.value;
        break;
      }
    }
    return selectValue;
  } catch (error) {
    console.log(error);
  }
}

function validateNameAndSurname(nameInput) {
  const input = nameInput.trim().split(" ").length >= 2;
  if (input) {
    return true;
  } else {
    const $novalidate = document.getElementById("noValidate");
    const span = $novalidate.children[0];
    span.textContent = "Uzupełnij imię i nazwisko";
    $novalidate.classList.remove("hidden");
    return false;
  }
}

function validate() {
  const $person = document.getElementById("personNameAndSurname");
  const $place = document.getElementById("place");
  const $date = document.getElementById("date");
  const radioButtonValue = validateRadioButtonsInForms();
  const validatePersonName = validateNameAndSurname($person.value);
  if (validatePersonName) {
    if ($place.value && $date.value && radioButtonValue) {
      const personsData = {
        name: $person.value,
        place: $place.value,
        date: $date.value,
        payment: radioButtonValue,
      };
      localStorage.setItem("person", JSON.stringify(personsData));
      return true;
    } else {
      const $novalidate = document.getElementById("noValidate");
      const span = $novalidate.children[0];
      span.textContent = "Uzupełnij brakujące pola by przejść dalej";
      $novalidate.classList.remove("hidden");
      return false;
    }
  }
}

function createBuyCarButton() {
  const $button = document.getElementById("accept");
  $button.addEventListener("click", () => {
    if (validate()) {
      window.location.href = "summaryPage.html";
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  });
}

function cancelBuy() {
  const $btnCars = document.getElementById("carsList");
  const $button = document.getElementById("cancel");
  $button.addEventListener("click", () => {
    const $summary = document.getElementById("summary");
    $btnCars.classList.toggle("hidden");
    $summary.classList.toggle("hidden");
    const $novalidate = document.getElementById("noValidate");
    $novalidate.classList.add("hidden");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

searchCarButton();
menuNavigateButton();
getCarsList(cars);
selectedCar(cars);
createBuyCarButton();
cancelBuy();