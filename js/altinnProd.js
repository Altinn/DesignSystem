/* globals $ */
var aTagSpaceExpand = function() {
  $('a.collapsed').each(function() {
    $(this).on('keydown', function(e) {
      if (e.keyCode === 32 || e.keycode === 13 || e.which === 32 || e.which === 13) {
        e.stopPropagation(); e.preventDefault();
        $(e.target).trigger($.event('click'));
      }
    });
  });
};

var setupAddRightsHandler = function() {
  var $actionsRow;
  var targetTable;
  var toBeCopied;
  $('.a-js-confirmAddRightBtn').on('click', function() {
    $(this).closest('.a-collapseContent').collapse('hide');
    $(this).closest('.a-collapseContent').prev().addClass('a-sortable-row-complete');

    $actionsRow = $($(this).closest('tr'));
    targetTable = $actionsRow[0].dataset.targetTable;
    if (targetTable) {
      toBeCopied = $actionsRow.prev().clone();
      $(toBeCopied).find('.a-collapseTitle').toggleClass('toggle-collapse-text');
      $(toBeCopied).find('.a-collapseTitle').addClass('collapsed');

      $actionsRow.prev().addClass('a-sortable-row-complete');

      $('#' + targetTable + ' tbody').append(toBeCopied);
      $('#' + targetTable + ' tbody').append($actionsRow);

      toBeCopied.removeClass('a-sortable-row-complete');
    }
  });
};

/* globals $ */
var codeLookup = function() {
  var capIt = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  var lastKeypress; var now; var iterate;
  var legend = $('.a-js-lookup').find('.a-legend');
  var loader = $('.a-js-lookup').find('.modal-body').find('.a-logo-anim');
  var empty = $('.a-js-lookup').find('.a-js-noResults');
  var container = $('.a-js-lookup').find('.modal-body').find('.a-radioButtons');
  var check = function() {
    if ($('form').find('input[type=radio]:checked').length > 0) {
      $('form').find('button[type=submit]').removeAttr('disabled');
      $('form').find('input[type=radio]').parent().removeClass('a-js-radioParentGray');
      $('form').find('input[type=radio]:checked').parent()
        .addClass('a-js-radioParentGray');
    } else {
      $('form').find('button[type=submit]').attr('disabled', 'disabled');
    }
  };
  var query; var base = container.html(); container.html(''); loader.hide();
  empty.hide(); legend.hide();
  if ($('.a-js-lookup').length > 0) {
    $('form').on('change', check);
    $.getJSON('../../ssb.json', function(data) {
      function createPath(dest, str) {
        var _str = str; var _dest = data[dest.parentCode];
        if (_dest !== undefined) {
          if (dest.name === _dest.name) {
            return createPath(_dest, _str);
          }
          if (str.indexOf(_dest.name) !== -1) {
            return str;
          }
          _str = _dest.name + ' / ' + _str; return createPath(_dest, _str);
        }
        return str;
      }
      $('.a-js-lookup').find('input[type=text]').on('keypress', function() {
        lastKeypress = new Date().getTime(); iterate = true;
        loader.show(); legend.hide(); empty.hide(); container.html(''); check();
      });
      setInterval(function() {
        if ($('.a-js-lookup').find('input[type=text]').val() !== undefined) {
          query = $('.a-js-lookup').find('input[type=text]').val();
        } else {
          query = '';
        }
        now = new Date().getTime();
        if (query.length > 0 && (now - lastKeypress > 1500) && iterate) {
          iterate = false;
          Object.keys(data).forEach(function(item) {
            var method; var var1 = ' ' + query + ' ';
            var var2 = '-' + query + ' '; var var3 = ' ' + query + '-';
            var var4 = ' ' + query; var var5 = query + ' ';
            var var6 = capIt(query); var re1 = new RegExp(var1, 'g');
            var re2 = new RegExp(var2, 'g'); var re3 = new RegExp(var3, 'g');
            var re4 = new RegExp(var4, 'g'); var re5 = new RegExp(var5, 'g');
            var re6 = new RegExp(var6, 'g');
            var out1 = ' <strong style="color:inherit">' + query + '</strong> ';
            var out2 = '-<strong style="color:inherit">' + query + '</strong> ';
            var out3 = ' <strong style="color:inherit">' + query + '</strong>-';
            var out4 = ' <strong style="color:inherit">' + query + '</strong>';
            var out5 = '<strong style="color:inherit">' + query + '</strong> ';
            var out6 = '<strong style="color:inherit">' + capIt(query) +
              '</strong>';
            if (
              (
                data[item].name.indexOf(var1) !== -1 ||
                data[item].name.indexOf(var2) !== -1 ||
                data[item].name.indexOf(var3) !== -1 ||
                data[item].name.indexOf(var4) !== -1 ||
                data[item].name.indexOf(var5) !== -1 ||
                data[item].name.indexOf(var6) !== -1 ||
                data[item].shortName.indexOf(var1) !== -1 ||
                data[item].shortName.indexOf(var2) !== -1 ||
                data[item].shortName.indexOf(var3) !== -1 ||
                data[item].shortName.indexOf(var4) !== -1 ||
                data[item].shortName.indexOf(var5) !== -1 ||
                data[item].shortName.indexOf(var6) !== -1 ||
                data[item].notes.indexOf(var1) !== -1 ||
                data[item].notes.indexOf(var2) !== -1 ||
                data[item].notes.indexOf(var3) !== -1 ||
                data[item].notes.indexOf(var4) !== -1 ||
                data[item].notes.indexOf(var5) !== -1 ||
                data[item].notes.indexOf(var6) !== -1
              ) &&
              data[item].level === 5
            ) {
              if (
                data[item].name.indexOf(var1) !== -1 ||
                data[item].name.indexOf(var2) !== -1 ||
                data[item].name.indexOf(var3) !== -1 ||
                data[item].name.indexOf(var4) !== -1 ||
                data[item].name.indexOf(var5) !== -1 ||
                data[item].name.indexOf(var6) !== -1
              ) {
                method = 'prepend';
              } else {
                method = 'append';
              }
              container[method](base
                .replace('%NAME%', data[item].name
                  .replace(re1, out1)
                  .replace(re2, out2)
                  .replace(re3, out3)
                  .replace(re4, out4)
                  .replace(re5, out5)
                  .replace(re6, out6)
                )
                .replace('%DESCRIPTION%', data[item].notes
                  .replace(re1, out1)
                  .replace(re2, out2)
                  .replace(re3, out3)
                  .replace(re4, out4)
                  .replace(re5, out5)
                  .replace(re6, out6)
                )
                .replace('%ID%', data[item].shortName)
                .replace('%PATH%', createPath(data[item], '')
                  .replace(re1, out1)
                  .replace(re2, out2)
                  .replace(re3, out3)
                  .replace(re4, out4)
                  .replace(re5, out5)
                  .replace(re6, out6)
                )
              );
            }
          });
          loader.hide(); legend.show();
          if (container.html() === '') {
            empty.show(); legend.hide();
          }
        }
      }, 2000);
    });
  }
};

/* globals $ */
var drilldownInteraction = function() {
  var bpLarge = 992;

  // Add dim class to panels
  $(function() {
    $('.index-heading').click(function() {
      if ($(this).hasClass('expanded')) {
        $(this).removeClass('expanded');
        if ($('.panel-heading.expanded').length === 0) {
          $('.panel-heading').removeClass('dim');
        } else {
          $(this).addClass('dim');
        }
      } else {
        $('.panel-heading').removeClass('expanded');
        $(this).addClass('expanded');
        $('.panel-heading').addClass('dim');
        $('.panel-heading.expanded').removeClass('dim');
      }
    });
  });

  // Adjust position of second level menu upon click:
  $(function() {
    $('#colnav').on('mouseup', function(event) {
      var target = $(event.target);
      var second = $('.a-colnav-secondLevel');

      var getThird = function(el) {
        if (el.attr('class') === '.a-colnav-thirdLevel') {
          return el;
        }

        return el.find('.a-colnav-thirdLevel');
      };

      var findOpenThird = function(el) {
        var bool = false;
        el.find('.a-colnav-thirdLevel').each(function() {
          if ($(this).attr('data-ignore') === 'false') {
            bool = true;
          }
        });

        return bool;
      };

      var isOpen = function(el) {
        var x = 'expanded';
        return (el.closest('a').hasClass(x) || el.find('a').hasClass(x) ||
          el.hasClass(x));
      };

      var ul = target.closest('ul');
      if (ul.hasClass('a-colnav')) {
        second.css('margin-left', '-1px');
      }

      if (ul.hasClass('a-colnav-secondLevel' || 'a-colnav-thirdLevel')) {
        if (!findOpenThird(ul)) {
          if ($(window).width() >= bpLarge) {
            second.animate({ 'margin-left': '-78px' }, 125);
          }
        } else if ($(window).width() >= bpLarge) {
          second.css('margin-left', '-78px');
        }

        getThird(ul).css('margin-left', '-1px').css('left', '100%')
          .attr('data-ignore', 'false');

        if (ul.hasClass('a-colnav-secondLevel') &&
          $(window).width() >= bpLarge) {
          ul.children('li').children('a').addClass('dim-second');
          target.closest('a').removeClass('dim-second');
          target.children('a').removeClass('dim-second');
          target.removeClass('dim-second');
        }
      } else if (ul.hasClass('a-colnav') && isOpen(target)) {
        $('#a-js-suggestionList').css('display', 'block');
        $('.dim').removeClass('dim'); second.css('margin-left', '-10000px');
        getThird(ul).css('margin-left', '-10000px').attr('data-ignore', 'true');
        $('.col-md-3').removeClass('col-md-3').addClass('col-md-6')
          .removeClass('offset-md-4')
          .addClass('offset-md-1');
      } else {
        second.each(function() {
          getThird($(this)).attr('data-ignore', 'true');
        });
        $('#a-js-suggestionList').css('display', 'none');
        $('.dim-second').removeClass('dim-second');
        $('.col-md-6').removeClass('col-md-6').addClass('col-md-3')
          .removeClass('offset-md-1')
          .addClass('offset-md-4');
      }
    });
  });

  // Add dim class to colnav first level (the panels that are not active)
  $(function() {
    $('.a-colnav-item').click(function() {
      $(this).parent().find('.a-colnav-item-second')
        .eq(0)
        .focus();

      if ($(this).hasClass('expanded') && $(window).width() >= bpLarge) {
        $(this).removeClass('expanded');
        if ($('.a-colnav-item.expanded').length === 0) {
          $('.a-colnav-item').removeClass('dim-second-no');
        } else {
          $(this).addClass('dim');
        }
      } else if ($(window).width() >= bpLarge) {
        $('.a-colnav-item').removeClass('expanded');
        $(this).addClass('expanded');
        $('.a-colnav-item').addClass('dim');
        $('.a-colnav-item.expanded').removeClass('dim');
      }
    });
  });

  // Add dim class to colnav second level
  $(function() {
    $('.a-colnav-item-second').click(function() {
      $(this).parent().find('.a-colnav-item-third')
        .eq(0)
        .focus();

      if ($(this).hasClass('expanded-second') && $(window).width() >= bpLarge) {
        $(this).removeClass('expanded-second');
        if ($('.a-colnav-item-second.expanded-second').length === 0) {
          $('.a-colnav-item-second').removeClass('dim-second-no');
        } else {
          $(this).addClass('dim-second');
        }
      } else if ($(window).width() >= bpLarge) {
        $('.a-colnav-item-second').removeClass('expanded-second');
        $(this).addClass('expanded-second');
        $('.a-colnav-item-second').addClass('dim-second');
        $('.a-colnav-item-second.expanded-second').removeClass('dim-second');
      }
    });
  });

  // Repair drilldown navigation (keyboard/screen reader)
  $(function() {
    $('.a-colnav-item').attr('tabindex', '0');
    $('.a-colnav-item-second').attr('tabindex', '0');
    $('.a-colnav-item-third').attr('tabindex', '0');
    $('.a-colnav-item').on('focus', function() {
      if ($('.a-colnav-secondLevel.submenu.is-active').length === 1) {
        $(this).off('keydown.zf.drilldown');
        $(this).parent().find('.a-colnav-item-second')
          .eq(0)
          .focus();
      }
    });
  });
};

function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}!function(t){"use strict";function e(t){if(void 0===Function.prototype.name){var e=/function\s([^(]{1,})\(/,n=e.exec(t.toString());return n&&n.length>1?n[1].trim():""}return void 0===t.prototype?t.constructor.name:t.prototype.constructor.name}function n(t){return/true/.test(t)?!0:/false/.test(t)?!1:isNaN(1*t)?t:parseFloat(t)}function i(t){return t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}var o="6.2.2",a={version:o,_plugins:{},_uuids:[],rtl:function(){return"rtl"===t("html").attr("dir")},plugin:function(t,n){var o=n||e(t),a=i(o);this._plugins[a]=this[o]=t},registerPlugin:function(t,n){var o=n?i(n):e(t.constructor).toLowerCase();t.uuid=this.GetYoDigits(6,o),t.$element.attr("data-"+o)||t.$element.attr("data-"+o,t.uuid),t.$element.data("zfPlugin")||t.$element.data("zfPlugin",t),t.$element.trigger("init.zf."+o),this._uuids.push(t.uuid)},unregisterPlugin:function(t){var n=i(e(t.$element.data("zfPlugin").constructor));this._uuids.splice(this._uuids.indexOf(t.uuid),1),t.$element.removeAttr("data-"+n).removeData("zfPlugin").trigger("destroyed.zf."+n);for(var o in t)t[o]=null},reInit:function(e){var n=e instanceof t;try{if(n)e.each(function(){t(this).data("zfPlugin")._init()});else{var o=typeof e,a=this,r={object:function(e){e.forEach(function(e){e=i(e),t("[data-"+e+"]").foundation("_init")})},string:function(){e=i(e),t("[data-"+e+"]").foundation("_init")},undefined:function(){this.object(Object.keys(a._plugins))}};r[o](e)}}catch(s){console.error(s)}finally{return e}},GetYoDigits:function(t,e){return t=t||6,Math.round(Math.pow(36,t+1)-Math.random()*Math.pow(36,t)).toString(36).slice(1)+(e?"-"+e:"")},reflow:function(e,i){"undefined"==typeof i?i=Object.keys(this._plugins):"string"==typeof i&&(i=[i]);var o=this;t.each(i,function(i,a){var r=o._plugins[a],s=t(e).find("[data-"+a+"]").addBack("[data-"+a+"]");s.each(function(){var e=t(this),i={};if(e.data("zfPlugin"))return void console.warn("Tried to initialize "+a+" on an element that already has a Foundation plugin.");if(e.attr("data-options")){e.attr("data-options").split(";").forEach(function(t,e){var o=t.split(":").map(function(t){return t.trim()});o[0]&&(i[o[0]]=n(o[1]))})}try{e.data("zfPlugin",new r(t(this),i))}catch(o){console.error(o)}finally{return}})})},getFnName:e,transitionend:function(t){var e,n={transition:"transitionend",WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend"},i=document.createElement("div");for(var o in n)"undefined"!=typeof i.style[o]&&(e=n[o]);return e?e:(e=setTimeout(function(){t.triggerHandler("transitionend",[t])},1),"transitionend")}};a.util={throttle:function(t,e){var n=null;return function(){var i=this,o=arguments;null===n&&(n=setTimeout(function(){t.apply(i,o),n=null},e))}}};var r=function(n){var i=typeof n,o=t("meta.foundation-mq"),r=t(".no-js");if(o.length||t('<meta class="foundation-mq">').appendTo(document.head),r.length&&r.removeClass("no-js"),"undefined"===i)a.MediaQuery._init(),a.reflow(this);else{if("string"!==i)throw new TypeError("We're sorry, "+i+" is not a valid parameter. You must use a string representing the method you wish to invoke.");var s=Array.prototype.slice.call(arguments,1),l=this.data("zfPlugin");if(void 0===l||void 0===l[n])throw new ReferenceError("We're sorry, '"+n+"' is not an available method for "+(l?e(l):"this element")+".");1===this.length?l[n].apply(l,s):this.each(function(e,i){l[n].apply(t(i).data("zfPlugin"),s)})}return this};window.Foundation=a,t.fn.foundation=r,function(){Date.now&&window.Date.now||(window.Date.now=Date.now=function(){return(new Date).getTime()});for(var t=["webkit","moz"],e=0;e<t.length&&!window.requestAnimationFrame;++e){var n=t[e];window.requestAnimationFrame=window[n+"RequestAnimationFrame"],window.cancelAnimationFrame=window[n+"CancelAnimationFrame"]||window[n+"CancelRequestAnimationFrame"]}if(/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent)||!window.requestAnimationFrame||!window.cancelAnimationFrame){var i=0;window.requestAnimationFrame=function(t){var e=Date.now(),n=Math.max(i+16,e);return setTimeout(function(){t(i=n)},n-e)},window.cancelAnimationFrame=clearTimeout}window.performance&&window.performance.now||(window.performance={start:Date.now(),now:function(){return Date.now()-this.start}})}(),Function.prototype.bind||(Function.prototype.bind=function(t){if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var e=Array.prototype.slice.call(arguments,1),n=this,i=function(){},o=function(){return n.apply(this instanceof i?this:t,e.concat(Array.prototype.slice.call(arguments)))};return this.prototype&&(i.prototype=this.prototype),o.prototype=new i,o})}(jQuery),!function(t){function e(t){var e={};return"string"!=typeof t?e:(t=t.trim().slice(1,-1))?e=t.split("&").reduce(function(t,e){var n=e.replace(/\+/g," ").split("="),i=n[0],o=n[1];return i=decodeURIComponent(i),o=void 0===o?null:decodeURIComponent(o),t.hasOwnProperty(i)?Array.isArray(t[i])?t[i].push(o):t[i]=[t[i],o]:t[i]=o,t},{}):e}var n={queries:[],current:"",_init:function(){var n,i=this,o=t(".foundation-mq").css("font-family");n=e(o);for(var a in n)n.hasOwnProperty(a)&&i.queries.push({name:a,value:"only screen and (min-width: "+n[a]+")"});this.current=this._getCurrentSize(),this._watcher()},atLeast:function(t){var e=this.get(t);return e?window.matchMedia(e).matches:!1},get:function(t){for(var e in this.queries)if(this.queries.hasOwnProperty(e)){var n=this.queries[e];if(t===n.name)return n.value}return null},_getCurrentSize:function(){for(var t,e=0;e<this.queries.length;e++){var n=this.queries[e];window.matchMedia(n.value).matches&&(t=n)}return"object"==typeof t?t.name:t},_watcher:function(){var e=this;t(window).on("resize.zf.mediaquery",function(){var n=e._getCurrentSize(),i=e.current;n!==i&&(e.current=n,t(window).trigger("changed.zf.mediaquery",[n,i]))})}};Foundation.MediaQuery=n,window.matchMedia||(window.matchMedia=function(){"use strict";var t=window.styleMedia||window.media;if(!t){var e=document.createElement("style"),n=document.getElementsByTagName("script")[0],i=null;e.type="text/css",e.id="matchmediajs-test",n.parentNode.insertBefore(e,n),i="getComputedStyle"in window&&window.getComputedStyle(e,null)||e.currentStyle,t={matchMedium:function(t){var n="@media "+t+"{ #matchmediajs-test { width: 1px; } }";return e.styleSheet?e.styleSheet.cssText=n:e.textContent=n,"1px"===i.width}}}return function(e){return{matches:t.matchMedium(e||"all"),media:e||"all"}}}()),Foundation.MediaQuery=n}(jQuery),!function(t){function e(t){var e={};for(var n in t)e[t[n]]=t[n];return e}var n={9:"TAB",13:"ENTER",27:"ESCAPE",32:"SPACE",37:"ARROW_LEFT",38:"ARROW_UP",39:"ARROW_RIGHT",40:"ARROW_DOWN"},i={},o={keys:e(n),parseKey:function(t){var e=n[t.which||t.keyCode]||String.fromCharCode(t.which).toUpperCase();return t.shiftKey&&(e="SHIFT_"+e),t.ctrlKey&&(e="CTRL_"+e),t.altKey&&(e="ALT_"+e),e},handleKey:function(e,n,o){var a,r,s,l=i[n],u=this.parseKey(e);if(!l)return console.warn("Component not defined!");if(a="undefined"==typeof l.ltr?l:Foundation.rtl()?t.extend({},l.ltr,l.rtl):t.extend({},l.rtl,l.ltr),r=a[u],s=o[r],s&&"function"==typeof s){var d=s.apply();(o.handled||"function"==typeof o.handled)&&o.handled(d)}else(o.unhandled||"function"==typeof o.unhandled)&&o.unhandled()},findFocusable:function(e){return e.find("a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]").filter(function(){return t(this).is(":visible")&&!(t(this).attr("tabindex")<0)})},register:function(t,e){i[t]=e}};Foundation.Keyboard=o}(jQuery),!function(t){function e(t,e,n){function i(s){r||(r=window.performance.now()),a=s-r,n.apply(e),t>a?o=window.requestAnimationFrame(i,e):(window.cancelAnimationFrame(o),e.trigger("finished.zf.animate",[e]).triggerHandler("finished.zf.animate",[e]))}var o,a,r=null;o=window.requestAnimationFrame(i)}function n(e,n,a,r){function s(){e||n.hide(),l(),r&&r.apply(n)}function l(){n[0].style.transitionDuration=0,n.removeClass(u+" "+d+" "+a)}if(n=t(n).eq(0),n.length){var u=e?i[0]:i[1],d=e?o[0]:o[1];l(),n.addClass(a).css("transition","none"),requestAnimationFrame(function(){n.addClass(u),e&&n.show()}),requestAnimationFrame(function(){n[0].offsetWidth,n.css("transition","").addClass(d)}),n.one(Foundation.transitionend(n),s)}}var i=["mui-enter","mui-leave"],o=["mui-enter-active","mui-leave-active"],a={animateIn:function(t,e,i){n(!0,t,e,i)},animateOut:function(t,e,i){n(!1,t,e,i)}};Foundation.Move=e,Foundation.Motion=a}(jQuery),!function(t){var e={Feather:function(e){var n=arguments.length<=1||void 0===arguments[1]?"zf":arguments[1];e.attr("role","menubar");var i=e.find("li").attr({role:"menuitem"}),o="is-"+n+"-submenu",a=o+"-item",r="is-"+n+"-submenu-parent";e.find("a:first").attr("tabindex",0),i.each(function(){var e=t(this),n=e.children("ul");n.length&&(e.addClass(r).attr({"aria-haspopup":!0,"aria-expanded":!1,"aria-label":e.children("a:first").text()}),n.addClass("submenu "+o).attr({"data-submenu":"","aria-hidden":!0,role:"menu"})),e.parent("[data-submenu]").length&&e.addClass("is-submenu-item "+a)})},Burn:function(t,e){var n=(t.find("li").removeAttr("tabindex"),"is-"+e+"-submenu"),i=n+"-item",o="is-"+e+"-submenu-parent";t.find("*").removeClass(n+" "+i+" "+o+" is-submenu-item submenu is-active").removeAttr("data-submenu").css("display","")}};Foundation.Nest=e}(jQuery),!function(t){function e(t,e,i,o){var a,r,s,l,u=n(t);if(e){var d=n(e);r=u.offset.top+u.height<=d.height+d.offset.top,a=u.offset.top>=d.offset.top,s=u.offset.left>=d.offset.left,l=u.offset.left+u.width<=d.width+d.offset.left}else r=u.offset.top+u.height<=u.windowDims.height+u.windowDims.offset.top,a=u.offset.top>=u.windowDims.offset.top,s=u.offset.left>=u.windowDims.offset.left,l=u.offset.left+u.width<=u.windowDims.width;var c=[r,a,s,l];return i?s===l==!0:o?a===r==!0:-1===c.indexOf(!1)}function n(t,e){if(t=t.length?t[0]:t,t===window||t===document)throw new Error("I'm sorry, Dave. I'm afraid I can't do that.");var n=t.getBoundingClientRect(),i=t.parentNode.getBoundingClientRect(),o=document.body.getBoundingClientRect(),a=window.pageYOffset,r=window.pageXOffset;return{width:n.width,height:n.height,offset:{top:n.top+a,left:n.left+r},parentDims:{width:i.width,height:i.height,offset:{top:i.top+a,left:i.left+r}},windowDims:{width:o.width,height:o.height,offset:{top:a,left:r}}}}function i(t,e,i,o,a,r){var s=n(t),l=e?n(e):null;switch(i){case"top":return{left:Foundation.rtl()?l.offset.left-s.width+l.width:l.offset.left,top:l.offset.top-(s.height+o)};case"left":return{left:l.offset.left-(s.width+a),top:l.offset.top};case"right":return{left:l.offset.left+l.width+a,top:l.offset.top};case"center top":return{left:l.offset.left+l.width/2-s.width/2,top:l.offset.top-(s.height+o)};case"center bottom":return{left:r?a:l.offset.left+l.width/2-s.width/2,top:l.offset.top+l.height+o};case"center left":return{left:l.offset.left-(s.width+a),top:l.offset.top+l.height/2-s.height/2};case"center right":return{left:l.offset.left+l.width+a+1,top:l.offset.top+l.height/2-s.height/2};case"center":return{left:s.windowDims.offset.left+s.windowDims.width/2-s.width/2,top:s.windowDims.offset.top+s.windowDims.height/2-s.height/2};case"reveal":return{left:(s.windowDims.width-s.width)/2,top:s.windowDims.offset.top+o};case"reveal full":return{left:s.windowDims.offset.left,top:s.windowDims.offset.top};case"left bottom":return{left:l.offset.left-(s.width+a),top:l.offset.top+l.height};case"right bottom":return{left:l.offset.left+l.width+a-s.width,top:l.offset.top+l.height};default:return{left:Foundation.rtl()?l.offset.left-s.width+l.width:l.offset.left,top:l.offset.top+l.height+o}}}Foundation.Box={ImNotTouchingYou:e,GetDimensions:n,GetOffsets:i}}(jQuery),!function(t){function e(){a(),i(),o(),n()}function n(e){var n=t("[data-yeti-box]"),i=["dropdown","tooltip","reveal"];if(e&&("string"==typeof e?i.push(e):"object"==typeof e&&"string"==typeof e[0]?i.concat(e):console.error("Plugin names must be strings")),n.length){var o=i.map(function(t){return"closeme.zf."+t}).join(" ");t(window).off(o).on(o,function(e,n){var i=e.namespace.split(".")[0],o=t("[data-"+i+"]").not('[data-yeti-box="'+n+'"]');o.each(function(){var e=t(this);e.triggerHandler("close.zf.trigger",[e])})})}}function i(e){var n=void 0,i=t("[data-resize]");i.length&&t(window).off("resize.zf.trigger").on("resize.zf.trigger",function(o){n&&clearTimeout(n),n=setTimeout(function(){r||i.each(function(){t(this).triggerHandler("resizeme.zf.trigger")}),i.attr("data-events","resize")},e||10)})}function o(e){var n=void 0,i=t("[data-scroll]");i.length&&t(window).off("scroll.zf.trigger").on("scroll.zf.trigger",function(o){n&&clearTimeout(n),n=setTimeout(function(){r||i.each(function(){t(this).triggerHandler("scrollme.zf.trigger")}),i.attr("data-events","scroll")},e||10)})}function a(){if(!r)return!1;var e=document.querySelectorAll("[data-resize], [data-scroll], [data-mutate]"),n=function(e){var n=t(e[0].target);switch(n.attr("data-events")){case"resize":n.triggerHandler("resizeme.zf.trigger",[n]);break;case"scroll":n.triggerHandler("scrollme.zf.trigger",[n,window.pageYOffset]);break;default:return!1}};if(e.length)for(var i=0;i<=e.length-1;i++){var o=new r(n);o.observe(e[i],{attributes:!0,childList:!1,characterData:!1,subtree:!1,attributeFilter:["data-events"]})}}var r=function(){for(var t=["WebKit","Moz","O","Ms",""],e=0;e<t.length;e++)if(t[e]+"MutationObserver"in window)return window[t[e]+"MutationObserver"];return!1}(),s=function(e,n){e.data(n).split(" ").forEach(function(i){t("#"+i)["close"===n?"trigger":"triggerHandler"](n+".zf.trigger",[e])})};t(document).on("click.zf.trigger","[data-open]",function(){s(t(this),"open")}),t(document).on("click.zf.trigger","[data-close]",function(){var e=t(this).data("close");e?s(t(this),"close"):t(this).trigger("close.zf.trigger")}),t(document).on("click.zf.trigger","[data-toggle]",function(){s(t(this),"toggle")}),t(document).on("close.zf.trigger","[data-closable]",function(e){e.stopPropagation();var n=t(this).data("closable");""!==n?Foundation.Motion.animateOut(t(this),n,function(){t(this).trigger("closed.zf")}):t(this).fadeOut().trigger("closed.zf")}),t(document).on("focus.zf.trigger blur.zf.trigger","[data-toggle-focus]",function(){var e=t(this).data("toggle-focus");t("#"+e).triggerHandler("toggle.zf.trigger",[t(this)])}),t(window).load(function(){e()}),Foundation.IHearYou=e}(jQuery);var _createClass=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();!function(t){var e=function(){function e(n,i){_classCallCheck(this,e),this.$element=n,this.options=t.extend({},e.defaults,this.$element.data(),i),Foundation.Nest.Feather(this.$element,"drilldown"),this._init(),Foundation.registerPlugin(this,"Drilldown"),Foundation.Keyboard.register("Drilldown",{ENTER:"open",SPACE:"open",ARROW_RIGHT:"next",ARROW_UP:"up",ARROW_DOWN:"down",ARROW_LEFT:"previous",ESCAPE:"close",TAB:"down",SHIFT_TAB:"up"})}return _createClass(e,[{key:"_init",value:function(){this.$submenuAnchors=this.$element.find("li.is-drilldown-submenu-parent").children("a"),this.$submenus=this.$submenuAnchors.parent("li").children("[data-submenu]"),this.$menuItems=this.$element.find("li").not(".js-drilldown-back").attr("role","menuitem").find("a"),this._prepareMenu(),this._keyboardEvents()}},{key:"_prepareMenu",value:function(){var e=this;this.$submenuAnchors.each(function(){var n=t(this),i=n.parent();e.options.parentLink&&n.clone().prependTo(i.children("[data-submenu]")).wrap('<li class="is-submenu-parent-item is-submenu-item is-drilldown-submenu-item" role="menu-item"></li>'),n.data("savedHref",n.attr("href")).removeAttr("href"),n.children("[data-submenu]").attr({"aria-hidden":!0,tabindex:0,role:"menu"}),e._events(n)}),this.$submenus.each(function(){var n=t(this),i=n.find(".js-drilldown-back");i.length||n.prepend(e.options.backButton),e._back(n)}),this.$element.parent().hasClass("is-drilldown")||(this.$wrapper=t(this.options.wrapper).addClass("is-drilldown"),this.$wrapper=this.$element.wrap(this.$wrapper).parent().css(this._getMaxDims()))}},{key:"_events",value:function(e){var n=this;e.off("click.zf.drilldown").on("click.zf.drilldown",function(i){if(t(i.target).parentsUntil("ul","li").hasClass("is-drilldown-submenu-parent")&&(i.stopImmediatePropagation(),i.preventDefault()),n._show(e.parent("li")),n.options.closeOnClick){var o=t("body");o.off(".zf.drilldown").on("click.zf.drilldown",function(e){e.target===n.$element[0]||t.contains(n.$element[0],e.target)||(e.preventDefault(),n._hideAll(),o.off(".zf.drilldown"))})}})}},{key:"_keyboardEvents",value:function(){var e=this;this.$menuItems.add(this.$element.find(".js-drilldown-back > a")).on("keydown.zf.drilldown",function(n){var i,o,a=t(this),r=a.parent("li").parent("ul").children("li").children("a");r.each(function(e){return t(this).is(a)?(i=r.eq(Math.max(0,e-1)),void(o=r.eq(Math.min(e+1,r.length-1)))):void 0}),Foundation.Keyboard.handleKey(n,"Drilldown",{next:function(){return a.is(e.$submenuAnchors)?(e._show(a.parent("li")),a.parent("li").one(Foundation.transitionend(a),function(){a.parent("li").find("ul li a").filter(e.$menuItems).first().focus()}),!0):void 0},previous:function(){return e._hide(a.parent("li").parent("ul")),a.parent("li").parent("ul").one(Foundation.transitionend(a),function(){setTimeout(function(){a.parent("li").parent("ul").parent("li").children("a").first().focus()},1)}),!0},up:function(){return i.focus(),!0},down:function(){return o.focus(),!0},close:function(){e._back()},open:function(){return a.is(e.$menuItems)?a.is(e.$submenuAnchors)&&(e._show(a.parent("li")),a.parent("li").one(Foundation.transitionend(a),function(){a.parent("li").find("ul li a").filter(e.$menuItems).first().focus()})):(e._hide(a.parent("li").parent("ul")),a.parent("li").parent("ul").one(Foundation.transitionend(a),function(){setTimeout(function(){a.parent("li").parent("ul").parent("li").children("a").first().focus()},1)})),!0},handled:function(t){t&&n.preventDefault(),n.stopImmediatePropagation()}})})}},{key:"_hideAll",value:function(){var t=this.$element.find(".is-drilldown-submenu.is-active").addClass("is-closing");t.one(Foundation.transitionend(t),function(e){t.removeClass("is-active is-closing")}),this.$element.trigger("closed.zf.drilldown")}},{key:"_back",value:function(t){var e=this;t.off("click.zf.drilldown"),t.children(".js-drilldown-back").on("click.zf.drilldown",function(n){n.stopImmediatePropagation(),e._hide(t)})}},{key:"_menuLinkEvents",value:function(){var t=this;this.$menuItems.not(".is-drilldown-submenu-parent").off("click.zf.drilldown").on("click.zf.drilldown",function(e){setTimeout(function(){t._hideAll()},0)})}},{key:"_show",value:function(t){t.children("[data-submenu]").addClass("is-active"),this.$element.trigger("open.zf.drilldown",[t])}},{key:"_hide",value:function(t){t.addClass("is-closing").one(Foundation.transitionend(t),function(){t.removeClass("is-active is-closing"),t.blur()}),t.trigger("hide.zf.drilldown",[t])}},{key:"_getMaxDims",value:function(){var e=0,n={};return this.$submenus.add(this.$element).each(function(){var n=t(this).children("li").length;e=n>e?n:e}),n["min-height"]=e*this.$menuItems[0].getBoundingClientRect().height+"px",n["max-width"]=this.$element[0].getBoundingClientRect().width+"px",n}},{key:"destroy",value:function(){this._hideAll(),Foundation.Nest.Burn(this.$element,"drilldown"),this.$element.unwrap().find(".js-drilldown-back, .is-submenu-parent-item").remove().end().find(".is-active, .is-closing, .is-drilldown-submenu").removeClass("is-active is-closing is-drilldown-submenu").end().find("[data-submenu]").removeAttr("aria-hidden tabindex role"),this.$submenuAnchors.each(function(){t(this).off(".zf.drilldown")}),this.$element.find("a").each(function(){var e=t(this);e.data("savedHref")&&e.attr("href",e.data("savedHref")).removeData("savedHref")}),Foundation.unregisterPlugin(this)}}]),e}();e.defaults={backButton:'<li class="js-drilldown-back"><a tabindex="0">Tilbake</a></li>',wrapper:"<div></div>",parentLink:!1,closeOnClick:!1},Foundation.plugin(e,"Drilldown")}(jQuery);var _createClass=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();!function(t){var e=function(){function e(n,i){_classCallCheck(this,e),this.$element=n,this.options=t.extend({},e.defaults,this.$element.data(),i),Foundation.Nest.Feather(this.$element,"accordion"),this._init(),Foundation.registerPlugin(this,"AccordionMenu"),Foundation.Keyboard.register("AccordionMenu",{ENTER:"toggle",SPACE:"toggle",ARROW_RIGHT:"open",ARROW_UP:"up",ARROW_DOWN:"down",ARROW_LEFT:"close",ESCAPE:"closeAll",TAB:"down",SHIFT_TAB:"up"})}return _createClass(e,[{key:"_init",value:function(){this.$element.find("[data-submenu]").not(".is-active").slideUp(0),this.$element.attr({role:"tablist","aria-multiselectable":this.options.multiOpen}),this.$menuLinks=this.$element.find(".is-accordion-submenu-parent"),this.$menuLinks.each(function(){var e=this.id||Foundation.GetYoDigits(6,"acc-menu-link"),n=t(this),i=n.children("[data-submenu]"),o=i[0].id||Foundation.GetYoDigits(6,"acc-menu"),a=i.hasClass("is-active");n.attr({"aria-controls":o,"aria-expanded":a,role:"tab",id:e}),i.attr({"aria-labelledby":e,"aria-hidden":!a,role:"tabpanel",id:o})});var e=this.$element.find(".is-active");if(e.length){var n=this;e.each(function(){n.down(t(this))})}this._events()}},{key:"_events",value:function(){var e=this;this.$element.find("li").each(function(){var n=t(this).children("[data-submenu]");n.length&&t(this).children("a").off("click.zf.accordionMenu").on("click.zf.accordionMenu",function(t){t.preventDefault(),e.toggle(n)})}).on("keydown.zf.accordionmenu",function(n){var i,o,a=t(this),r=a.parent("ul").children("li"),s=a.children("[data-submenu]");r.each(function(e){return t(this).is(a)?(i=r.eq(Math.max(0,e-1)).find("a").first(),o=r.eq(Math.min(e+1,r.length-1)).find("a").first(),t(this).children("[data-submenu]:visible").length&&(o=a.find("li:first-child").find("a").first()),t(this).is(":first-child")?i=a.parents("li").first().find("a").first():i.children("[data-submenu]:visible").length&&(i=i.find("li:last-child").find("a").first()),void(t(this).is(":last-child")&&(o=a.parents("li").first().next("li").find("a").first()))):void 0}),Foundation.Keyboard.handleKey(n,"AccordionMenu",{open:function(){s.is(":hidden")&&(e.down(s),s.find("li").first().find("a").first().focus())},close:function(){s.length&&!s.is(":hidden")?e.up(s):a.parent("[data-submenu]").length&&(e.up(a.parent("[data-submenu]")),a.parents("li").first().find("a").first().focus())},up:function(){return i.attr("tabindex",-1).focus(),!0},down:function(){return o.attr("tabindex",-1).focus(),!0},toggle:function(){a.children("[data-submenu]").length&&e.toggle(a.children("[data-submenu]"))},closeAll:function(){e.hideAll()},handled:function(t){t&&n.preventDefault(),n.stopImmediatePropagation()}})})}},{key:"hideAll",value:function(){this.$element.find("[data-submenu]").slideUp(this.options.slideSpeed)}},{key:"toggle",value:function(t){t.is(":animated")||(t.is(":hidden")?this.down(t):this.up(t))}},{key:"down",value:function(t){var e=this;this.options.multiOpen||this.up(this.$element.find(".is-active").not(t.parentsUntil(this.$element).add(t))),t.addClass("is-active").attr({"aria-hidden":!1}).parent(".is-accordion-submenu-parent").attr({"aria-expanded":!0}),t.slideDown(e.options.slideSpeed,function(){e.$element.trigger("down.zf.accordionMenu",[t])})}},{key:"up",value:function(t){var e=this;t.slideUp(e.options.slideSpeed,function(){e.$element.trigger("up.zf.accordionMenu",[t])});var n=t.find("[data-submenu]").slideUp(0).addBack().attr("aria-hidden",!0);n.parent(".is-accordion-submenu-parent").attr("aria-expanded",!1)}},{key:"destroy",value:function(){this.$element.find("[data-submenu]").slideDown(0).css("display",""),this.$element.find("a").off("click.zf.accordionMenu"),Foundation.Nest.Burn(this.$element,"accordion"),Foundation.unregisterPlugin(this)}}]),e}();e.defaults={slideSpeed:250,multiOpen:!0},Foundation.plugin(e,"AccordionMenu")}(jQuery);var _createClass=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();!function(t){var e=function(){function e(n,i){_classCallCheck(this,e),this.$element=n,this.options=t.extend({},e.defaults,this.$element.data(),i),Foundation.Nest.Feather(this.$element,"dropdown"),this._init(),Foundation.registerPlugin(this,"DropdownMenu"),Foundation.Keyboard.register("DropdownMenu",{ENTER:"open",SPACE:"open",ARROW_RIGHT:"next",ARROW_UP:"up",ARROW_DOWN:"down",ARROW_LEFT:"previous",ESCAPE:"close"})}return _createClass(e,[{key:"_init",value:function(){var t=this.$element.find("li.is-dropdown-submenu-parent");this.$element.children(".is-dropdown-submenu-parent").children(".is-dropdown-submenu").addClass("first-sub"),this.$menuItems=this.$element.find('[role="menuitem"]'),this.$tabs=this.$element.children('[role="menuitem"]'),this.$tabs.find("ul.is-dropdown-submenu").addClass(this.options.verticalClass),this.$element.hasClass(this.options.rightClass)||"right"===this.options.alignment||Foundation.rtl()||this.$element.parents(".top-bar-right").is("*")?(this.options.alignment="right",t.addClass("opens-left")):t.addClass("opens-right"),this.changed=!1,this._events()}},{key:"_events",value:function(){var e=this,n="ontouchstart"in window||"undefined"!=typeof window.ontouchstart,i="is-dropdown-submenu-parent",o=function(o){var a=t(o.target).parentsUntil("ul","."+i),r=a.hasClass(i),s="true"===a.attr("data-is-click");a.children(".is-dropdown-submenu");if(r)if(s){if(!e.options.closeOnClick||!e.options.clickOpen&&!n||e.options.forceFollow&&n)return;o.stopImmediatePropagation(),o.preventDefault(),e._hide(a)}else o.preventDefault(),o.stopImmediatePropagation(),e._show(a.children(".is-dropdown-submenu")),a.add(a.parentsUntil(e.$element,"."+i)).attr("data-is-click",!0)};(this.options.clickOpen||n)&&this.$menuItems.on("click.zf.dropdownmenu touchstart.zf.dropdownmenu",o),this.options.disableHover||this.$menuItems.on("mouseenter.zf.dropdownmenu",function(n){var o=t(this),a=o.hasClass(i);a&&(clearTimeout(e.delay),e.delay=setTimeout(function(){e._show(o.children(".is-dropdown-submenu"))},e.options.hoverDelay))}).on("mouseleave.zf.dropdownmenu",function(n){var o=t(this),a=o.hasClass(i);if(a&&e.options.autoclose){if("true"===o.attr("data-is-click")&&e.options.clickOpen)return!1;clearTimeout(e.delay),e.delay=setTimeout(function(){e._hide(o)},e.options.closingTime)}}),this.$menuItems.on("keydown.zf.dropdownmenu",function(n){var i,o,a=t(n.target).parentsUntil("ul",'[role="menuitem"]'),r=e.$tabs.index(a)>-1,s=r?e.$tabs:a.siblings("li").add(a);s.each(function(e){return t(this).is(a)?(i=s.eq(e-1),void(o=s.eq(e+1))):void 0});var l=function(){a.is(":last-child")||(o.children("a:first").focus(),n.preventDefault())},u=function(){i.children("a:first").focus(),n.preventDefault()},d=function(){var t=a.children("ul.is-dropdown-submenu");t.length&&(e._show(t),a.find("li > a:first").focus(),n.preventDefault())},c=function(){var t=a.parent("ul").parent("li");t.children("a:first").focus(),e._hide(t),n.preventDefault()},f={open:d,close:function(){e._hide(e.$element),e.$menuItems.find("a:first").focus(),n.preventDefault()},handled:function(){n.stopImmediatePropagation()}};r?e.$element.hasClass(e.options.verticalClass)?"left"===e.options.alignment?t.extend(f,{down:l,up:u,next:d,previous:c}):t.extend(f,{down:l,up:u,next:c,previous:d}):t.extend(f,{next:l,previous:u,down:d,up:c}):"left"===e.options.alignment?t.extend(f,{next:d,previous:c,down:l,up:u}):t.extend(f,{next:c,previous:d,down:l,up:u}),Foundation.Keyboard.handleKey(n,"DropdownMenu",f)})}},{key:"_addBodyHandler",value:function(){var e=t(document.body),n=this;e.off("mouseup.zf.dropdownmenu touchend.zf.dropdownmenu").on("mouseup.zf.dropdownmenu touchend.zf.dropdownmenu",function(t){var i=n.$element.find(t.target);i.length||(n._hide(),e.off("mouseup.zf.dropdownmenu touchend.zf.dropdownmenu"))})}},{key:"_show",value:function(e){var n=this.$tabs.index(this.$tabs.filter(function(n,i){return t(i).find(e).length>0})),i=e.parent("li.is-dropdown-submenu-parent").siblings("li.is-dropdown-submenu-parent");this._hide(i,n),e.css("visibility","hidden").addClass("js-dropdown-active").attr({"aria-hidden":!1}).parent("li.is-dropdown-submenu-parent").addClass("is-active").attr({"aria-expanded":!0});var o=Foundation.Box.ImNotTouchingYou(e,null,!0);if(!o){var a="left"===this.options.alignment?"-right":"-left",r=e.parent(".is-dropdown-submenu-parent");r.removeClass("opens"+a).addClass("opens-"+this.options.alignment),o=Foundation.Box.ImNotTouchingYou(e,null,!0),o||r.removeClass("opens-"+this.options.alignment).addClass("opens-inner"),this.changed=!0}e.css("visibility",""),this.options.closeOnClick&&this._addBodyHandler(),this.$element.trigger("show.zf.dropdownmenu",[e])}},{key:"_hide",value:function(t,e){var n;n=t&&t.length?t:void 0!==e?this.$tabs.not(function(t,n){return t===e}):this.$element;var i=n.hasClass("is-active")||n.find(".is-active").length>0;if(i){if(n.find("li.is-active").add(n).attr({"aria-expanded":!1,"data-is-click":!1}).removeClass("is-active"),n.find("ul.js-dropdown-active").attr({"aria-hidden":!0}).removeClass("js-dropdown-active"),this.changed||n.find("opens-inner").length){var o="left"===this.options.alignment?"right":"left";n.find("li.is-dropdown-submenu-parent").add(n).removeClass("opens-inner opens-"+this.options.alignment).addClass("opens-"+o),this.changed=!1}this.$element.trigger("hide.zf.dropdownmenu",[n])}}},{key:"destroy",value:function(){this.$menuItems.off(".zf.dropdownmenu").removeAttr("data-is-click").removeClass("is-right-arrow is-left-arrow is-down-arrow opens-right opens-left opens-inner"),t(document.body).off(".zf.dropdownmenu"),Foundation.Nest.Burn(this.$element,"dropdown"),Foundation.unregisterPlugin(this)}}]),e}();e.defaults={disableHover:!1,autoclose:!0,hoverDelay:50,clickOpen:!1,closingTime:500,alignment:"left",closeOnClick:!0,verticalClass:"vertical",rightClass:"align-right",forceFollow:!0},Foundation.plugin(e,"DropdownMenu")}(jQuery);var _createClass=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();!function(t){var e=function(){function e(n,i){_classCallCheck(this,e),this.$element=n,this.options=t.extend({},e.defaults,this.$element.data(),i),this._init(),Foundation.registerPlugin(this,"Magellan")}return _createClass(e,[{key:"_init",value:function(){var e=this.$element[0].id||Foundation.GetYoDigits(6,"magellan");this.$targets=t("[data-magellan-target]"),this.$links=this.$element.find("a"),this.$element.attr({"data-resize":e,"data-scroll":e,id:e}),this.$active=t(),this.scrollPos=parseInt(window.pageYOffset,10),this._events()}},{key:"calcPoints",value:function(){var e=this,n=document.body,i=document.documentElement;this.points=[],this.winHeight=Math.round(Math.max(window.innerHeight,i.clientHeight)),
this.docHeight=Math.round(Math.max(n.scrollHeight,n.offsetHeight,i.clientHeight,i.scrollHeight,i.offsetHeight)),this.$targets.each(function(){var n=t(this),i=Math.round(n.offset().top-e.options.threshold);n.targetPoint=i,e.points.push(i)})}},{key:"_events",value:function(){var e=this;t("html, body"),{duration:e.options.animationDuration,easing:e.options.animationEasing};t(window).one("load",function(){e.options.deepLinking&&location.hash&&e.scrollToLoc(location.hash),e.calcPoints(),e._updateActive()}),this.$element.on({"resizeme.zf.trigger":this.reflow.bind(this),"scrollme.zf.trigger":this._updateActive.bind(this)}).on("click.zf.magellan",'a[href^="#"]',function(t){t.preventDefault();var n=this.getAttribute("href");e.scrollToLoc(n)})}},{key:"scrollToLoc",value:function(e){var n=Math.round(t(e).offset().top-this.options.threshold/2-this.options.barOffset);t("html, body").stop(!0).animate({scrollTop:n},this.options.animationDuration,this.options.animationEasing)}},{key:"reflow",value:function(){this.calcPoints(),this._updateActive()}},{key:"_updateActive",value:function(){var t,e=parseInt(window.pageYOffset,10);if(e+this.winHeight===this.docHeight)t=this.points.length-1;else if(e<this.points[0])t=0;else{var n=this.scrollPos<e,i=this,o=this.points.filter(function(t,o){return n?t-i.options.barOffset<=e:t-i.options.barOffset-i.options.threshold<=e});t=o.length?o.length-1:0}if(this.$active.removeClass(this.options.activeClass),this.$active=this.$links.eq(t).addClass(this.options.activeClass),this.options.deepLinking){var a=this.$active[0].getAttribute("href");window.history.pushState?window.history.pushState(null,null,a):window.location.hash=a}this.scrollPos=e,this.$element.trigger("update.zf.magellan",[this.$active])}},{key:"destroy",value:function(){if(this.$element.off(".zf.trigger .zf.magellan").find("."+this.options.activeClass).removeClass(this.options.activeClass),this.options.deepLinking){var t=this.$active[0].getAttribute("href");window.location.hash.replace(t,"")}Foundation.unregisterPlugin(this)}}]),e}();e.defaults={animationDuration:500,animationEasing:"linear",threshold:50,activeClass:"active",deepLinking:!1,barOffset:0},Foundation.plugin(e,"Magellan")}(jQuery);var _createClass=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();!function(t){var e=function(){function e(n,i){_classCallCheck(this,e),this.$element=t(n),this.rules=this.$element.data("responsive-menu"),this.currentMq=null,this.currentPlugin=null,this._init(),this._events(),Foundation.registerPlugin(this,"ResponsiveMenu")}return _createClass(e,[{key:"_init",value:function(){if("string"==typeof this.rules){for(var e={},i=this.rules.split(" "),o=0;o<i.length;o++){var a=i[o].split("-"),r=a.length>1?a[0]:"small",s=a.length>1?a[1]:a[0];null!==n[s]&&(e[r]=n[s])}this.rules=e}t.isEmptyObject(this.rules)||this._checkMediaQueries()}},{key:"_events",value:function(){var e=this;t(window).on("changed.zf.mediaquery",function(){e._checkMediaQueries()})}},{key:"_checkMediaQueries",value:function(){var e,i=this;t.each(this.rules,function(t){Foundation.MediaQuery.atLeast(t)&&(e=t)}),e&&(this.currentPlugin instanceof this.rules[e].plugin||(t.each(n,function(t,e){i.$element.removeClass(e.cssClass)}),this.$element.addClass(this.rules[e].cssClass),this.currentPlugin&&this.currentPlugin.destroy(),this.currentPlugin=new this.rules[e].plugin(this.$element,{})))}},{key:"destroy",value:function(){this.currentPlugin.destroy(),t(window).off(".zf.ResponsiveMenu"),Foundation.unregisterPlugin(this)}}]),e}();e.defaults={};var n={dropdown:{cssClass:"dropdown",plugin:Foundation._plugins["dropdown-menu"]||null},drilldown:{cssClass:"drilldown",plugin:Foundation._plugins.drilldown||null},accordion:{cssClass:"accordion-menu",plugin:Foundation._plugins["accordion-menu"]||null}};Foundation.plugin(e,"ResponsiveMenu")}(jQuery);

/* globals $ */
var handleFocus = function() {
  // If state on input is 'focus', add class to a-input: 'a-input-focus'
  $('input.form-control').focus(function() {
    $(this).parent().addClass('a-input-focus');
  }).blur(function() {
    $(this).parent().removeClass('a-input-focus');
  });
  $('.a-radioButtons-stackedList').find('input[type=radio]').change(function() {
    var me = $(this);
    if (me.is(':checked')) {
      me.parent().addClass('a-js-radioParentGray');
      $('input[type=radio]').each(function() {
        if ($(this).attr('id') !== me.attr('id') &&
          $(this).attr('name') === me.attr('name')) {
          $(this).parent().removeClass('a-js-radioParentGray');
        }
      });
    }
  });
  // Prevent focus state styling on click
  $('body').on('mousedown', '*:not(input):not(textarea)', function(e) {
    e.stopPropagation();
    if ($(e.target).prop('nodeName') !== 'A' &&
      $(e.target).prop('nodeName') !== 'BUTTON') {
      if ($(e.target).parent().prop('nodeName') === 'A' ||
        $(e.target).parent().prop('nodeName') === 'BUTTON') {
        $(e.target).parent().trigger('mousedown');
      }
    }
    // Accomodate for popovers
    if ($(this).attr('data-toggle') !== 'popover' && !$(this).is('i')) {
      $(this).addClass('override-focus');
      setTimeout(function() {
        this.blur(); this.removeClass('override-focus');
      }.bind($(this)), 1500);
    }
    $(this).children('.custom-control-indicator').addClass('override-focus');
    setTimeout(function() {
      this.children('.custom-control-indicator').prev().blur();
      this.children('.custom-control-indicator').removeClass('override-focus');
    }.bind($(this)), 1500);
    $(this).children('.a-switch-label').addClass('override-focus');
    setTimeout(function() {
      this.children('.a-switch-label').prev().blur();
      this.children('.a-switch-label').removeClass('override-focus');
    }.bind($(this)), 1500);
  });
};

/* globals $ */
var handleValidatorLibrary = function() {
  $('.form-group').each(function() {
    var self = $(this);
    if (self.attr('data-toggle') === 'validator') {
      self.parent().attr('data-toggle', 'validator')
        .attr('data-delay', self.attr('data-delay')).validator();
    }
  });

  $('form[data-toggle="validator"]').each(function() {
    var $form = $(this);
    $form.on('validate.bs.validator', function() {
      var allValid = true;
      $form.find('input').each(function() {
        if (!this.validity.valid) {
          allValid = false;
        }
      });

      if (allValid) {
        $form.find('.a-js-hideWhenInvalid').show();
      } else {
        $form.find('.a-js-hideWhenInvalid').hide();
      }
    });
  });
};

/* globals $ */
var initializeDatepicker = function() {
  $('.form-control.date').datepicker({
    format: 'dd.mm.yyyy',
    language: 'no',
    todayHighlight: true,
    orientation: 'bottom left',
    maxViewMode: 0
  }).on('show', function(e) {
    $('.datepicker').find('.next').html('');
    $('.datepicker').find('.prev').html('');
    $('.datepicker').find('table').attr('cellpadding', '0');
    $('.datepicker').find('table').attr('cellspacing', '0');
    $('.datepicker').each(function() {
      if ($(this).find('.today').html().indexOf('<span') === -1) {
        $(this).find('.today').html('<span>' + $(this).find('.today').html() + '</span>');
      }
      if ($(this).find('.active').html().indexOf('<span') === -1) {
        $(this).find('.active').html('<span>' + $(this).find('.active').html() + '</span>');
      }
    });
  });
  $('.form-control.date').on('change', function() {
    $('.datepicker').each(function() {
      if ($(this).find('.today').html().indexOf('<span') === -1) {
        $(this).find('.today').html('<span>' + $(this).find('.today').html() + '</span>');
      }
      if ($(this).find('.active').html().indexOf('<span') === -1) {
        $(this).find('.active').html('<span>' + $(this).find('.active').html() + '</span>');
      }
    });
  });
  $('.form-control.date').datepicker('setDate', new Date());
};

/* globals $ */
var mobileNavigation = function() {
  $('.ap-sideNav-mobilebar').click(function() {
    var self = $(this);
    var searchButton = $('.a-toggle-search').hasClass('open');
    if (self.hasClass('open')) {
      $('.ap-sideNav-collapse').slideUp(300); self.removeClass('open');
    } else {
      if (searchButton === true) {
        $('.a-search').slideUp(300); $('.a-toggle-search').removeClass('open');
      }
      self.addClass('open'); $('.ap-sideNav-collapse').slideDown(300);
    }
    return false;
  });
  window.langTriggerClick = function(e) {
    var key = e.which;
    if (key === 13) {
      $(e.target).trigger('mousedown');
    } else if (key === 9) {
      if (!$('#exCollapsingNavbar').find('.a-dropdown-languages').hasClass('expand')) {
        $('#exCollapsingNavbar').find('.a-dropdown-languages').find('a').attr('tabindex', '-1');
      } else {
        $('#exCollapsingNavbar').find('.a-dropdown-languages').find('a').attr('tabindex', '0');
      }
    }
  };
};

/* globals $ */
var nameChecker = function() {
  var btnText = $('.a-js-validator').find('.a-btn-group').find('.a-btn').eq(0)
    .text();
  var initAction = '$(".a-js-validator").find("input[type=text]")' +
      '.attr("disabled", "disabled").parent().addClass("disabled")' +
      '.addClass("a-input-approved");' +
    '$(".a-js-validator").find(".a-validatorInfo").eq(0).hide();' +
    '$(".a-js-validator").find(".a-validatorInfo").eq(1).show();' +
    '$(".a-js-validator").find(".a-btn-group").find(".a-btn").eq(0)' +
      '.html("Velg navn").removeAttr("onclick")' +
      '.addClass("a-js-smoothStateEnabled");' +
    '$(".a-js-tryAnother").show();' +
    'window.smoothStateMod();';
  $('.a-js-validator').find('.a-validatorInfo').eq(1).find('i')
    .addClass('a-validatorInfo-icon-approved');
  $('.a-js-validator').find('.a-validatorInfo').css('display', 'inline-block')
    .eq(1)
    .hide();
  if ($('.a-js-tryAnother').length === 0) {
    $('<button/>', {
      type: 'button',
      class: 'a-btn-link a-js-tryAnother',
      text: 'Prøv et annet navn'
    }).appendTo('.a-btn-group', '.a-js-validator');
  }
  $('.a-js-tryAnother').hide().on('click', function() {
    $('.a-js-validator').find('input[type=text]').removeAttr('disabled')
    .parent()
    .removeClass('disabled')
    .removeClass('a-input-approved');
    $('.a-js-tryAnother').hide();
    $('.a-js-validator').find('.a-validatorInfo').eq(0).show();
    $('.a-js-validator').find('.a-validatorInfo').eq(1).hide();
    $('.a-js-validator').find('.a-btn-group').find('.a-btn').eq(0)
    .html(btnText)
    .removeClass('a-js-smoothStateEnabled')
    .attr('onclick', '$(".a-js-validator").find(".a-message-error").show()')
    .hide();
    $('.a-js-validator').find('input[type=text]').val('');
    $('.a-js-validator').find('.a-btn-group').find('.a-btn').eq(1)
    .show();
  });
  $('.a-js-validator').find('.a-message-error');
  function toggleBtns(el) {
    if ($(el).length > 0 && $(el).val().length > 0) {
      $('.a-js-validator').find('.a-btn-group').find('.a-btn').eq(0)
        .show();
      $('.a-js-validator').find('.a-btn-group').find('.a-btn').eq(1)
        .hide();
      if (
        $('.a-js-validator').find('input[type=text]').val()
          .indexOf($('.a-personSwitcher-name').attr('title').toLowerCase()
          .split(' ')[1]) !== -1 ||
        $('.a-js-validator').find('input[type=text]').val()
          .indexOf($('.a-personSwitcher-name').attr('title')
          .split(' ')[1]) !== -1
      ) {
        $('.a-js-validator').find('.a-btn-group').find('.a-btn').eq(0)
          .attr('onclick', initAction);
      } else {
        $('.a-js-validator').find('.a-btn-group').find('.a-btn').eq(0)
          .attr('onclick',
            '$(".a-js-validator").find(".a-message-error").show()');
      }
    } else {
      $('.a-js-validator').find('.a-btn-group').find('.a-btn').eq(0)
        .hide();
      $('.a-js-validator').find('.a-btn-group').find('.a-btn').eq(1)
        .show();
    }
  }
  toggleBtns($('.a-js-validator').find('input[type=text]'));
  $('.a-js-validator').find('input[type=text]').on('keyup', function(e) {
    if (e.which !== 13) {
      $('.a-js-validator').find('.a-message-error').hide();
    }
    toggleBtns(this);
  });
  $('.a-js-validator').find('input[type=text]').on('keydown', function(e) {
    $('.a-js-validator').find('.a-message-error').hide();
    if (e.which === 13) {
      e.preventDefault(); e.stopPropagation();
      if ($('.a-js-validator').find('.a-btn-group').find('.a-btn').eq(0)
        .is(':visible')) {
        $('.a-js-validator').find('.a-btn-group').find('.a-btn').eq(0)
          .click();
      }
    }
  });
  $('.a-js-validator').find('input[type=text]').on('change', function() {
    $('.a-js-validator').find('.a-message-error').hide();
    toggleBtns(this);
  });
};

/* globals $, onboardingStep, onboardingOnShow, onboardingSeek, onboardingHide,
  xmlToString, onboardingCrawl, onboardingBlank */
var onboarding = function() {
  var count = -1;
  $.get('../../images/flashlight.svg', function(data) {
    var steps = onboardingCrawl();
    $('.a-page').append('<span class="onboarding-wrapper"><span ' +
      'class="a-js-circle"></span>' + xmlToString(data) + '</span>' +
      '<span class="onboarding-neutral">' + xmlToString(data) + '</span>'
    );
    $('body').css('overflow-x', 'hidden');
    $('.onboarding-neutral').hide();
    $('.onboarding-wrapper').hide();
    $('.a-onboarding').find('.a-btn').on('click', function(e) {
      e.preventDefault(); e.stopPropagation();
      if ($(this).hasClass('a-btn-success')) {
        onboardingHide(onboardingStep(0));
      } else {
        if (count === -1) {
          $('.a-js-circle').css('opacity', '0');
        }
        count += 1;
        if (steps[count]) {
          onboardingSeek(count, steps);
        } else {
          $('.a-js-circle').css('opacity', '0.9'); onboardingBlank(true, 450);
        }
        onboardingStep(count + 1);
      }
    });
    $('.a-onboarding').find('.a-btn-link').on('click', function(e) {
      e.preventDefault(); e.stopPropagation();
      if (count === -1) {
        onboardingHide(onboardingStep(0));
      } else {
        count = -1; onboardingBlank(true); onboardingStep(0);
      }
    });
    $('.a-js-modalLauncher').each(function() {
      onboardingOnShow($(this).attr('data-target'), function() {
        count = -1; onboardingStep(0);
      });
    });
    $('#modalOnboarding').modal('show');
  });
};

var xmlToString = function(xmlData) {
  var xmlString;
  if (window.ActiveXObject) {
    xmlString = xmlData.xml;
  } else {
    xmlString = (new XMLSerializer()).serializeToString(xmlData);
  }
  return xmlString;
};
var onboardingBlank = function(bool, delay) {
  $('.onboarding-wrapper')
    .css('transform', 'translate3d(0, 0, 0) matrix(3, 0, 0, 3, 570, 700)');
  setTimeout(function() {
    if (bool) {
      $('.onboarding-neutral').css('opacity', '1');
      $('.onboarding-wrapper').css('opacity', '0');
      $('html, body').animate({ scrollTop: 0 }, 200);
    } else {
      $('.onboarding-neutral').css('opacity', '0');
      $('.onboarding-wrapper').css('opacity', '1');
    }
  }, delay || 0);
};
var onboardingCrawl = function() {
  var stepCrawlCount = 1; var arr = [];
  while (
    $('.a-page').find('.a-js-onboardingTarget-' + stepCrawlCount).length > 0
  ) {
    arr.push($('.a-page').find('.a-js-onboardingTarget-' + stepCrawlCount));
    stepCrawlCount += 1;
  }
  return arr;
};
var onboardingStep = function(i) {
  $('.a-onboarding').find('.modal-content').hide().eq(i)
    .show();
};
var onboardingOnShow = function(el, fn) {
  $(el).on('show.bs.modal', function() {
    $('.onboarding-neutral').fadeIn(200, 'linear');
    $('.onboarding-wrapper').show(); $('body').css('overflow-y', 'hidden');
    $('body').css('overflow-x', 'hidden');
    if (fn) {
      fn();
    }
  });
};
var onboardingHide = function(fn) {
  if (fn) {
    setTimeout(function() {
      $('body').css('overflow-x', 'auto');
      fn();
    }, 200);
  } else {
    setTimeout(function() {
      $('body').css('overflow-x', 'auto');
    }, 200);
  }
  $('.a-js-modalLauncher').each(function() {
    $($(this).attr('data-target')).modal('hide'); $('.onboarding-wrapper').hide();
  });
  $('.onboarding-neutral').fadeOut(200, 'linear');
  $('body').css('overflow-x', 'hidden');
  $('body').css('overflow-y', 'scroll');
};
var onboardingSeek = function(_count, _steps) {
  var count = _count; var steps = _steps;
  var horizontalJiggle; var verticalJiggle; var ratio;
  if (count === 0) {
    $('.a-js-circle').css('opacity', '0.9');
    setTimeout(function() {
      $('.onboarding-neutral').css('opacity', '0');
      $('.onboarding-wrapper').css('opacity', '1');
      $('.a-js-circle').css('opacity', '0');
    }, 250);
  } else {
    onboardingBlank(false);
  }
  ratio = (steps[count].width() / 7.5);
  if (ratio > 15) {
    ratio = 15;
  }
  if (steps[count - 1]) {
    if (steps[count - 1].offset().left < steps[count].offset().left) {
      horizontalJiggle = 10;
    } else if (
      steps[count - 1].offset().left > steps[count].offset().left
    ) {
      horizontalJiggle = -10;
    } else {
      horizontalJiggle = 0;
    }
    if (steps[count - 1].offset().top < steps[count].offset().top) {
      verticalJiggle = 10;
    } else if (
      steps[count - 1].offset().top > steps[count].offset().top
    ) {
      verticalJiggle = -10;
    } else {
      verticalJiggle = 0;
    }
  } else {
    horizontalJiggle = 10; verticalJiggle = 0;
  }
  $('.onboarding-wrapper').css(
    'transform',
      'translate3d(0, 0, 0) matrix(' + ratio + ', 0, 0, ' + ratio + ',' +
        (
          ratio === 15 ?
            steps[count].offset().left + 95 :
            steps[count].offset().left + (steps[count].width() / 2)
        ) + ',' +
        (
          ratio === 15 ?
            steps[count].offset().top + 30 :
            steps[count].offset().top + (steps[count].height() / 2)
        ) +
    ')'
  ).css('top', verticalJiggle + 'px').css('left', horizontalJiggle + 'px');
  setTimeout(function() {
    $('.onboarding-wrapper')
      .css('top', (verticalJiggle * -0.5) + 'px')
      .css('left', (horizontalJiggle * -0.5) + 'px');
    setTimeout(function() {
      $('.onboarding-wrapper')
        .css('top', (verticalJiggle * 0.25) + 'px')
        .css('left', (horizontalJiggle * 0.25) + 'px');
      setTimeout(function() {
        $('.onboarding-wrapper')
          .css('top', (verticalJiggle * -0.125) + 'px')
          .css('left', (horizontalJiggle * -0.125) + 'px');
        setTimeout(function() {
          $('.onboarding-wrapper').css('top', '0px').css('left', '0px');
        }, 100);
      }, 100);
    }, 100);
  }, 450);
  $('html, body').animate({
    scrollTop: steps[count].offset().top - (140)
  }, 200);
};

/* globals $ */
var popover = function() {
  $('[data-popover-content]').popover({
    html: true,
    content: function() {
      return $('#' + $(this).data('popover-content')).html();
    }
  });
  $('[data-toggle="popover"]').popover(); $('#example').popover();
  $('.a-js-persistPopover').find('i').eq(1).hide();
  $('.a-js-persistPopover').find('i').eq(0).on('click', function() {
    $('.a-js-persistPopover').popover('show');
  });
  $('.a-js-persistPopover').find('i').eq(1).on('click', function() {
    $('.a-js-persistPopover').popover('hide');
  });
  $('.a-js-persistPopover').on('shown.bs.popover', function() {
    $('.a-js-persistPopover').find('i').eq(0).hide();
    $('.a-js-persistPopover').find('i').eq(1).show();
    $('.popover-big').attr('style',
      $('.popover-big').attr('style').replace(
        /translateX\(.*?\)/, 'translateX(0px)'
      )
    );
    $('.popover-big').find('.popover-arrow').css(
      'left', ($(this).offset().left + 9) + 'px'
    );
    $('html, body').animate({
      scrollTop: $('.a-js-persistPopover').offset().top - 50
    }, 250);
  });
  $('.a-js-persistPopover').on('hidden.bs.popover', function() {
    $('.a-js-persistPopover').find('i').eq(0).show();
    $('.a-js-persistPopover').find('i').eq(1).hide();
  });
  $(window).scroll(function() {
    if ($('.popover-big').length > 0) {
      $('.popover-big').attr('style',
        $('.popover-big').attr('style').replace(
          /translateX\(.*?\)/, 'translateX(0px)'
        )
      );
    }
  });
  $(window).resize(function() {
    if ($('.popover-big').length > 0) {
      $('.popover-big').attr('style',
        $('.popover-big').attr('style').replace(
          /translateX\(.*?\)/, 'translateX(0px)'
        )
      );
    }
  });
};

/* globals $ */
var propagateContent = function() {
  $('.a-js-propagatedContentDestination').each(function() {
    var prefix = '.a-js-propagatedContentOrigin.';
    if ($(this).hasClass('replace-me')) {
      $(this).before($(prefix + $(this).attr('data-refclass')).html());
      $(this).remove();
    } else {
      $(this).html($(prefix + $(this).attr('data-refclass')).html());
    }
  });
};

/* globals $ */
var questionnaireInteraction = function() {
  $('.a-trigger-question').each(function() {
    $(this).find('input').on('change', function() {
      $(this).parent().parent().parent()
        .next()
        .show();
    });
  });
};

var resetSearchTarget = function($targetTable) {
  $targetTable.find('tr:not(.a-js-ignoreDuringSearch)').each(function() {
    $(this).show();
    $(this).find('td[data-searchable]').each(function() {
      var columnValue = $(this).text();
      columnValue = columnValue.replace('<mark>', '').replace('</mark>', '');
      $(this).text(columnValue);
    });
  });
};

var executeSearch = function($searchInput, $targetTable) {
  $targetTable.find('tbody>tr').each(function() {
    var $currentRow = $(this);
    var match = false;

    $(this).find('td[data-searchable]').each(function() {
      var matches;
      var pattern;
      var srcString = $(this).html();
      var term = $searchInput.val();

      // Create a regex with the search term that ignores tags,
      // this enables the search text "test testing" to hit "<span>test</span> testing"
      term = term.replace(/(\s+)/, '(<[^>]+>)*$1(<[^>]+>)*');
      pattern = new RegExp('(' + term + ')', 'gi');

      // Only perform the highlighting if there are matches
      matches = pattern.exec(srcString);
      if (matches && matches.length > 0) {
        srcString = srcString.replace(pattern, '<mark>$1</mark>');

        // If a search for "test testing" made a hit in "<span>test</span> testing", the resulting
        // html would look like "<span><mark>test</span> testing</mark>", but we want
        // "<span><mark>test</mark></span><mark> testing</mark>"
        srcString = srcString.replace(/(<mark>[^<>]*)((<[^>]+>)+)([^<>]*<\/mark>)/, '$1</mark>$2<mark>$4');

        // Update the column with the highlighted content, and register that a match was made
        $(this).html(srcString);
        match = true;
      }
    });

    // If there was no match in any of the searchable columns, hide the current row
    if (!match && !$currentRow.hasClass('a-js-ignoreDuringSearch')) {
      $currentRow.hide();
    }
  });
};

var searchTableWithHighlight = function($searchInput, $targetTable) {
  $searchInput.on('input', function() {
    var searchTerm = $(this).val();
    resetSearchTarget($targetTable);

    // Exit if no input has been given
    if (searchTerm.length === 0) {
      return false;
    }

    executeSearch($searchInput, $targetTable);

    return true;
  });
};

// Register the search-event for all input fields with the data attribute
// "search-algorithm" set to "show-and-highlight"
$(document).on('ready', function() {
  $('input[data-search-algorithm="show-and-highlight"]').each(function() {
    var input = this;
    $.each(this.dataset.searchTarget.split(','), function() {
      searchTableWithHighlight($(input), $('#' + this.toString()));
    });
  });
});

/* globals goBack */
var onConfirmDeletionClick = function() {
  var $table = $('table[data-table-eventhandler="tableRowToggle"]');
  var $segmentDone = $('.segment-done');
  var $selectedRows;
  var goToReceipt = false;

  if ($table.find('tbody>tr.selected').length === $table.find('tbody>tr').length) {
    goToReceipt = true;
  } else {
    $selectedRows = $table.find('tbody>tr.selected');
    $selectedRows.removeClass('selected').addClass('deleted');
    $selectedRows.find('td:last-child span').hide();
    $selectedRows.find('td:last-child span.deleted-action').show();
    $segmentDone.hide();
  }

  return goToReceipt;
};

var handleModalClose = function(src, targetUrl) {
  var hasSelectedRows = $('table[data-table-eventhandler="tableRowToggle"] tr.selected').length > 0;
  if (!hasSelectedRows) {
    $(src).popover('disable');
    location.href = targetUrl;
  }
};

var setupDeletableRowsTable = function() {
  var $table = $('table[data-table-eventhandler="tableRowToggle"]');
  var $segmentDone = $('.segment-done');
  var $selectedRows;
  $table.on('click', 'tbody>tr', function() {
    $(this).toggleClass('selected');
    if ($(this).hasClass('selected')) {
      $(this).find('td:last-child span').hide();
      $(this).find('td:last-child span.undo-action').show();
    } else {
      $(this).find('td:last-child span').hide();
      $(this).find('td:last-child span.remove-action').show();
    }
    if ($table.find('tr.selected').length > 0) {
      $segmentDone.show();
    } else {
      $segmentDone.hide();
    }
  });
  $('.add-remove-all').on('click', function() {
    if ($table.find('tbody>tr.selected').length === $table.find('tbody>tr').length) {
      $table.find('tbody>tr').removeClass('selected');
      $table.find('td:last-child span').hide();
      $table.find('th:last-child span').hide();
      $table.find('td:last-child span.remove-action').show();
      $table.find('th:last-child span.remove-action').show();
      $segmentDone.hide();
    } else {
      $table.find('tbody>tr').addClass('selected');
      $table.find('td:last-child span').hide();
      $table.find('th:last-child span').hide();
      $table.find('td:last-child span.undo-action').show();
      $table.find('th:last-child span.undo-action').show();
      $segmentDone.show();
    }
  });
  $('#cancel-deletion').on('click', function() {
    $table.find('tbody>tr').removeClass('selected').removeClass('deleted');
    $table.find('td:last-child span').hide();
    $table.find('th:last-child span').hide();
    $table.find('td:last-child span.remove-action').show();
    $table.find('th:last-child span.remove-action').show();
  });
};

var sortAlphanumerically;
var defaultSort;
var reappendChildRows;

var compareTo = function(firstItem, secondItem) {
  var first;
  var second;
  if (firstItem === undefined && secondItem === undefined) {
    return 0;
  }
  if (firstItem === undefined) {
    return 1;
  }
  if (secondItem === undefined) {
    return -1;
  }

  first = firstItem.toString();
  second = secondItem.toString();
  if (first < second) {
    return -1;
  }

  if (first > second) {
    return 1;
  }
  return 0;
};

sortAlphanumerically = function(src, sortIndex) {
  var $table = $(src).closest('table');
  var rows = $table.find('tbody tr:not(.a-sortable-action-row)');
  $($table.find('th')).removeClass('active');
  $(src).addClass('active');
  rows.sort(function(a, b) {
    var A = $($(a).find('td')[sortIndex]).text()
      .toUpperCase();
    var B = $($(b).find('td')[sortIndex]).text()
      .toUpperCase();
    return compareTo(A, B);
  });

  reappendChildRows($table, rows);
};

reappendChildRows = function($table, rows) {
  $.each(rows, function(index, row) {
    var prev = $(row).next('.a-sortable-action-row');
    $table.children('tbody').append(row);
    $table.children('tbody').append(prev);
  });
};

defaultSort = function() {
  var tables = $('table.a-js-sortable');
  tables.each(function() {
    sortAlphanumerically($(this).find('th')[1], 1);
  });
};

/* globals $ */
var toggleExpand = function() {
  $('.js-toggle').click(function() {
    var self = $(this);
    if (self.hasClass('open')) {
      self.parent().find('.js-hide').slideUp(300);
      self.removeClass('open');
    } else {
      self.addClass('open');
      self.parent().find('.js-hide').slideDown(300);
    }
    return false;
  });
};

/* globals $ */
var toggleFilter = function() {
  $('.a-sortable-action-row.a-collapseContent').on('hide.bs.collapse', function(e) {
    $(e.currentTarget).hide();
    $(e.currentTarget).prev().removeClass('open');
  });
  $('.a-sortable-action-row.a-collapseContent').on('show.bs.collapse', function(e) {
    $(e.currentTarget).show();
    $(e.currentTarget).prev().addClass('open');
    $('.a-sortable-action-row.a-collapseContent').each(function() {
      if ($(this)[0].id !== e.currentTarget.id) {
        $(this).hide();
        $(this).collapse('hide');
        $(this).prev().removeClass('open');
        $(this).prev().find('.a-collapse-title').addClass('collapsed');
      }
    });
  });

  $('.a-collapseTitle').on('mouseup', function() {
    var actionRow = $(this).attr('data-target');
    if (!$(this).hasClass('collapsed')) {
      $(this).addClass('collapsed');
      $(actionRow).prev().removeClass('open');
      $(actionRow).css('display', 'none');
    } else {
      $('.a-collapseContent').removeClass('in');
      $('.a-collapse-title').addClass('collapsed');
      $(this).removeClass('collapsed');
      $('.open').next().css('display', 'none');
      $('.open').removeClass('open');
      $(actionRow).css('display', 'table-row');
      $(actionRow).prev().addClass('open');
    }
  });
  $('.a-collapse-title').on('keyup', function(e) {
    var key = e.which;
    if (key === 13) {
      e.stopImmediatePropagation(); e.stopPropagation(); e.preventDefault();
      $(e.target).trigger('mouseup');
    } else if (key === 9) {
      if ($($(e.target).attr('data-target')).hasClass('in')) {
        $($(e.target).attr('data-target')).find('.a-switch').eq(0)
          .trigger('focus');
      }
    }
  });
};

$(document).on('ready', function() {
  var $allWithTarget = $('.switch-container input[data-switch-target]');
  var allTargets = [];

  $.each($allWithTarget, function() {
    $.each($(this).data('switch-target'), function() {
      allTargets.push(this + '');
    });
  });

  $allWithTarget.on('click', function() {
    var $currentSwitch = $(this);
    var switchTargets = $currentSwitch.data('switch-target');

    $.each(switchTargets, function() {
      $('#' + this).show();
    });

    $.each(allTargets, function() {
      var hide = true;
      var outerTarget = this + '';

      $.each(switchTargets, function() {
        var innerTarget = this + '';
        if (outerTarget === innerTarget) {
          hide = false;
        }
      });

      if (hide) {
        $('#' + this).hide();
      }
    });
  });
});

/* globals $ */
var tooltip = function() {
  $('[data-toggle="tooltip"]').tooltip();
};

/* globals $ */
var uniformHeight = function() {
  var cardGroup = $('.a-card-group .row');
  var maxheight;
  if ($(window).width() >= 768) {
    maxheight = 0;
    cardGroup.children().each(function() {
      if ($(this).height() > maxheight) {
        maxheight = $(this).height();
      }
    });
    cardGroup.children().children().css('min-height', maxheight);
  } else {
    cardGroup.children().children().css('min-height', 'auto');
  }
};

/* globals questionnaireInteraction, drilldownInteraction, handleFocus,
mobileNavigation, propagateContent, toggleExpand, toggleFilter, uniformHeight,
tooltip, popover, aTagSpaceExpand, initializeDatepicker, onboarding,
nameChecker, codeLookup, handleValidatorLibrary, setupDeletableRowsTable,
defaultSort, setupAddRightsHandler */
window.altinnInit = function() {
  toggleExpand();
  drilldownInteraction();
  toggleFilter();
  uniformHeight();
  handleFocus();
  tooltip();
  popover();
  mobileNavigation();
  propagateContent();
  questionnaireInteraction();
  aTagSpaceExpand();
  initializeDatepicker();
  onboarding();
  nameChecker();
  codeLookup();
  handleValidatorLibrary();
  setupDeletableRowsTable();
  defaultSort();
  setupAddRightsHandler();
};
window.altinnInit();
