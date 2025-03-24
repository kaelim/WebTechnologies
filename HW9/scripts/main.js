
                        let pokemon = {
                            "name": "Bulbasaur",
                        "image": "http://www.serebii.net/pokemongo/pokemon/001.png",
                        "type": {
                            "first": "grass",
                        "second": "poison"
            },
                        "weakness": ["fire", "ice", "flying", "psychic"]
        };

                        $(function () {
                            $("button").click(function () {
                                showPokemonInfo();
                            });
        });

                        function showPokemonInfo() {
                            $("#pokemonInformation").html(
                                "<strong>Name:</strong> " + pokemon.name +
                                "<br><strong>Image:</strong> <br><img src='" + pokemon.image + "' alt='Bulbasaur' width='150'>" +
                                "<br><strong>Type 1:</strong> " + pokemon.type.first +
                                "<br><strong>Type 2:</strong> " + pokemon.type.second +
                                "<br><strong>Weaknesses:</strong><br>" +
                                pokemon.weakness.map(w => "- " + w).join("<br>") // Dynamically list weaknesses
                            );
        }
               

           