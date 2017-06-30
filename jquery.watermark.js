;
(function(factory) {

  // Establish the root object, `window` (`self`) in the browser, or `global` on the server.
  // We use `self` instead of `window` for `WebWorker` support.
  var root = (typeof self == 'object' && self.self === self && self) ||
    (typeof global == 'object' && global.global === global && global);

  // Start with AMD.
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], function($) {
      // Export global even in AMD case in case this script is loaded with
      // others that may still expect a global Backbone.
      factory(root, $);
    });

    // Next for Node.js or CommonJS.
  } else if (typeof exports !== 'undefined') {
    var $ = require('jquery');

    factory(root, $);

    // Finally, as a browser global.
  } else {
    factory(root, (root.jQuery || root.Zepto || root.ender || root.$));
  }

})(function(root, $) {
  $.fn.extend({
    watermark: function(text, options) {
      return new waterMark(text, options, this)
    }
  })

  function waterMark(text, options, cxt) {
    var self = this;
    var $el = $(cxt.selector);
    var width = document.documentElement.clientWidth,
      height = document.documentElement.clientHeight;
    var text = text;
    var defaults = {
      text_width: 0,
      text_height: 35,
      text_lineheight: 45,
      text_spacing: 0,
      step_x: 0,
      step_y: 0,
      rgba: 'rgba(0, 0, 0, 0.03)',
      angle: 45
    }
    self.options = $.extend({}, defaults, options);

    $el.css({ height: height + "px", width: width + "px" });
    $el.attr({ height: height, width: width });


    var startPos = { x: 0, y: 0 },
      canvas = $el[0],
      context = canvas.getContext("2d"),
      text_height = self.options.text_height,
      text_lineheight = self.options.text_lineheight,
      text_width = self.options.text_width,
      text_spacing = self.options.text_spacing,
      step_x = self.options.step_x,
      step_y = self.options.step_y,
      angle = self.options.angle;

    canvas.innerHTML = '';
    context.font = text_height + "px Arial";
    context.fillStyle = self.options.rgba;

    context.rotate(angle * Math.PI / 180);
    context.translate(canvas.width / 2, -canvas.height / 2);

    text_width = context.measureText(text).width;
    text_spacing = text_width + 25;
    step_x = canvas.width / text_spacing;
    step_x = Math.ceil(step_x);
    step_y = canvas.height / text_lineheight;
    step_y = Math.ceil(step_y);

    for (var x = -step_x; x < step_x * 2; x++) {
      for (var y = -step_y; y < step_y * 2; y++) {
        if (y % 2) {
          context.translate(x * text_spacing, y * text_lineheight);
          context.fillText(text, 0, 0);
          context.translate(-(x * text_spacing), -(y * text_lineheight));
        } else {
          context.translate(100 + x * text_spacing, y * text_lineheight);
          context.fillText(text, 0, 0);
          context.translate(-(100 + x * text_spacing), -(y * text_lineheight));
        }
      }
    }
  }
});
