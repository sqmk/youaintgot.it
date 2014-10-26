$(window).load(function() {
    var url = location.pathname.replace(/^\//, '');

    if (url.match(/^.+/i)) {

        try {
            var options = fromCode(url);

            $('#the_what').text(options.a);
            $('#the_who').text(options.b);
            $('#got_it').show();

            if (options.v) {
                var youtube = $('<iframe id="the_sound" />')
                    .attr({
                        'src': '//www.youtube.com/embed/' + encodeURI(options.v) + '?autoplay=1'
                    });

                $('#got_it').append(youtube);
            }
        } catch (err) {
            $('#something_went_wrong')
                .text('YOU FUCKED SOMETHING UP, YOU IDIOT.')
                .show();
        }
    } else {
        $('#what, #who, #sound').keyup(function(){
            var code = toCode(
                $('#what').val(),
                $('#who').val(),
                $('#sound').val()
            );

            $('#got_sound').fadeIn();
            $('#got_where a').attr('href', '/' + code);
            $('#got_where').fadeIn();
        });

        $('#got_what').show();
    }

    function toCode(what, who, sound) {
        var options = {
            'a': what,
            'b': who
        };

        try {
            var youtubeId = sound.match(/\?v=([a-z0-9_-]+)/i)[1];

            options.v = youtubeId;
        } catch (err) {}

        var initCode = LZString.compressToBase64(
            window.JSON.stringify(options)
        );

        return initCode.replace(/=+$/, '');
    }

    function fromCode(code) {
        var json = LZString.decompressFromBase64(code);

        return window.JSON.parse(json);
    }
});