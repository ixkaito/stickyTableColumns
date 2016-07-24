;(function($, undefined){

  "use strict";

  $.fn.stickyTableCol = function(options) {

    var defaults = {
      col : 1,
    };

    var settings = $.extend(true, {}, defaults, options);

    return this.each(function() {
      $('head').append(
        '<style>' +
          '.stickyTableCol-outer-outer{position:relative;}' +
          '.stickyTableCol-outer{overflow-y:auto;}' +
          '.stickyTableCol-cell{position:absolute;}' +
          '.stickyTableCol-cell-inner{display:table;}' +
          '.stickyTableCol-cell-inner-inner{display:table-cell;}' +
        '</style>'
      );

      var $table = $(this);
      var tableMarginTop = parseInt($table.css('margin-top'));
      var $parent = $(this).parent();

      if ($parent.width() < $table.outerWidth()) {
        $table.wrap(
          '<div class="stickyTableCol-outer-outer">' +
            '<div class="stickyTableCol-outer"></div>' +
          '</div>'
        );

        var $row = $table.find('tr');
        var $_cell = $row.eq(0).children();

        var i = 0;
        var stickyOuterWidthSum = 0;
        var widthArray = [];
        var leftArray = [stickyOuterWidthSum];

        while (i < settings.col) {
          stickyOuterWidthSum += $_cell.eq(i).outerWidth();
          widthArray.push($_cell.eq(i).width());
          leftArray.push(stickyOuterWidthSum);

          var stickyOuterHeightSum = tableMarginTop;
          var topArray = [stickyOuterHeightSum];

          $row.each(function(index) {

            var $cell = $(this).children().eq(i);
            var height = $cell.height();
            var html = $cell.html();

            stickyOuterHeightSum += $cell.outerHeight();

            topArray.push(stickyOuterHeightSum);

            $(this).children().css('height', height + 'px');

            $(this).children().eq(i)
              .addClass('stickyTableCol-cell')
              .css({
                width: widthArray[i],
                left: leftArray[i],
                top: topArray[index],
              });

            $(this).children().eq(i).html(
              '<div class="stickyTableCol-cell-inner" style="height:' + height + 'px;">' +
                '<div class="stickyTableCol-cell-inner-inner">' +
                  html +
                '</div>' +
              '</div>'
            );

          });

          i++;
        }

        $row.each(function(index) {
          var $_data = $(this).children().eq(i);
          var paddingLeft = parseFloat($_data.css('padding-left'), 10) + leftArray[i];
          $_data.css('padding-left', paddingLeft + 'px');
        });

        i = 0;
      }

    });

  };

})(jQuery);


$(function() {

  $('.js-frozen-table-head').stickyTableCol();

});
