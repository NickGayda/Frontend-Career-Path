import { menuArray } from "./data.js"; 

let submit = false

// Initialize order
const orderItems = menuArray.map(item => {
    return [item, 0]
})

document.addEventListener('click', e => {
    if(e.target.dataset.add){
        handleAddItemClick(e.target.dataset.add) 
    } else if(e.target.dataset.remove) {
        handleRemoveItemClick(e.target.dataset.remove) 
    } else if(e.target.id == 'complete-order-btn') {
        handleCompleteOrderClick()
    } else if(e.target.id == 'payment-close-btn') {
        handleClosePaymentClick()
    } 
})

document.getElementById('payment-form').addEventListener('submit', function(e) {
    e.preventDefault()
    const paymentFormData = new FormData(document.getElementById('payment-form'))
    const fullName = paymentFormData.get('fullName')

    document.getElementById('submit-message').textContent = `Thanks, ${fullName}! Your order is on its way!`
    document.getElementById('submit').classList.toggle('hidden')

    document.getElementById('overlay').style.display = 'none'
    document.getElementById('payment-container').style.display = 'none'
    clearOrder()
    render()
})

function handleAddItemClick(itemId) {
    orderItems[itemId][1]++
    render()
}

function handleRemoveItemClick(itemId) {
    orderItems[itemId][1]--
    render()
}

function handleCompleteOrderClick() {
    document.getElementById('overlay').style.display = 'inline'
    document.getElementById('payment-container').style.display = 'inline'
    document.getElementById('payment-form').reset() 
}

function handleClosePaymentClick() {
    document.getElementById('overlay').style.display = 'none'
    document.getElementById('payment-container').style.display = 'none'
}

function clearOrder() {
    orderItems.forEach(itemCountArr => itemCountArr[1] = 0)
}

function getContentHtml() {
    let contentHtml = ``
    menuArray.forEach(item => {
        contentHtml += `
        <div class="item">
            <div class="item-inner">
                <span class="item-img">${item.emoji}</span>
                <div class="item-details">
                    <p class="item-food">${item.name}</p>
                    <p class="item-food-ingredients">${item.ingredients.join(', ')}</p>
                    <p class="item-food-price">$${item.price}</p>
                </div>
                <div>
                    <span class="material-symbols-outlined" data-add="${item.id}">
                        add_circle
                    </span>
                </div>
            </div>
        </div>
        `
   })

   return contentHtml 
}

function getOrderHtml() {
    let orderHtml = ``
    let emptyOrder = true
    let totalPrice = 0
    const orderEl = document.getElementById('order')

    orderItems.forEach(itemCountArr => {
        emptyOrder = itemCountArr[1] > 0 || !emptyOrder ? false : true
    })

    if (!emptyOrder && orderEl.classList.contains('hidden') || emptyOrder && !orderEl.classList.contains('hidden')) {
        orderEl.classList.toggle('hidden')
    }

    if (!emptyOrder) {
        orderItems.forEach(itemCountArr => {
            if (itemCountArr[1] > 0)
            {
                orderHtml += `
                <div class="order-item">
                    <span class="order-item-food">${itemCountArr[0].name} (${itemCountArr[1]})</span>
                    <span class="order-item-remove" data-remove="${itemCountArr[0].id}">remove</span>
                    <span class="order-item-price">$${itemCountArr[0].price * itemCountArr[1]}</span>
                </div>
                `
                totalPrice += itemCountArr[0].price * itemCountArr[1]
            }
        })
        document.getElementById('order-total-price').textContent = `$${totalPrice}`
    }

    if (!document.getElementById('submit').classList.contains('hidden') && !emptyOrder) {
        document.getElementById('submit').classList.toggle('hidden')
    }

    return orderHtml
}

function render() {
    document.getElementById('order-items').innerHTML = getOrderHtml()
}

document.getElementById('content').innerHTML = getContentHtml()