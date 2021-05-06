let res = document.getElementById("res");

let resvalue = document.getElementById("resvalue");

console.log(resvalue.value);

if (res.value != "") {
    console.log("entra")
    setTimeout(function(){
        res.classList.add('oculto');
    }, 3000);
}