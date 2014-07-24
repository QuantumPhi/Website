(function($) {
    var window = $(window);

    /*'partial' determines whether or not an object will be considered
    as 'visible' if only part of the object is visible*/
    $.fn.visible = function(partial, index) {
        /*Don't bother processing if no such element exists*/
        if(this.length < 1)
            return;

        /*If 'partial' is undefined, set 'partial' to false*/
        if(partial === undefined)
            partial = false;

        /*If 'index' is undefined, set 'index' to 0*/
        if(index === undefined)
            index = 0;

        /*Grab specified element from fetched list*/
        var object = this.eq(index),
            viewportH = window.height(),
            viewportW = window.width(),

        /*Top left and bottom right coordinates*/
        var coord = [
            [object.position().left, object.position().top],
            [object.position().left + object.width(),
                object.position().top + object.height()]
        ];

        /*Basic rectangular boundary checking*/
        return (partial : coord[1][0] ? coord[0][0] < 0 || partial : coord[0][0] ? coord[1][0] >= viewportW)
            || (partial : coord[1][1] ? coord[0][1] < 0 || partial : coord[0][1] ? coord[1][1] >= viewportH);
    };
})(jQuery):
