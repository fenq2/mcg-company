"use strict";

$(document).ready(function () {
  svg4everybody({});
}); // var sandwich = function () {
//     var $hideElement = $('.main-nav__list');
//     $('.main-nav__open-btn').on('click', function(){
//         $hideElement.addClass('main-nav__list-opend');
//     });
//     $('.main-nav__close-btn').on('click', function(){
//         $hideElement.removeClass('main-nav__wrap-opend');
//     });
// };
// sandwich();

$(".main-nav__open-btn").click(function () {
  return $(this).toggleClass('main-nav__open-btn--active');
});
$(".main-nav__item").click(function () {
  return $(this).toggleClass('main-nav__item--active').siblings().removeClass('main-nav__item--active');
});
'use strict';

function r(f) {
  /in/.test(document.readyState) ? setTimeout('r(' + f + ')', 9) : f();
}

r(function () {
  if (!document.getElementsByClassName) {
    // Поддержка IE8
    var getElementsByClassName = function getElementsByClassName(node, classname) {
      var a = [];
      var re = new RegExp('(^| )' + classname + '( |$)');
      var els = node.getElementsByTagName("*");

      for (var i = 0, j = els.length; i < j; i++) {
        if (re.test(els[i].className)) a.push(els[i]);
      }

      return a;
    };

    var videos = getElementsByClassName(document.body, "youtube");
  } else {
    var videos = document.getElementsByClassName("youtube");
  }

  var nb_videos = videos.length;

  for (var i = 0; i < nb_videos; i++) {
    // Находим постер для видео, зная ID нашего видео
    videos[i].style.backgroundImage = 'url(http://i.ytimg.com/vi/' + videos[i].id + '/sddefault.jpg)'; // Размещаем над постером кнопку Play, чтобы создать эффект плеера

    var play = document.createElement("div");
    play.setAttribute("class", "play");
    videos[i].appendChild(play);

    videos[i].onclick = function () {
      // Создаем iFrame и сразу начинаем проигрывать видео, т.е. атрибут autoplay у видео в значении 1
      var iframe = document.createElement("iframe");
      var iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1";
      if (this.getAttribute("data-params")) iframe_url += '&' + this.getAttribute("data-params");
      iframe.setAttribute("src", iframe_url);
      iframe.setAttribute("frameborder", '0'); // Высота и ширина iFrame будет как у элемента-родителя

      iframe.style.width = this.style.width;
      iframe.style.height = this.style.height; // Заменяем начальное изображение (постер) на iFrame

      this.parentNode.replaceChild(iframe, this);
    };
  }
}); // Полифилы
// forEach IE 11

if ('NodeList' in window && !NodeList.prototype.forEach) {
  console.info('polyfill for IE11');

  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;

    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
} // closest IE 11


(function () {
  if (!Element.prototype.closest) {
    Element.prototype.closest = function (css) {
      var node = this;

      while (node) {
        if (node.matches(css)) return node;else node = node.parentElement;
      }

      return null;
    };
  }
})(); // matches IE 11


(function () {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector;
  }
})(); //Array.form IE 11


if (!Array.from) {
  Array.from = function (object) {
    'use strict';

    return [].slice.call(object);
  };
}