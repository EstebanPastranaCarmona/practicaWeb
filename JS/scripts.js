const buttons = document.querySelectorAll(".buyButton");
const cart = document.getElementById('cart');

    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const name = event.target.getAttribute('data-name');
            const price = parseFloat(event.target.getAttribute('data-price'));
            const id = event.target.getAttribute('data-id');

            console.log(`Producto: ${name}`);
            console.log(`Precio: ${price}`);
            console.log(`ID: ${id}`);

            addToCart(id, name, price);
        });
    });

function addToCart(id, name, price){
 
    if(CheckIsElementInCart(cart, id, price)){
        return;
    };

    cart.appendChild(CreateNewRow(id, name, price));
}

function CreateNewRow(id, name, price ){

    const row = document.createElement('tr');

    const buttonAdd = document.createElement('button');
    buttonAdd.textContent = '+';
    buttonAdd.classList.add('addButton');
    buttonAdd.addEventListener('click', () => IncreaseAmount(row, price))

    const buttonDelete = document.createElement('button');
    buttonDelete.textContent = '-';
    buttonDelete.classList.add('deleteButton');
    buttonDelete.addEventListener('click', () => DecreaseAmount(row, price))

    const tdId = document.createElement('td');
    tdId.textContent = id;

    const tdAmount = document.createElement('td');
    tdAmount.textContent = '1';

    const tdName = document.createElement('td');
    tdName.textContent = name;

    const tdButtons = document.createElement('td');
    tdButtons.appendChild(buttonAdd);  
    tdButtons.appendChild(buttonDelete);  

    const tdPrice = document.createElement('td');
    tdPrice.textContent = price;

    row.appendChild(tdId);
    row.appendChild(tdName);
    row.appendChild(tdAmount)
    row.appendChild(tdButtons);
    row.appendChild(tdPrice);

    return row;
}

function CheckIsElementInCart(tbody, id, price){

    for(const trow of tbody.rows){
        for(const tdata of trow.cells){
            if(tdata.textContent === id){
                IncreaseAmount(trow, price)
                return true;
            }
        }
    }
    return false
}

function IncreaseAmount(row, price){
    const cantidadCelda = row.cells[2]; 
    cantidadCelda.textContent = parseInt(cantidadCelda.textContent) + 1;

    const PriceCelda = row.cells[4]; 
    let newTotal = parseInt(PriceCelda.textContent) + parseInt(price);
    PriceCelda.textContent = String(newTotal);
}

function DecreaseAmount(row, price){
    const PriceCelda = row.cells[4]; 
    let newTotal = parseInt(PriceCelda.textContent) + parseInt(price);
    PriceCelda.textContent = String(newTotal);

    const cantidadCelda = row.cells[2]; 
    cantidadCelda.textContent = cantidadCelda.textContent === '1' ? row.remove() : parseInt(cantidadCelda.textContent) - 1; 
   
}
