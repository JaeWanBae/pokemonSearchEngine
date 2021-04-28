//Things to add for Version 2
//When hovered, show Shiny Pokemon Sprite
//Add animation when the cards are being displayed
//Make it so that even if the textfield is deleted, it still shows pokemon cards for what they searched
//create a small close out button on top right of TCG card display box so people can close without having to clicking the card again


const app = {};

const pokemonBaseUrl = `https://pokeapi.co/api/v2/pokemon/`
const pokemonTcgBaseUrl = `https://api.pokemontcg.io/v1/cards?name=`


app.displayPokemon = (pokemon) => {
    const name = pokemon.name;
    const pokemonSprite = pokemon.sprites.front_default;
    const pokedexNum = `
    <img src="./assets/pokedex.png" alt="Pokedex number" class="pokedex">   #${pokemon.id}
    `;
    
    let pokemonType = [];
    const typeName = pokemon.types
    typeName.forEach((type) => {
        pokemonType.push(type.type.name)
    })
    $('.type').empty();
    pokemonType.forEach((pokeType, i) => {
        if (i === (pokemonType.length - 1)) {
            $('.type').append(`${pokeType}`.toUpperCase());
        } else {
            $('.type').append(`${pokeType}/`.toUpperCase());
        };
    });
    $('.pokemonName').html(name.toUpperCase())
    $('.pokemonImage').empty().attr('src', pokemonSprite)
    $('.pokedexNumber').html(pokedexNum)
}

app.displayPokemonCard = (pokemonCard) => {
    const cardArray = pokemonCard.cards;
    $('.showCards').empty();
    cardArray.forEach((cardObject) => {
        const showCardHtml = `<img src="${cardObject.imageUrl}" alt="" class="imgCard">`;
        $('.showCards').append(showCardHtml);
    })
}

app.getPokemonDetail = () => {
    $('form').on('submit', (e) => {
        e.preventDefault();
        const userInput = $('input[type=text]').val().toLowerCase();
            $.ajax({
            url: `${pokemonBaseUrl}${userInput}`,
            dataType: 'json',
            method: 'GET'
        }).then(result => {
            app.displayPokemon(result);
        })
    })
};

app.getPokemonCard = () => {
    $('.pokemonCard').on('click', () => {
        const cardSearch = $('input[type=text]').val();
            $.ajax({
            url: `${pokemonTcgBaseUrl}${cardSearch}`,
            dataType: 'json',
            method: 'GET'
        }).then(result => {
            app.displayPokemonCard(result);
        })
        $('.showCards').toggleClass("hide show")
    })
};


app.init = () => {
    app.getPokemonDetail();
    app.getPokemonCard();
};

$(() => {
    app.init ();
});