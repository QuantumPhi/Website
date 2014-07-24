(function($) {
    var window = $(window);

    $.fn.visible = function(partial) {
        if(this.length < 1)
            return;

        var object = this.eq(0),
            viewportH = window.height(),
            viewportW = window.width(),

        var coord = [
            [object.position().left, object.position().top],
            [object.position().left + object.width(),
                object.position().top + object.height()]
        ];

        return (partial : coord[1][0] ? coord[0][0] < 0 || partial : coord[0][0] ? coord[1][0] >= viewportW)
            || (partial : coord[1][1] ? coord[0][1] < 0 || partial : coord[0][1] ? coord[1][1] >= viewportH);
    };
})(jQuery):
