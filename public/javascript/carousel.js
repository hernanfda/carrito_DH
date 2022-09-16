window.addEventListener("load", () => {
  //seleccionamos mediante la etiqueta, todas las imagenes que nos devuelve el ejs.
  const images = document.querySelectorAll("img");

  const nextButton = document.querySelector("#next-btn");
  const prevButton = document.querySelector("#prev-btn");

  // creamos un contador que nos va a servir para hacer coincidir con el indice del array de imagenes.
  let counter = 0;

  // ocultamos las imagenes y dejamos solo la primera del array
  images.forEach((image, index) => {
    if (index != 0) {
      image.style.display = "none";
    }
  });

  // boton siguiente
  nextButton.addEventListener("click", () => {
    //incrementamos en 1 la variable counter a cada click
    counter++;
    if (counter >= images.length) {
      //si counter se pasa del largo del array, vuelve a 0 (primera imagen)
      counter = 0;
    }
    //hago un forEach con indice para que cuando counter no coincida con el indice, que coulte la imagen, y mostrar la que coincida.
    images.forEach((image, i) => {
      if (i == counter) {
        image.style.display = "block";
      } else {
        image.style.display = "none";
      }
    });
  });

  //boton previo
  prevButton.addEventListener("click", () => {
    //decrementamos en 1 la variable counter a cada click
    counter--;
    if (counter < 0) {
      // si counter es menor a cero (-1), volvemos a la ultima imagen del array
      counter = images.length - 1;
    }
    images.forEach((image, i) => {
      if (i == counter) {
        image.style.display = "block";
      } else {
        image.style.display = "none";
      }
    });
  });
});
