let color = 'black';
let bundle = 'nobundle';

function addFormListeners() {

    $('#colorselector label').on('click', function(){
        switch( $("input", this).val() ) {
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

    $('#bundleselector label').on('click', function(){
        switch( $("input", this).val() ) {
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
    });
   
}

function setProductImage() {
    path = "img/prvke/"+bundle+"-"+color+".jpg"
    $("#main-product-photo").attr('src', path);
}