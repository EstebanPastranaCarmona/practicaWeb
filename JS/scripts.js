const buttons = document.querySelectorAll(".buyButton");
const cart = document.getElementById('cart');
var isNewFooterCreated = false;

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

    checkIsCartIsEmpty();
    CheckTotalAmountAndPrice();
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
    CheckTotalAmountAndPrice();
}

function DecreaseAmount(row, price){
    const PriceCell = row.cells[4]; 
    let newTotal = parseInt(PriceCell.textContent) - parseInt(price);
    PriceCell.textContent = String(newTotal);

    const amountCell = row.cells[2]; 
    amountCell.textContent = amountCell.textContent === '1' ? row.remove() : parseInt(amountCell.textContent) - 1;
    CheckTotalAmountAndPrice(); 
    checkIsCartIsEmpty();
}

function checkIsCartIsEmpty(){
    

    let footerMessage = document.getElementById('emptyPurchases');
    const tablefoot = document.getElementById('purchasesFoot');

    let cartLength = cart.rows.length;

    if(cartLength > 0 && !isNewFooterCreated){
        footerMessage.hidden = true;

        tablefoot.appendChild(GetNewFooter());
        isNewFooterCreated = true;
        return;
    }
    else if (cartLength === 0 ) {

        footerMessage.hidden = false;

        if (isNewFooterCreated) {
            const newFooter = document.getElementById('newFooter'); 
            if (newFooter) {
                tablefoot.removeChild(newFooter);
            }
            isNewFooterCreated = false;
        }
    }    
}


function GetNewFooter(){

    let tablefootrow = document.createElement('tr');
    
    let tdNewMessage = document.createElement('td');
    tdNewMessage.textContent = 'Total Producto:'
    tdNewMessage.colSpan = 2

    let = tdTotalAmount = document.createElement('td');
    tdTotalAmount.textContent = GetTotal(2);
    tdTotalAmount.setAttribute('id', 'totalAmount')

    let deleteAllCart = document.createElement('button');
    deleteAllCart.addEventListener('click', DeleteCart);
    deleteAllCart.textContent = 'Vaciar Todo'
    deleteAllCart.classList.add('deleteCartButton')

    let tdTotalPrice = document.createElement('td');
    tdTotalPrice.textContent = GetTotal(4);
    tdTotalPrice.setAttribute('id', 'totalPrice')

    tablefootrow.appendChild(tdNewMessage);
    tablefootrow.appendChild(tdTotalAmount);
    tablefootrow.appendChild(deleteAllCart);
    tablefootrow.appendChild(tdTotalPrice);

    tablefootrow.setAttribute('id', 'newFooter')

    return tablefootrow;
}

function GetTotal(columnIndex){

    let sum = 0;
    for( const row of cart.rows){
        let cellValue = parseInt(row.cells[columnIndex].textContent);
        sum += cellValue;
    }

    return String(sum);
}

function DeleteCart(){
    cart.innerHTML = '';
    checkIsCartIsEmpty();
}

function CheckTotalAmountAndPrice(){
    const totalAmount = document.getElementById('totalAmount');
    const totalPirce = document.getElementById('totalPrice')

    if(isNewFooterCreated){
        totalAmount.textContent = GetTotal(2)
        totalPirce.textContent = GetTotal(4)
    }
}