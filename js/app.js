const addToCartButtons = document.getElementsByClassName('addToCartBtn');
const cart = document.querySelector('.cart-items');
const dropdownToggle = document.querySelector('.dropdown-toggle');
const cartItemContainer = document.getElementsByClassName('cart-items')[0]
const cartRows = cartItemContainer.getElementsByClassName('cart-row')

for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i]
    button.addEventListener('click', addCartItem)
}

function addCartItem(event) {
    event.preventDefault();

    const parentDiv = event.target.parentNode;
    const btnId = event.target.id;
    const title = parentDiv.querySelector("h3").textContent;

    let price = parentDiv.querySelector(".price span").textContent;

    for (var i = 0; i < cartRows.length; i++) {

        var cartRow = cartRows[i]
        if (cartRow.id == btnId) {
            var quantity = parseInt(cartRow.querySelector('.cart-quantity-input').textContent) + 1;
            cartRow.querySelector('.cart-quantity-input').textContent = quantity;
            cartRow.querySelector('.cart-price').textContent = price * quantity;
            updateCartTotal();
            return;
        }
    }


    const cartItemDiv = document.createElement('div');
    cartItemDiv.classList.add('dropdown-item', 'cart-row');
    cartItemDiv.id = btnId;
    cartItemDiv.innerHTML = `
    <div class="cart-item">
    <span class="cart-quantity-input">1</span> <span style="margin-right: 10px;">x</span>
        ${title}<span class="cart-price">${price}€</span>
       <i class="fas fa-trash delete-item"></i>
    </div>`;

    cart.appendChild(cartItemDiv);
    cartItemDiv.getElementsByClassName('delete-item')[0].addEventListener('click', removeCartItem)
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal();

}

function updateCartTotal() {
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {

        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var price = parseFloat(priceElement.innerText.replace('€', ''))
        total = total + price
    }
    total = Math.round(total * 100) / 100

    if (total !== 0) {
        document.querySelector('.checkout-btn-section').classList.remove('d-none');
        document.querySelector('.product-cart').innerText = 'Check your cart'
    } else {
        document.querySelector('.checkout-btn-section').classList.add('d-none');
        document.querySelector('.product-cart').innerText = 'No items in your cart'
    }
    document.getElementsByClassName('cart-total-price')[0].innerText = total + '€'
}

updateCartTotal()