let cart = [];
let modalQt = 0;
let key = 0;
//constante para carregar estrutura, limpando o código
const c = (el) => document.querySelector(el);//para localizar o primeiro item
const cs = (el) => document.querySelectorAll(el); //para localizar todos os itens

ac[0].items.map((item, index) => {
    let modelsItem = c('.models .models-item').cloneNode(true);
    modelsItem.setAttribute('id', index);
    modelsItem.querySelector('.models-item--img img').src = item.imageUrl;
    modelsItem.querySelector('.models-item--price').innerHTML = `R$  ${item.price}`;
    modelsItem.querySelector('.models-item--name').innerHTML = item.name;
    modelsItem.querySelector('.models-item--desc').innerHTML = item.productId;


    modelsItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        key = e.target.closest('.models-item').getAttribute('id');
        modalQt = 1;
        c('.modelsBig img').src = item.imageUrl;
        c('.modelsInfo h1').innerHTML = item.name;
        c('.modelsInfo--desc').innerHTML = `ID: ${item.productId}`;
        c('.modelsInfo--actualPrice').innerHTML = `R$ ${item.price.toFixed(2)}`;


        c('.modelsInfo--qt').innerHTML = modalQt;
        c('.modelsWindowArea').style.opacity = 0;
        c('.modelsWindowArea').style.display = 'flex';
        setTimeout(() => {
            c('.modelsWindowArea').style.opacity = 1;
        }, 200);
    });

    c('.models-area').append(modelsItem);

});

function closeModal() {
    c('.modelsWindowArea').style.opacity = 0;
    setTimeout(() => {
        c('.modelsWindowArea').style.display = 'none';
    }, 500);

}
cs('.modelsInfo--cancelButton, .modelsInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
});

c('.modelsInfo--qtmenos').addEventListener('click', () => {
    if (modalQt > 1) {
        modalQt--;
        c('.modelsInfo--qt').innerHTML = modalQt;
    }
});

c('.modelsInfo--qtmais').addEventListener('click', () => {
    modalQt++;
    c('.modelsInfo--qt').innerHTML = modalQt;
});

c('.modelsInfo--addButton').addEventListener('click', () => {

    let identifier = ac[0].items[key].productId;

    let locaId = cart.findIndex((item) => item.identifier == identifier);

    if (locaId > -1) {
        cart[locaId].qt += modalQt;
    } else {
        cart.push({
            identifier,
            id: ac[0].items[key].productId,
            qt: modalQt
        });
    }
    updateCart();
    closeModal();
});
    c('.menu-openner').addEventListener ('click',()=>{
        if (cart.length > 0 ) {
            c('aside').style.left = 0;
        }
    });

    c('.menu-closer').addEventListener('click',() => {
            c('aside').style.left = '100vw'
    });

    
    c('.cart--finalizar').addEventListener('click',() => {
      cart = [];
      updateCart ();
});



function updateCart() {
    c('.menu-openner span').innerHTML = cart.length;
    if (cart.length > 0) {
        c('aside').classList.add('show');
        c('.cart').innerHTML = '';
        let subtotal = 0;
        let desconto = 0;
        let total =0;
        cart.map((itemCart, index) => {
            let modelItem = ac[0].items.find((item) => item.productId == itemCart.id);
            subtotal += modelItem.price * itemCart.qt;
            let cartItem = c ('.models .cart--item').cloneNode(true);
            cartItem.querySelector('img').src = modelItem.imageUrl;
            cartItem.querySelector('.cart--item-nome').innerHTML = modelItem.name;
            cartItem.querySelector('.cart--item--qt').innerHTML = itemCart.qt;

            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click',()=>{
                if (itemCart.qt > 1 ){
                    itemCart.qt --;
                } else {
                    cart.splice(index, 1);
                }
                updateCart ();
            });

            cartItem.querySelector('.cart--item-qtmais').addEventListener('click',()=>{
                itemCart.qt++;
                updateCart ();
                
            });
            
            c('.cart').append(cartItem);
        });
        desconto = subtotal * 0.1;
        total = subtotal - desconto;
        if (total > 10) {
            c ('.total h1').innerHTML = `Frete gratis`;
        } else {
            c ('.total h1').innerHTML = ``;
        }
        
            
        c ('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        c ('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        c ('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;
    } else {
        c('aside').classList.remove('show');
        c('aside').style.left = '100vw';
    }
};








