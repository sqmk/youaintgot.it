$(window).load(function() {
    var url = location.pathname.replace(/^\//, '');

    if (url.match(/^.+/i)) {

        try {
            var options = LZString.decompressFromBase64(url);

            $('#the_what').text(options.a);
            $('#the_who').text(options.b);
            $('#got_it').show();
        } catch (err) {
            $('#something_went_wrong')
                .text('YOU FUCKED SOMETHING UP, YOU IDIOT.')
                .show();
        }
    } else {
        $('#what, #who').keyup(function(){
            var code = toCode(
                $('#what').val(),
                $('#who').val()
            );

            $('#got_where a').attr('href', '/' + code);
            $('#got_where').show();
        });

        $('#got_what').show();
    }

    function toCode(what, who) {
        var json = window.JSON.stringify({
            'a': what,
            'b': who
        });

        return LZString.compressToBase64(json);
    }
});