const drag= function(){
    $(document).ready(function () {
        $(".sortable").sortable({
            connectWith: ".contenedorcard",
            animation:150
        });
        $(".sortable").disableSelection();
    });
    
}
drag();