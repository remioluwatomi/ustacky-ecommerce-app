function toggleDisplay(){
  let cartt = document.querySelector("section#cart");
  cartt.classList.toggle("toggleDisplay");
}

let clientObj = {};


function paymentComplete(){
  

  let table = document.getElementById("tab");
  let cart = document.getElementById("cart");
  let cartChildren = Array.from(cart.children);
  let btnDiv = document.querySelector("div#cart-btn-div");

  table.style.padding = "15px";

  cartChildren.forEach(function(item){
    
  //  if (item === table){
  //   for(let i = 0; i < item.children.length; i++){
  //     item.children[i].classList.add("paystack-leftalign");

  //    for(let gCIndex = 0; gCIndex < item.children[i].children; gCIndex++){        //gcIndex = grandChildIndex
  //     console.log(item.children[i][gCIndex]);
  //    }        
  //   }
  //  }
    
    if ( item != table && item != btnDiv){
        cart.removeChild(item);
        }

    if (item === btnDiv){
      let okBtn = document.getElementById("checkOut-btn")
      item.removeChild(document.getElementById("continueShopping"));
      okBtn.textContent = "Ok";
      okBtn.style.paddingLeft = "50px";
      okBtn.style.paddingRight = "50px";
      okBtn.setAttribute("id", "ok-btn"); 
    }
  });


  let Novisibility = document.getElementsByClassName("paystack-response-visibility");

  Array.from(Novisibility).forEach(function(visibleItem){
    visibleItem.style.visibility = "hidden";
  })


  let summaryDiv = document.createElement("div");
  summaryDiv.classList.add("summary-div");

  let clientName = clientObj.clientName;
  let thankYouP = document.createElement("p");
  thankYouP.classList.add("order-received");
  let theankYouMsg = "Thank You, <span class=\"orange-name\">" + clientName + "</span>, Your Order Has Been Received";
  thankYouP.innerHTML = theankYouMsg;

  summaryDiv.appendChild(thankYouP);

  let summaryDivImg = document.createElement("div");
  summaryDivImg.setAttribute("class", "summaryDivImg");
  let summaryImg = document.createElement("img");
  summaryImg.setAttribute("src", "Images/check.svg");
  summaryDivImg.appendChild(summaryImg);

  summaryDiv.appendChild(summaryDivImg);

  let summaryTextP = document.createElement("p");
  summaryTextP.classList.add("summary-text");
  let summaryText = "Summary";
  summaryTextP.textContent = summaryText;

  summaryDiv.appendChild(summaryTextP);



  cart.insertBefore(summaryDiv, cart.firstChild)

  setTimeout(toggleDisplay, 2000)

}


function payWithPaystack(e) {
  
  let handler = PaystackPop.setup({
    key: 'pk_test_7b1109e3815866debdbbadcd56546e9bbf779221', // Replace with your public key
    email: document.querySelector("#imail-div input").value,
    amount: document.getElementById("amountb4Checkout").textContent * 100,
    ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
    // label: "Optional string that replaces customer email"
    onClose: function(){
      alert('Window closed.');
    },
    callback: function(response){
      paymentComplete();
    }
  });

  handler.openIframe();
}

function formWarning(parentEl, msg){
  let msgEl = document.createElement("p");
  msgEl.classList.add("red");
  let msgNode = document.createTextNode(msg);
  msgEl.appendChild(msgNode);

  parentEl.appendChild(msgEl);
}


function formValidate(e){

  let nameRtn, mailRtn, phoneNumRtn;

  function nameValidate(){

    let nameEl = document.querySelector("form div#iname-div input").value;
    let parentNodez = document.getElementById("iname-div");
    let warnNode = document.querySelector("#iname-div > p.red");

    if (nameEl === ""){
      if (Array.from(parentNodez.children).includes(warnNode)){
        parentNodez.removeChild(warnNode);
      }
        
        let warnMsg = "Name cannot be blank. Please Enter your name";
        formWarning(parentNodez, warnMsg);
        nameRtn = false;

    }else{
        nameRtn = true;
        clientObj.clientName = nameEl
        
        if (Array.from(parentNodez.children).includes(warnNode)){
          parentNodez.removeChild(warnNode);
          
        }
      }
    }


    function emailValidate(){
      let emailEl = document.querySelector("form div#imail-div input").value;
      let parentNodez = document.getElementById("imail-div");
      let warnNode = document.querySelector("#imail-div > p.red");

      if (emailEl === ""){
        if (Array.from(parentNodez.children).includes(warnNode)){
          parentNodez.removeChild(warnNode);
        }

        let warnMsg = "Please enter your email";
        formWarning(parentNodez, warnMsg);
        mailRtn = false;

      } else if (!emailEl.includes("@") || !emailEl.includes(".")){
        

        if (Array.from(parentNodez.children).includes(warnNode)){
          parentNodez.removeChild(warnNode);
        }

        let warnMsg = "Invalid email format";
        formWarning(parentNodez, warnMsg);
        mailRtn = false;

      }else{
        mailRtn = true;
        clientObj.email = emailEl;
        if (Array.from(parentNodez.children).includes(warnNode)){
          parentNodez.removeChild(warnNode);
        }
      }

    }


    function phoneNumValidate(){

      let phoneEl = document.querySelector("form div#iphone-div input").value;
      let parentNodez = document.getElementById("iphone-div");
      let warnNode = document.querySelector("#iphone-div > p.red");

      if (phoneEl === ""){
        if (Array.from(parentNodez.children).includes(warnNode)){
          parentNodez.removeChild(warnNode);
        }

        let warnMsg = "Please enter your phone number";
        formWarning(parentNodez, warnMsg);
        phoneNumRtn = false;

      } else {
        let checkLength = true;

        for (let i = 0; i < phoneEl.length; i++){

          if (isNaN(phoneEl[i])){

            if (Array.from(parentNodez.children).includes(warnNode)){
              parentNodez.removeChild(warnNode);
            }

            let warnMsg = "Phone number should only be numbers";
            formWarning(parentNodez, warnMsg);

            checkLength = false;
            phoneNumRtn = false;
            break;
          }
        }

        if (checkLength){

          for (let charIndex = 0; charIndex < phoneEl.length; charIndex++){
            if (phoneEl[charIndex] === " "){
              phoneEl = phoneEl.replace(phoneEl[charIndex], "");
            }
          }

          if(phoneEl.trim().length != 11){
            
            if (Array.from(parentNodez.children).includes(warnNode)){
              parentNodez.removeChild(warnNode);
            }

            let warnMsg = "Phone number should not be less than or greater than 11";
            formWarning(parentNodez, warnMsg);
            phoneNumRtn = false;
              
          }else{
            phoneNumRtn = true;
            clientObj.phoneNum = phoneEl;
            if (Array.from(parentNodez.children).includes(warnNode)){
              parentNodez.removeChild(warnNode);   
          }
        }

      }
    }
  }

    if (e.target === document.querySelector("form div#iname-div input")){
        nameValidate();
    }else if (e.target ===document.querySelector("form div#imail-div input")){
        emailValidate();
    }else if (e.target ===document.querySelector("form div#iphone-div input")){
        phoneNumValidate();
    }else if (e.target === checkOutBtn){
          nameValidate();
          emailValidate();
          phoneNumValidate();
    }



      if (nameRtn && mailRtn && phoneNumRtn){
        return true;
      }else{
        return false;
      }

    }

  


let formInpts = document.querySelectorAll("form#cartForm div.i-div input.ifield");

formInpts.forEach(function(item){
  item.addEventListener("blur", function(e){
    formValidate(e);
  }, false);
})



function checkOut(e){
  if (e.target.textContent === "Ok"){
    console.log("a")
    window.location.reload();
  }

  if (document.getElementById("amountb4Checkout").textContent === "0"){
    alert("Ooops! 😑😥 You selected zero product");
    return false;
  }

  if (formValidate(e)){
    toggleDisplay()
    payWithPaystack()
  }
}

let checkOutBtn = document.getElementById("checkOut-btn");
let shoppingContd = document.getElementById("continueShopping");
let cartBtn = document.getElementById("cart-div");

// event listener for cart btn and continue shopping 
cartBtn.addEventListener("click", toggleDisplay,false);
shoppingContd.addEventListener("click", toggleDisplay,false);

checkOutBtn.addEventListener("click", function(e){
  checkOut(e);
}, false)

