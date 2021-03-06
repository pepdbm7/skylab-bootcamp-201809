var form = document.getElementById('search-form');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    var input = document.getElementById('search-query');

    var query = input.value;

    // logic.search(query, view.listBeers.bind(view));

    var listBeers = view.listBeers;

    logic.search(query)
        .then(listBeers.bind(view));
        .catch(listBeers.bind(view));
});