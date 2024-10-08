// This generates the content
document.addEventListener("readystatechange",(e)=>{
    if(document.readyState ==="complete"){
        const menu =document.querySelector(".menu");

        let basket = [];

        let requestData = (async ()=>{
            const request = await fetch('../data.json');
            const response = await request.json();
         
            return response
        })();
        
        
        let selectItem =(header)=>{
            requestData.then((items)=>{
              Array.from(items).forEach((item)=>{
                if(item.category == header){
                    saveItem(item);
                    
                }
              })
            })
        }

        let saveItem =(item)=>{

            let saveitem =  {
                                category:item.category,
                                price:item.price,
                                qty:1
                            }


            let bb = basket.find((item)=>{
                if(item.category === saveitem.category){
                    return item
                }
            })

            
            let minus =document.getElementsByClassName("minus");
            let plus =document.getElementsByClassName("plus");

            

           if(bb === undefined){
               basket.push(saveitem);

                displayTotalQtyInCart(totalQtyInCart(getQtyArray()));
           }

           addClickEvent(minus,"click",decrement);
           addClickEvent(plus,"click",increment);
        }

        

        let fillMenuContainer =(()=>{
            requestData.then((items)=>{
                
                    let fillMenu =items.map((item)=>{
                        let itemId =item.category.split(" ");
                        
                        let cate = itemId[0]

                        return  `<div class="menu-item" id="item_${cate}">
                                    <div class="menu-img">
                                        <img src="${item.image.desktop}" alt="${item.name}" width="502" height="480">
                                        <div class="add" id ="${cate}">
                                            <img src="images/icon-add-to-cart.svg" alt="cart icon" class="cart">

                                            <span>Add to Cart</span>
                                        </div>
                                    </div>
                                    <h2 class="menu-heading">${itemId.join(" ")}</h2>
                                    <h3 class="menu-subheading">${item.name}</h3>
                                    <span class="menu-price">&dollar;${item.price.toFixed(2)}</span>
                                </div>`;
                        ;
                    }).join("");
                    
                    menu.innerHTML = fillMenu;

                    let addItems = Array.from(menu.getElementsByClassName("add"));

                    chooseItem(addItems);

                })
        });

        fillMenuContainer();

        let totalQty = 0;

        const qty = document.querySelector(".qty");
        qty.textContent = 0 ;

        const chooseItem =(items)=>{
            // Add a click event to each Item

            for (let item of items){
                
                item.addEventListener("click",(e)=>{

                    item.classList.add("active");
                    item.innerHTML =`
                        <img src="images/icon-decrement-quantity.svg" alt="minus icon" class="minus">

                        <span class="itemQty"> ${1}</span>

                        <img src="images/icon-increment-quantity.svg" alt="plus icon" class ="plus">
                        
                    `
                    let parentIItem =item.closest(`#item_${item.id}`);

                    item.closest(".menu-img").classList.add("active");

                    const itemHeading = parentIItem.querySelector(".menu-heading");
                    

                    let itemImage;

                    selectItem(itemHeading.textContent);

                })
            }

        }

        chooseItem();

        function addClickEvent(elements,event,dothis){
            Array.from(elements).forEach((element)=>{
                element.addEventListener(event,(e)=>{
                    e.stopPropagation();
                    const parentAdd =element.closest(".add");
                    const parentAddId =parentAdd.id
                    let qty = parentAdd.querySelector("span.itemQty");

                    dothis(qty,parentAddId);
                })
            })
        }

        function increment(qty,category){
            
            basket.forEach((basketItem)=>{
                let name = basketItem.category.split(" ")[0];
                if(name ===category){
                    basketItem.qty += 1;
                    update(qty,basketItem.qty);
                    displayTotalQtyInCart(totalQtyInCart(getQtyArray()));
                }
            })

            console.log(basket)

        }

        function decrement(){
            console.log("Decremented");
        }

        function update(element,content){
            element.textContent = Number(content)
        }

        function getQtyArray(){

            return basket.map((item)=>{
                item = item.qty;
                return item
            })
        }

        function totalQtyInCart(array){
            return array.reduce((totalQty,num)=>{
                return totalQty + num;
            },0)
        }

        function displayTotalQtyInCart(num){
            document.querySelector("aside .qty").textContent =num;
        }
    }    

})

