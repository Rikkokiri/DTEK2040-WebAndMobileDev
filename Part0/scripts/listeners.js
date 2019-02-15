let color = 'black';
let bundle = 'nobundle';
const prices = {
    nobundle: '$ 184.00',
    travelbundle: '$ 229.00',
    photobundle: '$ 264.00'
}

function addFormListeners() {

    $('#colorselector label').on('click', function () {
        switch ($("input", this).val()) {
            case 'black':
                color = 'black';
                break;
            case 'green':
                color = 'green';
                break;
            case 'blue':
                color = 'blue';
                break;
        }

        setProductImage()
    });

    $('#bundleselector label').on('click', function () {
        switch ($("input", this).val()) {
            case 'nobundle':
                bundle = 'nobundle';
                break;
            case 'travelbundle':
                bundle = 'travelbundle';
                break;
            case 'photobundle':
                bundle = 'photobundle';
                break;
        }

        setProductImage()
        displayBundleDetails()
        setProductPrice()
    });

}

function setProductImage() {
    path = "img/prvke/" + bundle + "-" + color + ".jpg"
    $("#main-product-photo").attr('src', path);
}

function setProductPrice() {
    $(".price").text(prices[bundle])
}

function displayBundleDetails() {
    switch (bundle) {
        case 'nobundle':
            $('#travelbundle-content').hide();
            $('#photobundle-content').hide();
            break;
        case 'travelbundle':
            $('#travelbundle-content').show();
            $('#photobundle-content').hide();
            break;
        case 'photobundle':
            $('#travelbundle-content').hide();
            $('#photobundle-content').show();
            break;
    }
}