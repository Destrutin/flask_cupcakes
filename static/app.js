$(document).ready(function () {
    function getCupcakes() {
        console.log('Fetching cupcakes...');
        axios.get('/api/cupcakes')
            .then(function (response) {
                const cupcakes = response.data.cupcakes;
                const listCupcakes = $('#list-cupcakes');

                listCupcakes.empty();

                cupcakes.forEach(function (cupcake) {
                    const listItem = $('<li>');
                    listItem.text(`${cupcake.flavor} - ${cupcake.size} - Rating: ${cupcake.rating}`);

                    // Create a delete button for each cupcake
                    const deleteButton = $('<button>');
                    deleteButton.text('Delete');
                    deleteButton.click(function () {
                        deleteCupcake(cupcake.id);
                    });

                    listItem.append(deleteButton);
                    listCupcakes.append(listItem);
                });
            })
            .catch(function (error) {
                console.error('Error getting cupcakes:', error);
            });
    }

    function deleteCupcake(cupcakeId) {
        axios.delete(`/api/cupcakes/${cupcakeId}`)
            .then(function (response) {
                getCupcakes();
            })
            .catch(function (error) {
                console.error('Error deleting cupcake:', error);
            });
    }

    getCupcakes();

    $('#new-cupcake').submit(function (evt) {
        evt.preventDefault();

        const flavor = $('#flavor').val();
        const size = $('#size').val();
        const rating = $('#rating').val();
        const image = $('#image').val();

        const newCupcake = {
            flavor: flavor,
            size: size,
            rating: rating,
            image: image
        };

        axios.post('/api/cupcakes', newCupcake)
            .then(function (response) {
                getCupcakes();

                $('#flavor').val('');
                $('#size').val('');
                $('#rating').val('');
                $('#image').val('');
            })
            .catch(function (error) {
                console.error('Error creating cupcake:', error);
            });
    });
});
