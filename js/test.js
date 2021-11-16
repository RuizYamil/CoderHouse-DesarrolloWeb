// Ready
$(document).ready(() => {
    console.log("Se cargo el DOM")

    setTimeout(() => {
        confirm('Ya se cargo el DOM')
    }, 1000)
    
})

// $('#button-shopping-cart').css('color', 'blue')
$('div.product-title').css('font-weight', 'bold')


const containerProducts = document.querySelector('.container-cards');
const containerShoppingCart = document.getElementById('container-shopping-cart')

const counterCart = document.getElementById('counter-shopping-cart')
const totalPrice = document.getElementById('total-price')

const emptyButton = document.getElementById('empty-shopping-cart')

// Load storage
document.addEventListener('DOMContentLoaded', () => {
    shoppingCart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCart();
})

// Empty cart
emptyButton.addEventListener('click', () => {
    shoppingCart.length = 0
    localStorage.setItem('cart', JSON.stringify(shoppingCart))
    updateCart()
})

// Stock of products
const showProducts = (array) => {
    containerProducts.innerHTML = ""

    array.forEach((product) => {
        const div = document.createElement('div');
        div.classList = `${product.class}`
        div.innerHTML = `
            <img src=${product.rating} class="rating" alt="rating">
            <img src=${product.productImg} class="product-img" alt="${product.alt}">
            <h3>${product.title}</h3>
            <div class="paragraph-price">
                <p class="discount price">$${product.discountPrice}</p>
                <p class="price">$${product.price}</p>
            </div>
            <div class="btn-add-to-cart">
                <button id="add${product.id}" class="button-add">Agregar al carrito</button>    
            </div>
        `
        containerProducts.appendChild(div);

        const button = document.getElementById(`add${product.id}`)
        button.addEventListener('click', () => {
            addToCart(product.id)
        })
    })
}
showProducts(stockProducts)

// Add items to cart
const addToCart = (prodId) => {
    const item = stockProducts.find( (prod) => prod.id === prodId)
    localStorage.setItem('cart', JSON.stringify(shoppingCart))
    shoppingCart.push(item)
    updateCart()
}

// Remove items from cart
const removeCart = (prodId) => {
    const item = shoppingCart.find( (prod) => prod.id === prodId )
    const indice = shoppingCart.indexOf(item)
    localStorage.setItem('cart', JSON.stringify(shoppingCart))
    shoppingCart.splice(indice, 1)
    updateCart()
}

// Update cart items
const updateCart = () => {
    containerShoppingCart.innerHTML = ""
    localStorage.setItem('cart', JSON.stringify(shoppingCart))
    shoppingCart.forEach( (prod) => {
        const div = document.createElement('div')
        div.className = "productInShoppingCart"
        div.innerHTML = `
                    <p class="product-title-modal">Producto: ${prod.title}</p>
                    <p class="price-modal">Precio: $${prod.price}</p>
                    <button id="remove-cart${prod.id}" class="delete-button"><i class="fas fa-trash-alt"></i></button>
                `
        containerShoppingCart.appendChild(div)

        const remove = document.getElementById(`remove-cart${prod.id}`)
        remove.addEventListener('click', () => {
            removeCart(prod.id)
        })
    })
    counterCart.innerText = shoppingCart.length
    totalPrice.innerText = shoppingCart.reduce((acc, prod) => acc + prod.price, 0)
}

// jQuery
$('#button').css({
    'border': 'none',
    'background-color': '#05297f',
    'border-radius': '49px',
    'color': 'white',
    'font-family': 'Arial, Helvetica, sans-serif',
    'font-size': '1.5rem',
    'line-height': 'normal',
    'padding': '15px 20px',
    'margin-left': '50%'
})

$('body').prepend('<h3 class="title">Agregando titulo</h3>')
$('.title').html('<h3>Modificar titulo</h3>')
// $('body').html('<div class="spinner-border text-primary"></div>')


const toggleClick = () => {
    $('#container-cards').toggle()
}

$('#button').click(toggleClick)


$(window).on("load", function() {
    $(".loader-container").fadeOut(1000)
})