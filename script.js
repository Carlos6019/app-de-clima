// Seleccionamos el elemento con la clase "title" y lo almacenamos en la variable titleLogo
let titleLogo = document.querySelector(".title");

// Seleccionamos el elemento <body> para modificar su estilo dinámicamente
let bodyElem = document.querySelector("body");

// Cuando la página se carga completamente, ejecutamos la función
window.addEventListener("load", () => {
    // Generamos un número aleatorio entre 1 y 5
    let randNum = Math.ceil(Math.random() * 5);

    // Cambiamos la imagen de fondo del <body> usando el número aleatorio
    bodyElem.style.backgroundImage = `url('images/bg${randNum}.jpg')`;

    // Si el número aleatorio es 3, 4 o 5, cambiamos el color del texto de titleLogo a blanco
    if (randNum == 3 || randNum == 4 || randNum == 5) {
        titleLogo.style.color = "white";
    }
});

// Seleccionamos el campo de entrada donde el usuario escribirá el nombre de la ciudad
let cityInput = document.querySelector("#get-city");

// Detectamos cuando el usuario presiona la tecla "Enter" dentro del campo de entrada
cityInput.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
        // Llamamos a la función para obtener los datos del clima
        fetchDataFromApi();
    }
});

// Objeto que almacena la URL de la API y la clave de acceso
let apiData = {
    url: "https://api.openweathermap.org/data/2.5/weather?q=", // URL base de la API del clima
    key: "124b92a8dd9ec01ffb0dbf64bc44af3c", // Clave de la API (esta clave es pública en este código, lo cual no es recomendable en producción)
};

// Configuramos un valor por defecto en el campo de entrada y llamamos a la API de inmediato
cityInput.value = "new york";
fetchDataFromApi();
cityInput.value = ""; // Limpiamos el campo después de hacer la primera consulta

// Función que obtiene los datos del clima desde la API
function fetchDataFromApi() {
    let insertedCity = cityInput.value; // Obtenemos el nombre de la ciudad ingresada por el usuario
    fetch(`${apiData.url}${insertedCity}&&appid=${apiData.key}`) // Hacemos una petición a la API con la ciudad ingresada
        .then((res) => res.json()) // Convertimos la respuesta en formato JSON
        .then((data) => addDataToDom(data)); // Llamamos a la función para mostrar los datos en la página
}

// Seleccionamos los elementos del DOM donde mostraremos la información del clima
let cityName = document.querySelector(".city-name");
let cityTemp = document.querySelector(".weather-deg");
let cityCond = document.querySelector(".weather-condition");
let cityHumidity = document.querySelector(".humidity");
let todayDate = document.querySelector(".date");

// Función que inserta los datos del clima en los elementos HTML
function addDataToDom(data) {
    cityName.innerHTML = `${data.name}, ${data.sys.country}`; // Mostramos el nombre de la ciudad y el país
    cityTemp.innerHTML = `${Math.round(data.main.temp - 273.15)}°c`; // Convertimos la temperatura de Kelvin a Celsius
    cityCond.innerHTML = data.weather[0].description; // Mostramos la descripción del clima (ej: "nublado")
    cityHumidity.innerHTML = `humidity: ${data.main.humidity}%`; // Mostramos la humedad
    todayDate.innerHTML = getDate(); // Mostramos la fecha actual
}

// Array con los nombres de los meses del año
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Función que obtiene la fecha actual en formato "Día Mes Año"
function getDate() {
    let newTime = new Date(); // Obtenemos la fecha actual
    let month = months[newTime.getMonth()]; // Extraemos el nombre del mes
    return `${newTime.getDate()} ${month} ${newTime.getFullYear()}`; // Retornamos la fecha formateada
}
