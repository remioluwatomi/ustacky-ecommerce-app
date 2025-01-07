


let table = document.querySelector("table")


let numOfItem = document.querySelector("button#cart-div span");


let add2CartBtn = document.querySelectorAll("button.add2cart");


function updatePrice(){
    let totalPrice = document.getElementById("amountb4Checkout").textContent;
    let elInTable = table.children;
    let newPrice = 0;
    for(let i = 1; i < elInTable.length; i++){
        let price2Slice = elInTable[i].querySelector("td.tempPrice").textContent.slice(1);
    newPrice+= Number(price2Slice);   
}
    document.getElementById("amountb4Checkout").textContent = newPrice;  
}


// serial number function
function SN(){
    let SN = table.children.length
    return SN
}


// function for the table event 
function tableEvent(e){

    // if user click on the remove button 

    if(e.target.classList.contains("tempRmvBtn")){
        // CHANGE THE "REMOVE BUTTON STRING"
        let toBeRmvProduct = e.target.parentNode.parentNode.getAttribute("data-product");
        for(let i = 0; i < add2CartBtn.length; i++){
            if(add2CartBtn[i].getAttribute("data-product") === toBeRmvProduct){
                add2CartBtn[i].textContent = "ADD TO CART";
            }
        }


        table.removeChild(e.target.parentNode.parentNode);
        numOfItem.innerHTML = Number(numOfItem.textContent) - 1;
        let tdSN = table.getElementsByClassName("tempS/N");
        removeSN= SN() - (SN() - 1);
        for(let i = 0; i<tdSN.length; i++){
            
            tdSN[i].innerHTML= removeSN;
            removeSN += 1;
        }

    //    else if user click on the add or minus button 
    }else if(e.target.classList.contains("minusPlus")){

        // get currentProductPrice
        let currentProductPrice = e.target.parentNode.parentNode.querySelector("td.tempPrice").textContent;
        nairaSign = currentProductPrice[0];
        currentProductPrice = currentProductPrice.slice(1);

        // get source price
        let dataProductValue = e.target.parentNode.parentNode.getAttribute("data-product");
        srcValue = document.querySelector("article div.productImg-div div.price-absolute > p.p-price span[data-priceproduct = \"" + dataProductValue +"\"]").textContent;

        // users will need the current price and source price in order to increase or decrease the price when the quantity
        // of a product increases or decreases


        spanUnitEl = e.target.parentNode.parentNode.querySelector("span.spanUnitNum").textContent;
        if (e.target.classList.contains("minus")){
           

                if(spanUnitEl == 1){
                alert("You can't purchase less than a single unit of a product. If you need to remove the item, click Remove.");
                }else{
                let spanResult = Number(spanUnitEl) - 1;
                spanUnitEl = spanResult;
                e.target.parentNode.parentNode.querySelector("span.spanUnitNum").textContent = spanResult;

                let subtractedPriceResult = Number(currentProductPrice) - Number(srcValue);
                subtractedPriceResult = subtractedPriceResult.toString();
                subtractedPriceResult = nairaSign + subtractedPriceResult;
                e.target.parentNode.parentNode.querySelector("td.tempPrice").textContent = subtractedPriceResult;
                }


        }else if(e.target.classList.contains("plus")){
        spanResult = Number(spanUnitEl) + 1;
        e.target.parentNode.parentNode.querySelector("span.spanUnitNum").textContent = spanResult;

        let addedPriceResult = Number(currentProductPrice) + Number(srcValue);
        addedPriceResult = addedPriceResult.toString();
        addedPriceResult = nairaSign + addedPriceResult;
        e.target.parentNode.parentNode.querySelector("td.tempPrice").textContent = addedPriceResult;
    }
    }

    updatePrice();
}



function addAndRmvFrmCart(e){
    let product = e.target.getAttribute("data-product");
    let Pprice = e.target.parentNode.parentNode.querySelector("p.p-price").textContent;
    let tableRow = document.createElement("tr");
    tableRow.setAttribute("data-Product", e.target.getAttribute("data-product"));

    switch(e.target.textContent){
        case "ADD TO CART":
            e.target.textContent = "REMOVE FROM CART";
            numOfItem.innerHTML = Number(numOfItem.textContent) + 1;
            // create template
            
            let tableRowInner = "<td class=\"template tempS/N\">" + SN() + "</td> <td class=\"template tempProduct\">" + product + "</td>";
            tableRowInner += "<td class=\"template tempPrice paystack-response-visibility\">" + Pprice +"</td><td class=\"template tempBtn\">";
            tableRowInner += "<button class=\"orangeBgC minusPlus minus paystack-response-visibility\">-</button> <span class=\"spanUnitNum\">1</span><button class=\"orangeBgC minusPlus plus paystack-response-visibility\">+</button></td>";
            tableRowInner += "<td><button class=\"tempRmvBtn lightPale paystack-response-visibility\">Remove</button></td>";
            tableRow.innerHTML= tableRowInner;
            table.appendChild(tableRow);

            updatePrice();
            break;
            

        case "REMOVE FROM CART":
            e.target.textContent = "ADD TO CART"
            if(numOfItem.textContent > 0) {
                numOfItem.innerHTML = Number(numOfItem.textContent) - 1;
            }
            for(let i = 0; i < table.children.length; i++){
                if(table.children[i].getAttribute("data-Product") === e.target.getAttribute("data-product")){
                    table.children[i].remove()
                    break;
                } 
            }
            updatePrice();
            break;
    }
}

table.addEventListener("click", function(e){
    tableEvent(e);
}, false);

for(let i = 0; i < add2CartBtn.length; i++){
    add2CartBtn[i].addEventListener("click", function(e){
        addAndRmvFrmCart(e);
    }, false);
}