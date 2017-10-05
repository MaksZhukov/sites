new WOW().init();
$('.bxslider').bxSlider({
    startSlide: 2,
    controls: false
});
$(document).ready(function() {
    map = $('.map img');
    phone = $('.phone img');
    mapcafe = $('area.cafe_area');
    mapstopping = $('area.stopping_area');
    mappark = $('area.park_area');
    mapbank = $('area.bank_area');
    mapshop = $('area.shop_area');
    mapsize = {
        width: 912,
        height: 627
    }
    mapsizenow = {
        width: 0,
        height: 0
    }
    defaultcoordscafe = "448.5,314,679.5,185,907.5,357,884.5,457,763.5,348,659.5,435";
    defaultcoordsstopping = "769.5,517,874.5,465,770.5,359,672.5,446";
    defaultcoordspark = "650.5,484,366.5,614,142.5,487,403.5,334";
    defaultcoordsbank = "348.5,318,2.5,514,0.5,301,158.5,207";
    defaultcoordsshop = "583.5,135,390.5,242,270.5,157,448.5,13";

    function DefaultCoords(map_area, coords) {
        map_area.attr('coords', coords);
    }

    function FixCoords(map_area) {
        mapsizenow.width = map.width();
        mapsizenow.height = map.height();
        koof = 1 - ((((mapsize.width - mapsizenow.width) / mapsize.width) + ((mapsize.height - mapsizenow.height) / mapsize.height)) / 2);
        coords = $(map_area.attr('coords').split(','));
        for (var i = 0; i < coords.length; i++) {
            coords[i] *= koof;
        }
        coords = coords.get().join(',');
        map_area.attr('coords', coords);

    }
    DefaultCoords(mapcafe, defaultcoordscafe);
    DefaultCoords(mapstopping, defaultcoordsstopping);
    DefaultCoords(mappark, defaultcoordspark);
    DefaultCoords(mapbank, defaultcoordsbank);
    DefaultCoords(mapshop, defaultcoordsshop);

    map.mouseenter(function(event) {
        if (mapsize.width != map.width()) {
            if (mapsizenow.width != $(this).width()) {
                DefaultCoords(mapcafe, defaultcoordscafe);
                DefaultCoords(mapstopping, defaultcoordsstopping);
                DefaultCoords(mappark, defaultcoordspark);
                DefaultCoords(mapbank, defaultcoordsbank);
                DefaultCoords(mapshop, defaultcoordsshop);
                FixCoords(mapcafe);
                FixCoords(mapstopping);
                FixCoords(mappark);
                FixCoords(mapbank);
                FixCoords(mapshop);
            }
        }
        if (mapsize.width == map.width()) {
            DefaultCoords(mapcafe, defaultcoordscafe);
            DefaultCoords(mapstopping, defaultcoordsstopping);
            DefaultCoords(mappark, defaultcoordspark);
            DefaultCoords(mapbank, defaultcoordsbank);
            DefaultCoords(mapshop, defaultcoordsshop);
        }
        $(this).attr({
            src: 'img/map_road.png'
        });
        phone.attr({
            src: 'img/iphone_museum.png'
        });
    });
    map.mouseleave(function(event) {
        $(this).attr({
            src: 'img/map.png'
        });
        phone.attr({
            src: 'img/iphone_museum.png'
        });
    });

    mapcafe.mouseenter(function(event) {
        map.attr({
            src: 'img/map_cafe.png'
        });
        phone.attr({
            src: 'img/iphone_cafe.png'
        });
    });
    mapstopping.mouseenter(function(event) {
        map.attr({
            src: 'img/map_stopping.png'
        });
        phone.attr({
            src: 'img/iphone_stopping.png'
        });
    });
    mappark.mouseenter(function(event) {
        map.attr({
            src: 'img/map_park.png'
        });
        phone.attr({
            src: 'img/iphone_park.png'
        });
    });
    mapbank.mouseenter(function(event) {
        map.attr({
            src: 'img/map_bank.png'
        });
        phone.attr({
            src: 'img/iphone_bank.png'
        });
    });
    mapshop.mouseenter(function(event) {
        map.attr({
            src: 'img/map_shop.png'
        });
        phone.attr({
            src: 'img/iphone_shop.png'
        });
    });
});