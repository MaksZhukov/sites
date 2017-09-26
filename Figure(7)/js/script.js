    $(document).ready(function() {
        $('#form').submit(function(e) {
            e.preventDefault();
            $('#form a.open-popup').trigger('click');
            setTimeout(function() {
                window.location.reload();
            }, 3000);
        });
        Date.prototype.format = function(mask, utc) {
            return dateFormat(this, mask, utc);
        };
        $("span.dateonly").html("только до " + new Date().toLocaleString("ru", {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            timezone: 'UTC'
        }));
        $('.slider').bxSlider({
            pager: false,
            controls: true,

        });

    });