function showPokemonInfo() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                try {
                    var pokemon = JSON.parse(this.responseText);
                    document.getElementById("pokemonInformation").innerHTML =
                        "<strong>Name:</strong> " + pokemon.name +
                        "<br><strong>Image:</strong> <br><img src='" + pokemon.image + "' alt='" + pokemon.name + "' width='150'>" +
                        "<br><strong>Type 1:</strong> " + pokemon.type.first +
                        "<br><strong>Type 2:</strong> " + pokemon.type.second +
                        "<br><strong>Weaknesses:</strong><br>" +
                        pokemon.weakness.map(w => "- " + w).join("<br>");
                } catch (error) {
                    document.getElementById("pokemonInformation").innerHTML = "Error: Invalid JSON format!";
                }
            } else {
                document.getElementById("pokemonInformation").innerHTML = "Error: Unable to load data!";
            }
        }
    };
    xhttp.open("GET", "data/pokedex.json", true); 
    xhttp.send();
}