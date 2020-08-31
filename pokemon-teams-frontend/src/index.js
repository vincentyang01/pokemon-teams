const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons/`

document.addEventListener("DOMContentLoaded", function() {

    const main = document.querySelector("main")

    function getTrainers(){
        fetch(TRAINERS_URL)
        .then(res => res.json())
        .then(trainerData => renderTrainers(trainerData))
    }


    function renderTrainers(trainerData){
        for(let trainer of trainerData){
            console.log(trainer.name)
            const card = document.createElement("div")
            card.className = "card"
            card.dataset.id = trainer.id
            const dataid = card.dataset.id
            card.innerHTML = `
            <p>${trainer.name}</p>
            <button class="add-pokemon-button" data-trainer-id="${trainer.id}">Add Pokemon</button>
            <ul class="poke-ul">
            ${trainer.pokemons.map( pokemon => (
                `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
            ))}     
            </ul>`
            
            main.append(card)
            
        }
    }

    function renderPokemon(pokemon) {
        const pokeUl = document.querySelector(".poke-ul")
        const pokeLi = document.createElement("li")
        pokeLi.innerHTML = `
        ${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>`
        pokeUl.append(pokeLi)
    }


    function submitHandler() {
        document.addEventListener("click", e => {
            const button = e.target
            if(button.matches(".add-pokemon-button")){
                const getButtonTrainer = button.parentElement.dataset.id
                
                const options = {
                    method: "POST",
                    headers: {
                         "content-type": "application/json",
                         "accept": "application/json"
                    },
                 body: JSON.stringify({ "trainer_id": getButtonTrainer })
                }
                
                fetch(POKEMONS_URL, options)
                .then(resp => resp.json())
                .then(pokemonData => renderPokemon(pokemonData))
            }
        }) 
    }


getTrainers()
submitHandler()
})