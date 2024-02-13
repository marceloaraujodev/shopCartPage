const cartContainerBtn = document.querySelector('.cartContainerButton')
const quantityDisplay = document.querySelector('.number');
const cartBoxEl = document.querySelector('.cartBox')
const avatarEl = document.querySelector('.avatar');
const containerGalleryEl = document.querySelector('.containerGallery');
const overlayContainer = document.querySelector('.overlay');


// global Variables
const PRICE = 125.00
let amount = 1;
let itemsInCart = 0;
let cart; 
let currentSlideIndex = 1;

// Event listeners
document.body.addEventListener('click', closeOverlayFunc)
cartContainerBtn.addEventListener('click', cartQuantityClick);
cartBoxEl.addEventListener('click', cartBoxClicks)
avatarEl.addEventListener('click', handleAvatarClicks);
containerGalleryEl.addEventListener('click', onPageGallery);

document.querySelector('.hero.onPageGallery').addEventListener('dblclick', openOverlay)

const x = document.querySelector('.headerContainer').addEventListener('click', menu);
console.log(x)

quantityDisplay.innerText = amount;


// functions

function openOverlay(e){

    const markUp = `
       <div class="overlay">
                <div class="box1 heroImgOverlayBox">
                    <div class='heroImg heroImgOverlay'>
                    <div>
                        <img src=./public/img/image-product-1.jpg
                        alt="productPhoto"
                        class='hero heroOverlay'
                        />
                    </div>
                    <i
                        class='fa-solid fa-angle-left arrowLeft arrowLeftOverlay'
                        data-action="left"
                    ></i>
                    <i class='fa-solid fa-angle-right arrowRight arrowRightOverlay'
                        data-action="right"
                    ></i>
                    <i class="fas fa-times closeOverlay"></i>
                    </div>
            
                    <div class='smallContainer overlay'>
                        <img class="small" src="./public/img/image-product-1-thumbnail.jpg" />
                        <img class="small" src="./public/img/image-product-2-thumbnail.jpg" />
                        <img class="small" src="./public/img/image-product-3-thumbnail.jpg" />
                        <img class="small" src="./public/img/image-product-4-thumbnail.jpg" />
                    </div>
                </div>
            
        </div>
    `;
    
    if(e.target.classList.contains('hero')){
        if (!document.querySelector('.overlay')) {
            document.querySelector('.containerOverlay').insertAdjacentHTML('afterbegin', markUp);
        }
        document.querySelector('.overlay').classList.add('activeOverlay');
        document.body.addEventListener('click', handleOverlayClick);
    }
};


function closeOverlayFunc(e){
    if(e.target.classList.contains('closeOverlay')){
        document.querySelector('.overlay').classList.remove('activeOverlay');
        document.querySelector('.overlay').remove();
        document.body.removeEventListener('click', handleOverlayClick);
    }
}

// Handle clicks when overlay active
function handleOverlayClick(e){
    const direction = e.target.dataset.action;
    const thumbnails = document.querySelectorAll('.smallContainer.overlay .small').length;
    const heroImgBoxOverlay = document.querySelector('.hero.heroOverlay')
    imgFunctionality(e, direction, thumbnails, heroImgBoxOverlay);
}

function onPageGallery(e){
    // openOverlay(e)
    const direction = e.target.dataset.action;
    const thumbnails = document.querySelectorAll('.smallContainer.onPage .small').length;

    imgFunctionality(e, direction, thumbnails);
}

function imgFunctionality(e, direction, thumbnails, heroImgBoxOverlay){
    const heroImgBox = document.querySelector('.hero.onPageGallery')
    let src;
    
    if(direction === 'right'){
        // loop (currentSlideIndex % thumbnails) + 1;
        // stops at first and last img 👇
        // (currentSlideIndex < thumbnails) ? currentSlideIndex + 1 : thumbnails; 
        currentSlideIndex = (currentSlideIndex % thumbnails) + 1;
    }
    if(direction === 'left'){
        // loop ((currentSlideIndex - 2 + thumbnails) % thumbnails) + 1
        // loop (currentSlideIndex > 1) ? currentSlideIndex - 1 : 1;
        currentSlideIndex = ((currentSlideIndex - 2 + thumbnails) % thumbnails) + 1;
    }
    src = `./public/img/image-product-${currentSlideIndex}.jpg`;
    heroImgBox.src = src; 

    if(heroImgBoxOverlay) heroImgBoxOverlay.src = src;

    // sets the thumbnail to the bigger img
    if(e.target.classList.contains('small')){
        const link = e.target.src
        const newLink = link.replace(/-thumbnail/, '') // regex
        document.querySelector('.hero').setAttribute('src', newLink)
            // Update currentSlideIndex when a thumbnail is clicked
        const thumbnailIndex = Array.from(document.querySelectorAll('.small')).indexOf(e.target);
        currentSlideIndex = thumbnailIndex + 1;
    }
}

// handle clicks on the avatar div
function handleAvatarClicks(e){
    if(e.target.id === 'cartIcon'){
        displayCart();
    }
}

// handle clicks on the cartBox div
function cartBoxClicks(e){
    if(e.target.dataset.action === 'closeCart'){
        closeCart();
    }
    if(e.target.name === 'trash'){
        const containerDescription = e.target.closest('.cartContainerProductsDescription')
        removeFromCart(containerDescription);
    }
    if(e.target.name === 'cartIcon'){
    }
}

// clicking the plus minus
function cartQuantityClick(e){

    if(amount < 1) return;

    if(e.target.name === 'plus'){
        amount += 1;
    }
    if(e.target.name === 'minus'){
        // amount never reaches 0;
        if(amount > 1){
            amount -= 1;
        }
    }
    if(e.target.name === 'addToCart'){
        addToCart()
    }
    updateQuantity()
    return amount
}
// Updates quantity and displays price
function updateQuantity(){
    document.querySelector('h2').innerText = `$${(amount * PRICE).toFixed(2)}`
    quantityDisplay.innerText = amount;
}

// adds to cartbox and inserts html in the box
function addToCart(){
    let total = PRICE * amount;
    itemsInCart += 1;
    document.querySelector('.notification').classList.add('active');
    document.querySelector('.notification').innerText = itemsInCart;
    removeEmptyEl()

    const markUp = `
    <div class='cartContainerProductsDescription'>
        <img src="./public/img/image-product-1-thumbnail.jpg" alt="profile-pic" class='cartItemPic'/>

        <div class='cartContentDescription'>
        Fall Limited Edition Sneakers
            $${PRICE.toFixed(2)} x ${amount} $${total.toFixed(2)}
        </div>
        <img src="./public/img/icon-delete.svg" class='cartTrash' name="trash" alt="cart-icon"/>
    </div>
    `;
    document.querySelector('.cartBoxEl').insertAdjacentHTML('afterbegin', markUp);
    document.querySelector('.cartBox').classList.add('active');
}

// Closes the cart window
function closeCart(){
    document.querySelector('.cartBox').classList.remove('active');     
}

// removes items from cart
function removeFromCart(item){
    if(item){
        item.remove()
        itemsInCart -= 1;
        document.querySelector('.notification').innerText = itemsInCart;
        emptyCart()
    }
}

// When clicked displays the cartbox and items
function displayCart(){
    removeEmptyEl()
    emptyCart()
    document.querySelector('.cartBox').classList.add('active');
}

// if cart is empty
function emptyCart(){
    if(itemsInCart === 0){
        const markUp = '<div class="emptyCart">You cart is Empty!</div>'
        document.querySelector('.notification').classList.remove('active');
        document.querySelector('.cartBoxEl').insertAdjacentHTML('afterbegin', markUp);
    }
}

// if empty div from cart exists removes it
function removeEmptyEl(){
    const emptyEl = document.querySelector('.emptyCart');
    if(emptyEl){
        emptyEl.remove();
    }
}

// shrink-menu

function menu (e){
    console.log(e.target.classList.contains('menuIcon'))
    if(e.target.classList.contains('menuIcon')){
        document.querySelector('.shrink-menu').classList.toggle('active');
    }
}