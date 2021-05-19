let a = document.querySelectorAll(".contenedorcard");
var myModal = new bootstrap.Modal(document.getElementById('exampleModal'))
let indexcolumn = 0;
a.forEach((i, index) => {
  i.addEventListener("dblclick", function () {
    myModal.show()
    indexcolumn = index;
  });

});
myModal._element.querySelector(".guardar").addEventListener("click", function (e) {
  e.preventDefault();
  var vulnerabilidad = $('form').serializeArray().reduce(function(obj, item) {
    obj[item.name] = item.value;
    return obj;
}, {});
  let u=$(".identificacion").val();
  console.log(u)
  vulnerabilidad.idus=u;
  fetch('https://safetyplace.herokuapp.com/api/add', { method: "POST",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'mode':'no-cors'
  }, body: JSON.stringify(vulnerabilidad) })

    .then(response => response.json())
    .then(data => {
      console.log(data);
      //crear popup element HTML
      const tarjeta = `
  <div class="row ">
    <div class="card text-center ">
      <div class="card-header">
        
      </div>
      <div  class="card-body">
        <h6 class="card-title">Descripcion</h6>
        
      </div>
      <div class="card-footer text-muted fecha">
     
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
  .fecha{
    justify-content: center;
  }
  .accion{
    justify-content: center;
    display: flex;
    flex-direction: row;
  }
  </style>
`;

      let doc = new DOMParser().parseFromString(tarjeta, "text/html").body;
      //doc.querySelector(".card-body").appendChild(editbutton);
      //console.log(doc);
      a[indexcolumn].appendChild(doc);
      
      const nom = document.createElement("h5");
      nom.innerText = data.vulnerabilidad;
      doc.querySelector(".card-header").appendChild(nom)
      const desc = document.createElement("p");
      desc.innerText = data.impacto;
      doc.querySelector(".card-body").appendChild(desc)
      const bt=document.createElement("div")
      bt.classList.add("accion")
      doc.querySelector(".card-body").appendChild(bt)
      const eliminar = `<a href="/api/delete/${data._id}" class="btn btn-danger ">Delete</a>`
      const editar = `<a href="/edit/${data._id}" class="btn btn-info ">Edit</a>`
      const view=`<a href="/info/${data._id}" class="btn btn-info ">Ver</a>`
      let eli = new DOMParser().parseFromString(eliminar, "text/html").body;
      let edit = new DOMParser().parseFromString(editar, "text/html").body;
      let ver = new DOMParser().parseFromString(view, "text/html").body;
      doc.querySelector(".accion").appendChild(edit)
      doc.querySelector(".accion").appendChild(eli)
      doc.querySelector(".accion").appendChild(ver)
      var d = new Date();
      var z = d.toDateString();
      let date = document.createElement("p");
      date.classList.add("fecha");
      date.type = "text";
      date.innerText = z;
      doc.querySelector(".card-footer").appendChild(date);
      drag();
      
    }
    )
  return


  
  
})



