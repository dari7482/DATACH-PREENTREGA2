const productos = [
    {
        name: "IronicPunisment",
        id: "01", type: "Simspon",
        price: 120000, stock: 32,
        description: "Ironic Punishment Macfarlen",
        serie: "McFarlens",
        cantidad: 0,
    },

    {
        name: "LardLadDonuts&Homero",
        id: "02", type: "Simpson",
        price: 210000, stock: 9,
        description: "Lard Lad Donuts & Homero ",
        serie: "McFarlens", cantidad: 0
    },
    {
        name: "KampKrusY",
        id: "03", type: "simpson",
        price: 4530,
        stock: 18,
        description: "Kamp Krusty Totem Pole",
        serie: "McFarlens",
        cantidad: 0
    },
    {
        name: "Homero&Krusty",
        id: "04",
        type: "simpson",
        price: 6730,
        stock: 20,
        description: "Homero & Krusty",
        serie: "McFarlens",
        cantidad: 0
    },
    {
        name: "IslandofDr.Hibbert ",
        id: "05",
        type: "simpson",
        price: 8530,
        stock: 18,
        description: "Island of Dr. Hibbert",
        serie: "McFarlens", cantidad: 0
    },
    {
        name: "“PRESIDENTIAL POLITICS”",
        id: "06", type: "Simspon",
        price: 140000, stock: 32,
        description: "ITCHY & SCRATCHY: ",
        serie: "McFarlens",
        cantidad: 0
    },
    {
        name: "ITCHY & SCRATCHY",
        id: "07",
        type: "Simpson",
        price: 20000,
        stock: 9,
        description: "ITCHY & SCRATCHY",
        serie: "McFarlens",
        cantidad: 0
    },
    {
        name: "RADIOACTIVE MAN AND FALLOUT BOY",
        id: "08",
        type: "simpson",
        price: 3450,
        stock: 18,
        description: "RADIOACTIVE MAN",
        serie: "McFarlens",
        cantidad: 0
    },
    {
        name: "THE RAVEN",
        id: "09",
        type: "simpson",
        price: 3020,
        stock: 20,
        description: "TREEHOUSE OF HORRORS",
        serie: "McFarlens",
        cantidad: 0
    },
    {
        name: "“WHY YOU…”",
        id: "10",
        type: "simpson",
        price: 6020,
        stock: 20,
        description: "HOMER AND BART",
        serie: "McFarlens",
        cantidad: 0
    }
]

let carrito = JSON.parse(localStorage.getItem("carrito")) || []


const agregarCarrito = (objetoCarrito) => {
    // agrega productos al carrito

    carrito.push(objetoCarrito)
    localStorage.setItem('carrito', JSON.stringify(carrito))

    appCarrito()


    //  totalCarritoRender()
}
const renderizarProductos = (produtosRenderizar) => {
    // renderiza productos en el DOM
    const contenedorProductos = document.getElementById("cardcontainer")

    // borramos para no duplicar
    contenedorProductos.innerHTML = ""
    produtosRenderizar.forEach(({ name, id, type, price, stock, description }) => {

        const prodCard = document.createElement("div")
        prodCard.style = "width:15rem"
        prodCard.innerHTML = `
                        <div class="card-container">
                            <div class="card-image">
                                <img src="./img/${id}.png">
                            </div>
                            <div class="card-descripcion">
                                <p>${description}</p>                               
                                <p>$${parseInt(price)}</p>
                            </div>
                            <div class="button-add">
                                <button id="add${id}">+</button>
                                <button id="re${id}">-</button>
                            </div>
                            <div class="button-addcart">
                                <button id="boton${id}">Add To Cart</button>

                            </div>
                            <div class="input-cantidad" >
                                <div id="valorcontador${id}">0</div>
                            </div>
                         </div>  `
        contenedorProductos.appendChild(prodCard)
        const btn = document.getElementById(`boton${id}`)
        const btnAdd = document.getElementById(`add${id}`)
        const btDes = document.getElementById(`re${id}`)
        const valorContador = document.getElementById(`valorcontador${id}`)
        console.log(valorContador)
        let cantidad = ""
        btnAdd.addEventListener("click", (evento) => {

            evento.preventDefault()
            console.log(cantidad)
            cantidad++
            valorContador.textContent = cantidad
        })
        btDes.addEventListener("click", (evento) => {
            console.log(cantidad)
            if (cantidad > 0) {
                cantidad--
                valorContador.textContent = cantidad
            }
        })

        // Funcionalidad al boton de agregar para agregar prods al carrito

        btn.addEventListener("click", (evento) => {
            const cantidadCompra = document.querySelector(`#valorcontador${id}`)
            const guardarCarrito = parseInt(cantidadCompra.textContent)

            agregarCarrito({ name, id, type, price, stock, description, quantity: guardarCarrito })
            /*  renderizarCarrito()
              const form = document.getElementById(`form${id}`)
              form.reset()
          }*/
        })
    })
}


const app = () => {
    renderizarProductos(productos)
}

app()