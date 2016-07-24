/**
 * Sticky Table Columns © 2016
 *
 * Version: 0.1
 * Author: Kite@ixkaito
 * Licence: MIT
 */
;(function($, undefined){

  "use strict";

  $.fn.stickyTableColumns = function(options) {

    var defaults = {
      colomuns: 1,
    };

    var settings = $.extend(true, {}, defaults, options);

    return this.each(function() {

      var $table = $(this);
      var margin = {
        top:    $table.css('margin-top'),
        right:  $table.css('margin-right'),
        bottom: $table.css('margin-bottom'),
        left:   $table.css('margin-left'),
      };

      $table.wrap('<div class="stickyTableCol-outer"><div class="stickyTableCol-scroll"></div></div>');
      var $scroll = $table.parent('.stickyTableCol-scroll');
      var $outer = $scroll.parent('.stickyTableCol-outer');

      $table.css( {
        margin: 0,
      });

      $outer.css({
        position:     'relative',
        marginTop:    margin.top,
        marginRight:  margin.right,
        marginBottom: margin.bottom,
        marginLeft:   margin.left,
      });

      $scroll.css({
        overflowY: 'auto',
      });

      var timer = false;

      $(window).on('load resize', function() {

        if (timer) {
          clearTimeout(timer);
        }

        $outer.find('.stickyTableCol-clone').remove();

        timer = setTimeout(function() {

          $table.clone().appendTo($outer)
            .wrap('<div class="stickyTableCol-clone"><div class="stickyTableCol-clone-inner"></div></div>');

          var $clone = $outer.find('.stickyTableCol-clone');

          $clone.find('.stickyTableCol-clone-inner').css({
            width: $table.outerWidth(),
          });

          var $row = $table.find('tr');
          var $cell = $row.eq(0).children();

          var i = 0;
          var stickyColWidth = 0;

          while (i < settings.colomuns) {
            stickyColWidth += $cell.eq(i).outerWidth();
            i++;
          }

          $clone.css({
            position: 'absolute',
            top: 0,
            left: 0,
            overflow: 'hidden',
            width: stickyColWidth + 1,
          });

        }, 200);

      });

    });

  };

})(jQuery);
