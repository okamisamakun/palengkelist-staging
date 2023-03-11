let groceryList = [];
let budgetSet = false;
const form = document.querySelector("#grocery-form");
const tableHeader = document.querySelector('#list-header');
const clearCTA = document.querySelector('#clearCTA');
const addCTA = document.querySelector('#addItemCTA');
const total = document.querySelector("#total-price");
const itemName = document.querySelector("#item-name");
const itemQuantity = document.querySelector("#item-quantity");
var itemPrice = document.querySelector("#item-price");
var budget = document.querySelector("#budget");
const list = document.querySelector("#grocery-list");


function addItem() {
    var itemTotal = itemQuantity.value * itemPrice.value;
    var remainingBudget = budget.value - itemTotal;

    groceryList.push({
        name: itemName.value,
        quantity: itemQuantity.value,
        price: itemPrice.value,
        total: itemTotal,
        budget: budget.value,
        remainingBudget: remainingBudget
    });
    displayList();
    console.log(groceryList);

}

function displayList() {
    list.innerHTML = "";

    let totalPrice = 0;
    let remainingBudget = 0;
    for (let i = 0; i < groceryList.length; i++) {
        const item = groceryList[i];
        totalPrice += item.total;
        remainingBudget += item.remainingBudget;

        const tr = document.createElement("tr");
        tr.innerHTML = `
                <tr>
                    <td class="item-name">${item.name}</td>
                    <td class="item-quantity">${item.quantity}</td>
                    <td class="item-price">Php ${item.price}</td>
                    <td class="item-total">Php ${item.total.toFixed(2)}</td>
                    <td class="remove-item" data-name="${item.name}" data-quantity="${item.quantity}" data-price="${item.price}" data-total="${item.total.toFixed(2)}"><a class="remove-item-cta" href="#"><i class="bi bi-trash3"></i></a></td>
                </tr>
            `;
        list.prepend(tr);
    }

    total.innerHTML = `<div class="itemTotalPriceRemainingBudget" data-item-total="${totalPrice.toFixed(2)}" data-remaining-budget="${remainingBudget.toFixed(2)}">Remaining budget: Php ${remainingBudget.toFixed(2)} <br> Total: Php ${totalPrice.toFixed(2)}</div>`;

   /* if (remainingBudget <= 0) {
        addCTA.disabled = true;
    } else {
        addCTA.disabled = false;
    }*/
    
    budgetChecker(remainingBudget);
    groceryListChecker()
    

}

function budgetChecker(remainingBudget) {
    if (remainingBudget <= 0) {
        addCTA.disabled = true;
    } else {
        addCTA.disabled = false;
    }
}

function groceryListChecker() {
    if (groceryList.length > 0) {
        clearCTA.disabled = false;
        budget.disabled = true;
    } else {
        clearCTA.disabled = true;
        budget.disabled = false;
    }
}

function clearList() {
    groceryList = [];
    displayList();
    total.innerHTML = '';
    document.querySelector('#budget').disabled = false;
    addCTA.disabled = false;
}

window.addEventListener('load', () => {
    clearCTA.disabled = true;
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    addItem();
    form.reset();
});

clearCTA.addEventListener('click', () => {
    clearList();
    form.reset();
});

document.addEventListener('click', (e) => {
    const removeItemCTA = e.target.closest('.remove-item-cta');
    const itemTotalPriceRemainingBudget = document.querySelector('.itemTotalPriceRemainingBudget');
    let totalPrice = parseFloat(itemTotalPriceRemainingBudget.getAttribute('data-item-total'));
    let remainingBudget = parseFloat(itemTotalPriceRemainingBudget.getAttribute('data-remaining-budget'));
    var itemInfo = [];
    if (removeItemCTA) {
        itemInfo.push({
            itemName: removeItemCTA.parentNode.getAttribute('data-name'),
            itemQuantity: removeItemCTA.parentNode.getAttribute('data-quantity'),
            itemPrice: parseFloat(removeItemCTA.parentNode.getAttribute('data-price')),
            itemTotal: parseFloat(removeItemCTA.parentNode.getAttribute('data-total'))
        });
        itemInfo.forEach(a => {
           remainingBudget += a.itemTotal;
           totalPrice -= a.itemTotal;
            var selectedItem = groceryList.findIndex(b => b.name === a.itemName);
            groceryList.splice(selectedItem, 1)
            console.log(groceryList);
            total.innerHTML = `<div class="itemTotalPriceRemainingBudget" data-item-total="${totalPrice.toFixed(2)}" data-remaining-budget="${remainingBudget.toFixed(2)}">Remaining budget: Php ${remainingBudget.toFixed(2)} <br> Total: Php ${totalPrice.toFixed(2)}</div>`;
        });
        list.removeChild(removeItemCTA.parentNode.parentNode);
        budgetChecker(remainingBudget);
    };
});



/*window.onbeforeunload = (e) => {
    e.preventDefault();
    return '';
};*/