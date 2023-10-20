const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
})

/*-----------------------------*/
const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

// Lista de contenedores de productos
const productsList = document.querySelector('.container-items');

//variables para arreglos de los productos
let allProducts = [];

const valotTotal = document.querySelector('.total-pagar')

const countProducts = document.querySelector('#contador-productos')


productsList.addEventListener('click', e => {

    if(e.target.classList.contains('btn-add-cart')){
        const product = e.target.parentElement;

        const infoProduct = {
            quantity: 1,
            title: product.querySelector('h2').textContent,
            price: product.querySelector('p').textContent,
        };

        const exits = allProducts.some(product => product.title === infoProduct.title)
        
        if (exits){
            const products = allProducts.map(product => {
                if(product.title === infoProduct.title){
                    product.quantity++
                    return product
                } else{
                    return product
                }
            })
            allProducts = [...products]
        } else{
            allProducts = [...allProducts, infoProduct];
        }


        showHTML();


    }

    

});

rowProduct.addEventListener('click', (e) => {
    if(e.target.classList.contains('icon-close')){
        const product = e.target.parentElement
        const title = product.querySelector('p').textContent

        allProducts = allProducts.filter( 
            product => product.title !== title
            );
            
            showHTML()
    }
});

//Funcion mostrar HTML
const showHTML = () => {

    if(!allProducts.length){
        containerCartProducts.innerHTML=`
            <p class="cart-empty">El carrito está vacío</p>
        `
    }
    
    //Limpiar el HTML
    rowProduct.innerHTML = '';

    let total = 0;
    let totalOfProducts = 0;

    allProducts.forEach(product => {
        const containerProducts = document.createElement('div');
        containerProducts.classList.add('cart-product');

        containerProducts.innerHTML = `
            <div class="info-cart-products">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
             </svg>
        `;

        rowProduct.append(containerProducts);    

        total = total + parseInt(product.quantity * product.price.slice(1))
        totalOfProducts = totalOfProducts + product.quantity

    });

    valotTotal.innerText = `$${total}`;
    countProducts.innerText = totalOfProducts;
};