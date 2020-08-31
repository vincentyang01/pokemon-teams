const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function() {

    const main = document.querySelector("main")

    function getTrainers(){
        fetch(TRAINERS_URL)
        .then(res => res.json())
        .then(trainerData => renderTrainers(trainerData))
    }

    function getPokemon(){
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ }),
        }

        fetch(POKEMONS_URL)
        .then(res => res.json())
        .then(pokemonData => renderTrainers(pokemonData))
    }


    function renderTrainers(trainerData, pokemonData = null){
        for(let trainer of trainerData){
            console.log(trainer.name)
            const card = document.createElement("div")
            card.className = "card"
            card.dataset.id = trainer.id
            const dataid = card.dataset.id

            
            renderPokemon(card, trainerData)
            main.append(card)
            
        }
    }
    function renderPokemon(card, trainerData) {

        for(let obj of trainerData){
            debugger
            card.innerHTML = `
            <p>${obj.name}</p>
            <button class="add-pokemon-button" data-trainer-id="${obj.id}">Add Pokemon</button>
            <li>${obj.pokemons.nickname} ${obj.pokemons.species}button class="release" data-pokemon-id="${obj.pokemons.id}">Release</button></li>
            <ul>
            </ul>
            `
        }
    }

    function submitHandler() {
        document.addEventListener("click", e => {
            button = e.target
            console.log(e)
            if(button.matches(".add-pokemon-button")){
                console.log(`Inside the Pokemon button if`)
                // Fetch to the Faker gem on a random pokemon
            } //else if(button.matches){}
        })
    }

getTrainers()
// getPokemon()
submitHandler()
})