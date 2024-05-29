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
  try {
    cars.forEach((car) => {
      let div = document.createElement("DIV");
      div.classList.add("box");

      let img = document.createElement("IMG");
      img.src = `./img/${car.img}`;

      let h2 = document.createElement("h2");
      h2.innerText = `${car.cost} zł.`;
      h2.classList.add("priceInfo");

      let button = document.createElement("button");
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

getCarsList(cars);

function getDataFromLocalStorage() {
  try {
    let data = JSON.parse(localStorage.getItem("car"));
    return data;
  } catch (error) {
    console.error(error);
  }
}

function selectedCar(cars) {
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
      let $brand = document.getElementById("brand");
      $brand.innerText = getData.brand;
      let $model = document.getElementById("model");
      $model.innerText = `${getData.name} (rocznik ${getData.model})`;

      let $price = document.getElementById("price");
      $price.innerText = `${getData.cost} zł`;
      window.scrollTo({
        top: 300,
        behavior: "smooth",
      });
    }
  });
}

selectedCar(cars);

function validateRadioButtons() {
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
    let span = $novalidate.children[0];
    span.textContent = "Uzupełnij imię i nazwisko";
    $novalidate.classList.remove("hidden");
    return false;
  }
}

function validate() {
  const $person = document.getElementById("personNameAndSurname");
  const $place = document.getElementById("place");
  const $date = document.getElementById("date");
  let radioButtonValue = validateRadioButtons();
  let validatePersonName = validateNameAndSurname($person.value);
  console.log(validatePersonName);
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
      let span = $novalidate.children[0];
      span.textContent = "Uzupełnij brakujące pola by przejść dalej";
      $novalidate.classList.remove("hidden");
      return false;
    }
  }
}

function acceptBuingCar() {
  const $button = document.getElementById("accept");
  $button.addEventListener("click", () => {
    if (validate()) {
      window.location.href = "summaryPage.html";
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      console.log("Uzupeij brakujące pola");
    }
  });
}
acceptBuingCar();

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
cancelBuy();
