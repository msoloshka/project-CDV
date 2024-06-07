function getBuyCarData() {
  const car = JSON.parse(localStorage.getItem("car"));
  const $carBrand = document.getElementById("carBrand");
  $carBrand.innerText = car.brand;

  const $carName = document.getElementById("carName");
  $carName.innerText = `${car.name} ${car.model}`;

  const $carPrice = document.getElementById("carPrice");
  $carPrice.innerText = `${car.cost} zł.`;

  const $carPhoto = document.getElementById("carPhoto");
  const $img = document.createElement("IMG");
  $img.src = `./img/${car.img}`;
  $img.classList.add("carImg");
  $carPhoto.appendChild($img);
}

function getPersonData() {
  try {
    let person = JSON.parse(localStorage.getItem("person"));
    const $personName = document.getElementById("personNameAndSurname");
    const $place = document.getElementById("place");
    const $date = document.getElementById("date");
    const $payment = document.getElementById("payment");

    const dataFormat = new Date(person.date);
    const formatDate = `${dataFormat.getDate()}.${
      dataFormat.getMonth() + 1
    }.${dataFormat.getFullYear()} r.`;

    $personName.innerText = person.name;
    $place.innerText = person.place;
    $date.innerText = formatDate;
    $payment.innerText = person.payment;
  } catch (e) {
    console.error(e);
  }
}

getBuyCarData();
getPersonData();