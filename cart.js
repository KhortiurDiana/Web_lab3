document.addEventListener('DOMContentLoaded', function() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cartItemsContainer = document.querySelector('.cart-items');
  const clearCartButton = document.querySelector('.clear-cart');
  const cartCounter = document.querySelector('.cart-counter');
  let totalCost = 0;
  let totalItems = 0;

  addToCartButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      const product = event.target.closest('.product');
      const productName = product.querySelector('h3').innerText;
      const productImage = product.querySelector('img').src;
      const productPrice = parseFloat(product.querySelector('p').innerText.replace('Ціна: $', ''));
      const quantity = parseInt(product.querySelector('input[type="number"]').value);

      addToCart(productName, productImage, productPrice, quantity);
    });
  });

  function addToCart(name, image, price, quantity) {
    const existingCartItem = cartItemsContainer.querySelector(`[data-name="${name}"]`);
    
    if (existingCartItem) {
      const quantityElement = existingCartItem.querySelector('.quantity');
      const currentQuantity = parseInt(quantityElement.innerText);
      quantityElement.innerText = currentQuantity + quantity;

      const itemPriceElement = existingCartItem.querySelector('.item-price');
      const itemTotalPriceElement = existingCartItem.querySelector('.item-total-price');
      const itemTotalPrice = parseFloat(itemPriceElement.innerText) * (currentQuantity + quantity);
      itemTotalPriceElement.innerText = itemTotalPrice.toFixed(2);

      updateTotalCostAndItems();
    } else {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.dataset.name = name;
      cartItem.innerHTML = `
        <img src="${image}" alt="${name}">
        <h3>${name}</h3>
        <p>Ціна: $<span class="item-price">${price}</span></p>
        <p>Кількість: <span class="quantity">${quantity}</span></p>
        <p>Загальна вартість: $<span class="item-total-price">${price * quantity}</span></p>
        <button class="remove-from-cart">Видалити з корзини</button>
      `;
      
      cartItemsContainer.appendChild(cartItem);
    }

    totalCost += price * quantity;
    totalItems += quantity;
    updateTotalCostAndItems();
  }

  function updateTotalCostAndItems() {
    const totalCostElement = document.querySelector('.total-cost');
    totalCostElement.innerText = `Загальна сума: $${totalCost.toFixed(2)}`;

    cartCounter.innerText = `- ${totalItems}`;
  }

  cartItemsContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-from-cart')) {
      const cartItem = event.target.closest('.cart-item');
      const quantity = parseInt(cartItem.querySelector('.quantity').innerText);
      const price = parseFloat(cartItem.querySelector('.item-price').innerText);
      const itemTotalPrice = parseFloat(cartItem.querySelector('.item-total-price').innerText);
      
      totalCost -= itemTotalPrice;
      totalItems -= quantity;
      cartItem.remove();
      updateTotalCostAndItems();
    }
  });

  clearCartButton.addEventListener('click', function() {
    cartItemsContainer.innerHTML = '';
    totalCost = 0;
    totalItems = 0;
    updateTotalCostAndItems();
  });
});
