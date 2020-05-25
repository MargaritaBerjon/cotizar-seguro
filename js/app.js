const maxYear = new Date().getFullYear();
minYear = maxYear - 20;
const selectYears = document.getElementById('anio');
const btn = document.getElementById('cotizar-seguro');

for (let year = maxYear; year > minYear; year--) {
  let option = document.createElement('option');
  option.value = year;
  option.innerHTML = year;
  selectYears.appendChild(option);
}


function Insurance(brand, year, type) {
  this.brand = brand;
  this.year = year;
  this.type = type;
}

Insurance.prototype.insuranceQuantity = function (info) {
  // 1 = americano 1.5
  // 2 = asiatico 1.05
  // 3 = europeo 2
  let quantity;
  const basePrice = 2000;

  switch (this.brand) {
    case '1':
      quantity = basePrice * 1.5;
      break;
    case '2':
      quantity = basePrice * 1.05;
      break;
    case '3':
      quantity = basePrice * 2;
      break;
  }

  Interface.prototype.paintInsurance = function (insurance, quantity) {
    const result = document.getElementById('resultado');
    let brand;
    switch (insurance.brand) {
      case '1':
        brand = 'Americano';
        break;
      case '2':
        brand = 'Asiatico';
        break;
      case '3':
        brand = 'Europeo';
        break;
    }
    const div = document.createElement('div');
    div.innerHTML = `<p class='header'>Tu seguro</p>
    <p>Marca: ${brand}</p>
    <p>Año: ${insurance.year}</p>
    <p>Tipo: ${insurance.type}</p>
    <p>Precio:${quantity}</p>`;
    const spinner = document.querySelector('#cargando img');
    spinner.style.display = 'block';
    setTimeout(function () {
      spinner.style.display = 'none';
      result.appendChild(div);
    }, 3000);

  }

  const gap = new Date().getFullYear() - this.year;
  //Reduce un 3% el precio cada año
  quantity -= ((gap * 3) * quantity / 100)

  // Seguro según tipo: basico 30% más , completo 50% más

  if (this.type === 'basico') {
    quantity *= 1.30;
  } else {
    quantity *= 1.50;
  }

  return quantity;

}

function Interface() { }
Interface.prototype.message = function (message, type) {
  const div = document.createElement('div');
  if (type === 'error') {
    div.classList.add('mensaje', 'error');
  } else {
    div.classList.add('mensaje', 'correcto')
  }
  div.innerHTML = `${message}`
  btn.insertBefore(div, document.querySelector('.form-group')
  );
  setTimeout(function () {
    document.querySelector('.mensaje').remove();
  }, 5000)
}




function submit(ev) {
  ev.preventDefault();
  const brand = document.querySelector('#marca');
  const brandSelected = brand.options[brand.selectedIndex].value;
  const year = document.getElementById('anio');
  const yearSelected = year.options[year.selectedIndex].value;
  const type = document.querySelector('input[name="tipo"]:checked').value;

  const interface = new Interface();
  if (brandSelected === '' || yearSelected === '' || type === '') {
    interface.message('Rellena todos los campos', 'error');

  } else {
    const results = document.querySelector('#resultado div');
    if (results != null) {
      results.remove();
    }
    const insurance = new Insurance(brandSelected, yearSelected, type);
    const quantity = insurance.insuranceQuantity(insurance);
    interface.paintInsurance(insurance, quantity);
    interface.message('Estamos calculando tu seguro...', 'exito');
  }

}

btn.addEventListener('submit', submit)

