const drag = function () {
  $(document).ready(function () {
    /* $(".sortable").sortable({
         connectWith: ".contenedorcard",
         animation:150
     });
     $(".sortable").disableSelection();
     $( ".sortable" ).on( "dragenter", function( event, ui ) {console.log(1)} );
     console.log(23);*/
    $(".column").sortable({
      connectWith: ".column",
      handle: ".header",
      stop: function (event, ui) {
        let item = ui.item[0];
        let parentData = item.parentNode.dataset.contenedor;
        let itemData = item.dataset.idcard;
        fetch("/api/validarcolumna",{
          method: "POST",
          body:JSON.stringify({parentData,itemData}), 
          headers:{
            'Content-Type': 'application/json'
          }

        }).then(data=>data.json())
        .then(function (response) {
          console.log(response);
        }).catch(function(e){
          console.log(e);
        })
      }
    });
  });

}
drag();