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
        urlImage: "src/img/img/featured3.png"
    },
    {
        id: "2",
        name: "Swatshirts",
        stock: 10,
        price: 24,
        urlImage: "src/img/img/featured2.png"
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

const products = document.querySelector('.product__details');
const cartProduct = document.querySelector('.cartProduct');
const cartTotal = document.querySelector('.cartTotal');
const cartAmount =document.querySelector('.cartAmount');

let objCart = {};

function printCartAmount() {
    let sum = 0;

    const arrayCart = Object.values(objCart);

    if(!arrayCart.length) {
        cartAmount.style.display = "none";
        return;
    };

    cartAmount.style.display = "inline-block";

    arrayCart.forEach(function ({ amount }){
        sum += amount;
    });

    cartAmount.textContent = sum;
}

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
        <h3>Total to pay <i class='bx bxs-badge-dollar'></i> ${sum}.00</h3>
        <br/>
        <button class="btn btn__buy">Buy</button>

    `
}

function printProductsInCart() {
    let html = '';

    const arrayCart = Object.values(objCart);

    arrayCart.forEach(function({id, name, price, urlImage, amount}){
        html += `
            <section class="product">    
                <section class="product__img">
                    <img src="${urlImage}" alt"${name}" />
                </section>

                <section class="product__info">
                    <p>${name}</p>
                    <p><i class='bx bxs-badge-dollar'></i>${price}.00</p>
                    <p>amount: ${amount}</p>
                </section>

                <section class="product_options" id="${id}">
                    <i class='bx bx-minus'></i>
                    <i class='bx bx-plus'></i>
                    <i class='bx bx-trash' ></i>
                </section>
            </section>
        `
    });
    //for

    cartProduct.innerHTML = html;
}

function printProducts(){
    let html = '';

    items.forEach(function({id, name, stock, price, urlImage}){
        html += `
        <section class="product__details-img filter-${id}">
        <img src="${urlImage}" alt"${name}">
        <section class="product__details-img-details">
            <section class="product__details-img-details-title flex">
                <h3 class="product__details-price"><i class='bx bxs-badge-dollar'></i>${price}.00</h3>
                <p class="categories-details"><small> | Stock: ${stock} </small></p>
            </section>
            <section class="paragraph">
                <h3 class="product__details-price-name">${name}</h3>
            </section>
        </section>
        <section class="product_options" id="${id}">
            <button class="btn btn__add">ADD TO CART</button>
        </section>
    </section>
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
            let findProduct = items.find(function (item) {
                return item.id === id;
            });
    
            if (findProduct.stock === objCart[id].amount) {
                alert("Sorry, this product is not available in stock")
            } else {
                objCart[id].amount++;
            }

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
    printCartAmount()
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
    printCartAmount()
})

cartTotal.addEventListener('click', function(e) {
    if(e.target.classList.contains("btn__buy")) {
        const res = confirm("Confirm the purchase")

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
        printCartAmount()
    }
});


printProducts();
printTotalCart();
printCartAmount()

// filtrado de products:

mixitup(".product__details", {
    selectors: {
        target: '.product__details-img'
    },
    animation: {
        duration: 300
    }
});

