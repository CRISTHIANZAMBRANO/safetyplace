const buttonasignar = document.querySelectorAll(".asignar")
buttonasignar.forEach((i, index) => {
    i.addEventListener("click", function (e) {
        const idvul = e.target.dataset.id;
        fetch('/api/agregarworkspace', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
    
            }, body: JSON.stringify({
                idvul
            })
        })
    
            .then(response => response.json())
            .then(data => {
                Swal.fire('Vulneravilidad cargada a tu workspace')
            })
        })
  
  });
