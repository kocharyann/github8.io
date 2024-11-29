"Латте": {price: 200, checkbox: false, select: false}, 
    "Капучино": {price: 250, checkbox: true, select: false}, 
    "Раф": {price: 300,checkbox: false, select: true} 
}; 
const selectMap = {"select1": 15, "select2": 20, "select3": 25, "select4": 30};
const checkboxPrice = 10; 
window.addEventListener("DOMContentLoaded", function () {
    const quantityInput = document.getElementById("quantityInput");
    const radio = Array.from(document.getElementsByName("radio-type"));
    const Select = document.getElementById("select");
    const checkBox = document.getElementById("checkBox")
    const answerDiv = document.getElementById("answerDiv");
    const render = (price, productState) => {
        if(productState) {
            switch (product) {
                case "product1": {
                    Select.parentElement.style.display = "none";
                    checkBox.parentElement.style.display = "none";
                    break;
                }
                case "product2": {
                    Select.parentElement.style.display = "none";
                    checkBox.parentElement.style.display = "flex";
                    break;
                }
                case "product3": {
                    Select.parentElement.style.display = "flex";
                    checkBox.parentElement.style.display = "none";
                    break;
                }
            }
        }
        if (isNaN(price)) {
            answerDiv.innerText = `Ошибка ввода`; 
        } else {
            answerDiv.innerText =
                `Price: ${price}`;
        }
    }
    const undVal = (el) =>{ return (el===undefined?undefined:el.value)}
    let product = undVal(radio.find(el => el.checked));
    let selectPrice = 0;
    let checkboxCurrentPrice = 0;
    let quantity = quantityInput.value;
    const calc = () => {
        if(quantity === "")
            return 0;
        else if (/^[0-9]+$/.test(quantity)) {
            const prod = productsMap[product]
            return (prod.price + (prod.checkbox?checkboxCurrentPrice:0) + (prod.select?selectPrice:0) )* quantity;
        } else {
            return NaN;
        }
    };

    quantityInput.addEventListener("input", (event) => {
        quantity = event.target.value;
        render(calc(), false);
    })

    radio.forEach((el) => {el.addEventListener("change", (event) => {
        if(event.target.checked) {
            product = event.target.value;
            render(calc(), true);
        }
    })})

    checkBox.addEventListener("change", (event) => {
        if(event.target.checked) checkboxCurrentPrice = checkboxPrice;
        else checkboxCurrentPrice = 0;
        render(calc(), false)
    })

    Select.addEventListener("change", (event) => {
        let sum = 0;
        Array.from(Select.selectedOptions).forEach((el) => sum += selectMap[el.value]);
        selectPrice = sum;
        render(calc(), false)
    })


});
