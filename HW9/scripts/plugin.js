$.fn.pinky = function () {
    this.css("background-color", "pink");
};

$(function () {
    $("button").click(function () {
        $("#pokemonInformation").pinky();
    });
});