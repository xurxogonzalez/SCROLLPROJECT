/**
    document.getElementById()
    getFullYear() //Utilizado con new Date()
    getBoundingClientRect() //El método Element.getBoundingClientRect() devuelve el tamaño de un elemento y su posición relativa respecto a la ventana de visualización (viewport).
    slice method
    window.scrollTo()
 */
const linksContainer = document.querySelector(".links-container");
const yearEl = document.querySelector("#year");
const nav = document.querySelector(".nav");

yearEl.textContent = new Date().getFullYear();

const getPresentacion = async () => {
    try {
        let datos = null;
        let response = await fetch('https://raw.githubusercontent.com/webferrol/json/master/formacion-academica.json');
        if(!response.ok)
            throw new Error(`Error HTTP. status: ${response.status}`);
        else{
            //obtenemos un objeto y lo destructuramos (destructuring) para obtener un campo (field) "presentación"
            const {presentacion} = await response.json();
            //presentación es un array de un elemento. Lo devolvemos en formato string
            return presentacion.join();
        }
        
    } catch (error) {
        console.error("Catch Error Xurxo " +error);
        return false;
    }

}

getPresentacion().then(txtPresentacion=>{
    if(txtPresentacion)
        document.querySelector(".banner__txt").innerHTML = txtPresentacion;
    }
);

/**
 * fixed navbar
 */

window.addEventListener(
    "scroll",
    ()=>{
        const scrollHeight = window.pageYOffset; 
        const navHeight = nav.getBoundingClientRect().height;
        if(navHeight>scrollHeight)
            nav.classList.add("nav--fixed");
        else
            nav.classList.remove("na--fixed");

        if(scrollHeight>500)
            document.querySelector(".fa-arrow-circle-up").classList.add("show-link");
        else
        document.querySelector(".fa-arrow-circle-up").classList.remove("show-link")
    }
);

document.querySelector(".nav__header--btn")
.addEventListener(
    "click",
    e=>{    
        linksContainer.classList.toggle('links-container--toggle');
        //const containerHeight = linksContainer.getBoundingClientRect();       
    }
);