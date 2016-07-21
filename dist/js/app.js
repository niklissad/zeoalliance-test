$(function() {

    var modal = {

        $node: $('#modal'),
        $back: $('#back'),
        $wrap: $('#modal .eModalWrap'),

        show: function(animation, delay) {
            animation = animation || 'bounceInDown';
            delay = delay || 1000;

            modal.$node.show();
            modal.$back.addClass('animated fadeIn');
            modal.$wrap.addClass('animated ' + animation);
            setTimeout(function() {
                modal.$back.removeClass('animated fadeIn');
                modal.$wrap.removeClass('animated ' + animation);
                $('#back').on('click', close);
            }, delay);
        },

        hide: function(animation, delay) {
            animation = animation || 'bounceOutDown';
            delay = delay || 500;

            modal.$back.addClass('animated fadeOut');
            modal.$wrap.addClass('animated ' + animation);
            setTimeout(function() {
                modal.$node.hide();
                modal.$back.removeClass('animated fadeOut fadeIn');
                modal.$wrap.removeClass('animated ' + animation);
                $('#back').off('click', close);
            }, delay);
        }
    };

    modal.$node.find('.mCancel, .bModalClose').on('click', function() {
        modal.hide();
    });

    modal.$wrap.on('click', function(e) {
        e.stopPropagation();
    });

    $('#modal-btn').on('click', function() {
        modal.show();
    });

    $('#modal .mAccept').on('click', function(e) {
        alert('DONE');
    });

    function close() {
        modal.hide();
    }

});