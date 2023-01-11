let items = [
    {
        id: "0",
        name: "Hoodies",
        stock: 5,
        price: 14,
        urlImage: "src/img/img/featured1.png"
    },
    {
        id: "1",
        name: "Hoodies Rocky",
        stock: 7,
        price: 14,
        urlImage: "src/img/img/featured2.png"
    },
    {
        id: "2",
        name: "Swatshirts",
        stock: 10,
        price: 24,
        urlImage: "src/img/img/featured3.png"
    },
]

// click del carrito para abrirlo y ocultarlo
{
    const iconCart = document.querySelector('.bx-shopping-bag');
    const contentCart = document.querySelector(".contentCart");

    iconCart.addEventListener('click',function(){
        contentCart.classList.toggle("contentCart__show")
    })
}

const products = document.querySelector('.products');
const cartProduct = document.querySelector('.cartProduct');
const cartTotal = document.querySelector('.cartTotal');

let objCart = {};


function printTotalCart() {
    const arrayCart = Object.values(objCart);
    //cuando no tienes nada en el carrito
    if(!arrayCart.length) {
        cartTotal.innerHTML = `
            <h3>Your cart is empty</h3>
        `;

        return;
    }

    let sum = 0;

    arrayCart.forEach(function ({ amount, price }) {
        sum += amount * price;
    });



    cartTotal.innerHTML = `
        <h3>Total to pay ${sum}</h3>
        <button class="btn btn__buy">Buy</button>

    `
}

function printProductsInCart() {
    let html = '';

    const arrayCart = Object.values(objCart);

    arrayCart.forEach(function({id, name, price, urlImage, amount}){
        html += `
            <div class="product">
                <div class="product__img">
                <img src="${urlImage}" alt"${name}" />
                </div>

                <div class="product__info">
                <p>${name}</p>
                <p>${price}</p>
                <p>Amount: ${amount}</p>
                </div>

                <div class="product_options" id="${id}">
                <i class='bx bx-minus'></i>
                <i class='bx bx-plus'></i>
                <i class='bx bx-trash' ></i>
                </div>
            </div>
        `
    });
    //for

    cartProduct.innerHTML = html;
}

function printProducts(){
    let html = '';

    items.forEach(function({id, name, stock, price, urlImage}){
        html += `
            <div class="product">
                <div class="product__img">
                <img src="${urlImage}" alt"${name}" />
                </div>

                <div class="product__info">
                <p>Name: ${name}</p>
                <p>Stock: ${stock}</p>
                <p>Price: ${price}</p>
                </div>

                <div class="product_options" id="${id}">
                    <button class="btn btn__add">Add to cart</button>
                </div>
            </div>
        `
    });

    products.innerHTML = html;
}

products.addEventListener('click', function(e){
    if(e.target.classList.contains('btn__add')){
        //obtenemos el id
        const id = e.target.parentElement.id;

        //obtenemos el producto por id
        let findProduct = items.find(function (item) {
            return item.id === id;
        });

        //logica para el carrito
        if(objCart[id]){
            objCart[id].amount++;
        }else{
            objCart[id] = {
                ...findProduct,
                amount: 1
            }
        }
        console.log(objCart);
        // items.forEach(function(item){
        //     if (item.id === id) {
        //         findProduct = item;
        //     }
        // });
    }
    
    printProductsInCart();
    printTotalCart()
})

cartProduct.addEventListener('click', function (e) {

    if (e.target.classList.contains("bx-minus")) {
        const id = e.target.parentElement.id;
        
        if (objCart[id].amount === 1) {
            const res = confirm("Are you sure to delete this product?")
            if (res) delete objCart[id];
        } else {
            objCart[id].amount--;
        }
    }

    if (e.target.classList.contains("bx-plus")) {
        const id = e.target.parentElement.id;

        let findProduct = items.find(function (item) {
            return item.id === id;
        });

        if (findProduct.stock === objCart[id].amount) {
            alert("Sorry, this product is not available in stock")
        } else {
            objCart[id].amount++;
        }
    }

    if (e.target.classList.contains("bx-trash")) {
        const id = e.target.parentElement.id;
        
        const res = confirm("Are you sure to delete this product?")
        if (res) delete objCart[id];
    }

    printProductsInCart();
    printTotalCart()
})

cartTotal.addEventListener('click', function(e) {
    if(e.target.classList.contains("btn__buy")) {
        const res = confirm("Comfirm the purchase")

        if (!res) return;
        
        let newArray = [];

        items.forEach(function(item) {
            if (item.id === objCart[item.id]?.id) {
                newArray.push({
                    ...item,
                    stock: item.stock - objCart[item.id].amount,
                });
            } else {
                newArray.push(item);
            }
        });

        items = newArray;
        objCart = {};


        printProducts();
        printProductsInCart()
        printTotalCart();
    }
});


printProducts();
printTotalCart();
