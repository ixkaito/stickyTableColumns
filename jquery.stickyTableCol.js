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
      var $parent = $(this).parent();
      var tableMarginTop = parseInt($table.css('margin-top'));

      $table.find('*').css({
        boxSizing: 'border-box',
      });

      // if ($parent.width() < $table.outerWidth()) {
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
            var html = $cell.html();
            var css = {
              height: $cell.height(),
              outerHeight: $cell.outerHeight(),
              outerWidth: $cell.outerWidth(),
              verticalAlign: $cell.css('vertical-align'),
              padding: {
                top:    parseInt($cell.css('padding-top'), 10),
                right:  parseInt($cell.css('padding-right'), 10),
                bottom: parseInt($cell.css('padding-bottom'), 10),
                left:   parseInt($cell.css('padding-left'), 10),
              },
              border: {
                top:    {width: parseInt($cell.css('border-top-width'), 10)},
                right:  {width: parseInt($cell.css('border-right-width'), 10)},
                bottom: {width: parseInt($cell.css('border-bottom-width'), 10)},
                left:   {width: parseInt($cell.css('border-left-width'), 10)},
              },
              // top: Math.round($cell.position().top),
              // left: Math.round($cell.position().left),
              top: topArray[index],
              left: leftArray[i],
            };


            console.log(css.pt + '/' + css.top);

            // if ($cell.css('box-sizing') == 'border-box') {
              // css.padding.top    = parseInt($cell.css('padding-top'), 10);
              // css.padding.right  = parseInt($cell.css('padding-right'), 10);
              // css.padding.bottom = parseInt($cell.css('padding-bottom'), 10);
              // css.padding.left   = parseInt($cell.css('padding-left'), 10);
              // css.border.top.width    = parseInt($cell.css('border-top-width'), 10);
              // css.border.right.width  = parseInt($cell.css('border-right-width'), 10);
              // css.border.bottom.width = parseInt($cell.css('border-bottom-width'), 10);
              // css.border.left.width   = parseInt($cell.css('border-left-width'), 10);
            // }

            stickyOuterHeightSum += $cell.outerHeight();
            topArray.push(stickyOuterHeightSum);

            // $(this).children().each(function(index) {
            //   if (!$(this).attr(rowspan)) {
            //     $(this).css({
            //       // height: css.height
            //       //         + css.padding.top + css.padding.bottom
            //       //         + css.border.top.width + css.border.bottom.width,
            //       height: css.outerHeight,
            //     });
            //   }
            // });


            $(this).children().eq(i)
              .addClass('stickyTableCol-cell')
              .css({
                // width: widthArray[i]
                //        + css.padding.left + css.padding.right
                //        + css.border.left.width + css.border.right.width,
                width: css.outerWidth,
                top: css.top,
                left: css.left,
              });

            $(this).children().eq(i).html(
              '<div class="stickyTableCol-cell-inner" style="height:' + css.height + 'px; width:' + widthArray[i] + 'px;">' +
                '<div class="stickyTableCol-cell-inner-inner" style="vertical-align:' + css.verticalAlign + ';">' +
                  html +
                '</div>' +
              '</div>'
            );

          });

          i++;
        }

        var rowspan = 1;
        $row.each(function(index) {
          if (rowspan <= 1) {
            var $_data = $(this).children().eq(i);
            var paddingLeft = parseFloat($_data.css('padding-left'), 10) + leftArray[i];
            $_data.css('padding-left', paddingLeft + 'px');
            rowspan = $_data.attr('rowspan') ? $_data.attr('rowspan') : 1;
          } else {
            rowspan--;
          }
        });

        i = 0;
      // }

    });

  };

})(jQuery);
