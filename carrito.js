const renderizarCarrito = (productosGuardados) => {
    const contenedorCarrito = document.getElementById("contCarrito")
    const modalContainer = document.getElementById("navContainer")
    contenedorCarrito.innerHTML = ""
    //modalContainer.innerHTML = ""

    const carritoImagen = document.createElement("p")
    const carritoModal = document.createElement("div")

    if (productosGuardados.length > 0) {

        //const productoGuardadodTotal = productosGuardados.map((item) => item.quantity).reduce((total, quantity) => total + quantity)
        const result = productosGuardados.reduce((acc, curr) => {

            const found = acc.find(item => item.id === curr.id);

            if (found) {
                found.quantity = parseInt(curr.quantity) + parseInt(found.quantity)
            } else {
                acc.push(curr)
            }

            return acc


        }, [])
        console.log(result)

        total = result.map((item) => item.quantity).reduce((acc, curr) => parseInt(acc) + parseInt(curr), 0)
        console.log(total)
        carritoImagen.innerHTML = `<img  id="contenidoCarrito" src="/img/cart-icon-28356.png">
                                    <p class="itemsGuardados">${total}</p>`
        contenedorCarrito.appendChild(carritoImagen)

        const modalCarrito = document.getElementById("contenidoCarrito")
        const btnCerrar = document.getElementById("close")
        const btnComprar = document.getElementById("comprar")
        const btnEliminar = document.getElementById("vaciar")
        modal_container = document.getElementById("modal_container")


        modalCarrito.addEventListener("click", (evento) => {
            evento.preventDefault()
            console.log("modal")
            modal_container.classList.add('show')
            const contenedorCarrito = document.getElementById("renderizarCarrito")
            contenedorCarrito.innerHTML = ""


            // borramos para no duplicar
            console.log(result)

            result.forEach(({ id, price, description, quantity }) => {
                console.log(id)
                const prodCardCarrito = document.createElement("div")
                prodCardCarrito.style = "width:15rem"
                prodCardCarrito.innerHTML = `
                                 <div class="container-modal">                               
                                    <div class="card-descripcion">
                                        <p>Descripcion:${description}</p>                               
                                        <p>Price:${price}</p>
                                        <p>Quantity:${quantity}</p>
                                        <p>Total:$ ${parseInt(quantity) * parseInt(price)}</p>
                                    </div> 
                                    <div class="image-modal">
                                          <img src="/img/${id}.png">
                                     </div>
                                 </div>                                                                                                           
                                 `
                contenedorCarrito.appendChild(prodCardCarrito)
            })

        })

        btnCerrar.addEventListener("click", (evento) => {
            modal_container.classList.remove('show')


        })

        btnComprar.addEventListener("click", (evento) => {
            modal_container.classList.remove('show')
            console.log(productosGuardados)

            localStorage.removeItem("carrito")
            console.log(carrito)
            localStorage.clear();
            console.log(carrito)
            location.reload()
            alert("comprar realizada exitosamente")
            appCarrito()

        })

        btnEliminar.addEventListener("click", (evento) => {
            modal_container.classList.remove('show')
            localStorage.removeItem("carrito")
            console.log(carrito)
            location.reload()
            console.log(carrito)


            appCarrito()

        })

    } else {
        carritoImagen.innerHTML = `<img src="/img/cart-icon-28356.png">`
        contenedorCarrito.appendChild(carritoImagen)


    }


}

const appCarrito = () => {

    let productosGuardados = JSON.parse(localStorage.getItem('carrito')) || []

    console.log(productosGuardados)
    renderizarCarrito(productosGuardados)

}

appCarrito()