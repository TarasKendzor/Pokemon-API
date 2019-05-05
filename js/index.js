let div = document.getElementById('main');

fetch("https://pokeapi.co/api/v2/pokemon?limit=12").then(res => res.json()).then(render)

function render(entries) {
    entries.results.forEach(entry => {
        fetch(entry.url).then(res => res.json()).then(getItemList)

        function getItemList(el) {
            let parentDiv = document.getElementById('main-block')
            let rend = document.createElement('div');
            rend.classList.add('pokemon-wrapper', el.types[0].type.name)
            let blockContent = parentDiv.appendChild(rend);

            blockContent.innerHTML = `
         <div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4"> 
            <img src="${el.sprites.front_shiny}">
               <p class ="text-center item-name">${el.name} </p>
               <p class ="text-center item-type"><span class="${el.types[0].type.name}">${el.types[0].type.name}</span>  </p>
               
         </div>
        `
            rend.addEventListener('click', function() {
                this.getElementsByClassName('item-name');
                let SinglePokRender = document.getElementById('single-wrapper')

                SinglePokRender.innerHTML = `
               <img src="${el.sprites.front_shiny}">
               <h2>${el.name} #${el.id}</h2>
               <table>
                       <tr>
                         <th>Type</th>
                         <th class="${el.types[0].type.name}">${el.types[0].type.name}</th>
                       </tr>
                       <tr>
                         <td>Attack</td>
                         <td>${el.stats[4].base_stat}</td>
                       </tr>
                       <tr>
                         <td>Defence</td>
                         <td>${el.stats[3].base_stat}</td>
                       </tr>
                       <tr>
                         <td>HP</td>
                         <td>${el.stats[5].base_stat}</td>
                       </tr>
                       <tr>
                         <td>SP Attack</td>
                         <td>${el.stats[2].base_stat}</td>
                       </tr>
                       <tr>
                         <td>SP Defense</td>
                         <td>${el.stats[1].base_stat}</td>
                       </tr>
                       <tr>
                         <td>Speed</td>
                         <td>${el.stats[0].base_stat}</td>
                       </tr>
                       <tr>
                         <td>Weight</td>
                         <td>${el.weight}</td>
                       </tr>
                       <tr>
                         <td>Total moves</td>
                         <td>${el.moves.length}</td>
                       </tr>
                     </table>
                   </div>
                      `
            })
        }
    })
}

let button = document.getElementById('button');
let count = 12;
button.addEventListener('click', addNewPokemons);

function addNewPokemons() {
    count += 12;
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=${count}`).then(res => res.json()).then(render)
    setTimeout(function() {
        window.scrollTo(0, document.body.scrollHeight);
    }, 800);
}

fetch("https://pokeapi.co/api/v2/type?limit=999").then(res => res.json()).then(filterPocemonsByType)

function filterPocemonsByType(el) {
    for (let i = 0; i < el.results.length; i++) {
        let select = document.querySelector('select');
        let option = document.createElement('option');
        let selectedTypes = select.appendChild(option);
        selectedTypes.innerHTML = `<option id="option">${el.results[i].name}</option>`
    }

}

let selected = document.querySelector('select')
   selected.addEventListener('change', function() {
    for (let el of document.querySelectorAll(`.pokemon-wrapper:not(.${selected.value})`))
        el.style.display = 'none';
    for (let el of document.querySelectorAll(`.pokemon-wrapper.${selected.value}`))
        el.style.display = 'block';
})