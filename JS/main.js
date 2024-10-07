
document.addEventListener("readystatechange",(e)=>{
    if(document.readyState ==="complete"){
        const menu =document.querySelector(".menu");

        let requestData = async ()=>{
            const request = await fetch('../data.json');
            const response = await request.json();
         
            return response
        }


        let fillMenuContainer =(()=>{
            requestData().then((items)=>{
                    let fillMenu =items.map((item)=>{
                        return  `<div class="menu-item" id="item_${item.category}">
                                    <div class="menu-img">
                                        <img src="${item.image.desktop}" alt="${item.name}" width="502" height="480">
                                        <div class="add">
                                            <img src="images/icon-add-to-cart.svg" alt="cart icon" class="cart">
                                            <span>Add to Cart</span>
                                        </div>
                                    </div>
                                    <h2 class="menu-heading">${item.category}</h2>
                                    <h3 class="menu-subheading">${item.name}</h3>
                                    <span class="menu-price">&dollar;${item.price.toFixed(2)}</span>
                                </div>`;
                        ;
                    }).join("");
                    
                    menu.innerHTML = fillMenu;
                })
        })()

        let totalQty = 0;

        const qty = document.querySelector(".qty");
        qty.textContent = 0 ;
    }
})





