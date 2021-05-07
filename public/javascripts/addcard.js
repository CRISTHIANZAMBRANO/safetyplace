let a = document.querySelectorAll(".contenedorcard");
var myModal = new bootstrap.Modal(document.getElementById('exampleModal'))
let indexcolumn = 0;
a.forEach((i, index) => {
  i.addEventListener("dblclick", function () {
    myModal.show()
    indexcolumn = index;
  });

});
myModal._element.querySelector(".guardar").addEventListener("click", function () {


  const editbutton = document.createElement("a");
  editbutton.classList.add("btn", "btn-primary");
  editbutton.innerHTML = "Editar";
  editbutton.onclick = function () {
    console.log("sirve")
  }
  
  //crear popup element HTML
  const popup = `
    <div class="row ">
      <div class="card text-center ">
        <div class="card-header">
          Featured
        </div>
        <div class="card-body">
          <h5 class="card-title">Descripcion</h5>
          
          
        </div>
        <div class="card-footer text-muted">
       
        </div>
      </div>
    </div>
    <style>
    .row{
      margin-left:0;
      box-sizing: border-box;
      border-radius: 10px;
      display: inline-block;
      vertical-align: top;
      width:272px;
    }
    .fecha{
      background-color: none;
      color: black;
    }
    </style>
`;

  let doc = new DOMParser().parseFromString(popup, "text/html").body;
  //doc.querySelector(".card-body").appendChild(editbutton);
  //console.log(doc);
  a[indexcolumn].appendChild(doc);

 //Poner fecha actual de sistema a las cards
 const fechita =function(){
  var d = new Date();
  var z =d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear();
  let date=document.createElement("div");
  date.classList.add("fecha");
  date.type="text";
  date.innerText=z;
  doc.querySelector(".card-footer").appendChild(date);

 }
 //Poner campos en el card

 const llenarcard=function(){
  
  let nombre= $("#nombrevul").val();
  const nom=document.createElement("p");
  nom.innerText=nombre;
  doc.querySelector(".card-header").appendChild(nom)
  let descripcion=$("#descri").val();
  const desc=document.createElement("p");
  desc.innerText=descripcion;
  doc.querySelector(".card-body").appendChild(desc)
 }
 
llenarcard();
fechita();
const eliminar=`<a href="/api/delete/<%= muestra[i]._id %>" class="btn btn-danger d_flex">Delete</a>`
const editar=`<a href="/edit/<%= muestra[i]._id %>" class="btn btn-info d_flex">Edit</a>`
let eli= new DOMParser().parseFromString(eliminar,"text/html").body;
let edit=new DOMParser().parseFromString(editar,"text/html").body;
doc.querySelector(".card-body").appendChild(edit)
doc.querySelector(".card-body").appendChild(eli)
  drag();
})



