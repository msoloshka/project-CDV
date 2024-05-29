function getBuyCar() {
  const car = JSON.parse(localStorage.getItem("car"));
  const $carBrand = document.getElementById("carBrand");
  $carBrand.innerText = car.brand;

  const $carName = document.getElementById("carName");
  $carName.innerText = `${car.name} ${car.model}`;

  const $carPrice = document.getElementById("carPrice");
  $carPrice.innerText = `${car.cost} zł.`;

  const carPhoto = document.getElementById("carPhoto");
  let $img = document.createElement("IMG");
  $img.src = `./assets/img/${car.img}`;
  $img.classList.add("carImg");
  carPhoto.appendChild($img);
}

function getPersonData() {
  try {
    let person = JSON.parse(localStorage.getItem("person"));
    let $personName = document.getElementById("personNameAndSurname");
    let $place = document.getElementById("place");
    let $date = document.getElementById("date");
    let $payment = document.getElementById("payment");

    let dataFormat = new Date(person.date);
    let formatedDate = `${dataFormat.getDate()}.${
      dataFormat.getMonth() + 1
    }.${dataFormat.getFullYear()} r.`;

    console.log(person);

    $personName.innerText = person.name;
    $place.innerText = person.place;
    $date.innerText = formatedDate;
    $payment.innerText = person.payment;
    localStorage.removeItem("car");
    localStorage.removeItem("person");
  } catch (e) {
    console.error(e);
  }
}

getBuyCar();
getPersonData();
