    $(document).ready(function() {
        $(".bxslider").bxSlider({ controls: !1, pager: !1 });
        var o = $(".grid");
        o.imagesLoaded(function() { o.masonry({ columnWidth: ".product", itemSelector: ".product-one-column,.product-two-column", gutter: 7 }) });
        var t = $(".grid-popular");
        t.imagesLoaded(function() { t.masonry({ columnWidth: ".product", itemSelector: ".product-one-column,.product-two-column", gutter: 7 }) })
    });