/**
 * Sticky Table Columns © 2016
 *
 * Version: 0.1
 * Author: Kite@ixkaito
 * Licence: MIT
 */
(function($, undefined){

  "use strict";

  $.fn.stickyTableColumns = function(options) {

    var defaults = {
      columns: 1,
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

      $table.wrap('<div class="stickyTableColumns-outer"><div class="stickyTableColumns-scroll"></div></div>');
      var $scroll = $table.parent('.stickyTableColumns-scroll');
      var $outer = $scroll.parent('.stickyTableColumns-outer');

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
      var $clone, $row, $cell, i, stickyColWidth;

      $(window).on('load resize', function() {

        if (timer) {
          clearTimeout(timer);
        }

        $outer.find('.stickyTableColumns-clone').remove();

        timer = setTimeout(function() {

          $table.clone().appendTo($outer)
            .wrap('<div class="stickyTableColumns-clone"><div class="stickyTableColumns-clone-inner"></div></div>');

          $clone = $outer.find('.stickyTableColumns-clone');

          $clone.find('.stickyTableColumns-clone-inner').css({
            width: $table.outerWidth(),
          });

          $row = $table.find('tr');
          $cell = $row.eq(0).children();

          i = 0;
          stickyColWidth = 0;

          while (i < settings.columns) {
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
