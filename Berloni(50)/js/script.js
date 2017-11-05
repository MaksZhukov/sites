$(document).ready(function() {
    $('.custom-input-file').on('click', function(event) {
        old_file = $('#old_input_file');
        if (event.target !== old_file[0]) {
            old_file.click();
        }
    });
});