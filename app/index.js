"use strict";

modulePolyfill();
document.addEventListener("DOMContentLoaded", function (event) {
  var tabs = new window.module.Tabs({
    target: 'Tab'
  });
  tabs.init();
});

function modulePolyfill() {
  if (!window.module) {
    window.module = {};
  }
}
"use strict";

window.module.Tabs = function (props) {
  // TODO: find Object.assign polifil for IE10+.
  //props = Object.assign({ target: 'Tab'}, props);
  var tabs = document.getElementsByClassName(props.target);

  var init = function init() {
    for (var j = 0; j < tabs.length; j++) {
      var tab = tabs[j];
      tab.addEventListener('click', function (event) {
        removeClasses(tabs, '__active');
        addClasses(document.getElementsByClassName('Tab-container'), '__hidden');
        this.classList.add('__active');

        if (this.children && this.children.length && /material-icons/g.test(this.children[0].classList)) {
          editInnerHtml(document.getElementsByClassName('material-icons'), 'add');
          this.children[0].innerHTML = 'remove';
        }

        var content = document.getElementById(this.getAttribute('rel'));
        content.classList.remove('__hidden');
      });
    }

    ;
  };

  function removeClasses(domElements, className) {
    for (var i = 0; i < domElements.length; i++) {
      domElements[i].classList.remove(className);
    }
  }

  function addClasses(domElements, className) {
    for (var i = 0; i < domElements.length; i++) {
      domElements[i].classList.add(className);
    }
  }

  function editInnerHtml(domElements, newHtml) {
    for (var i = 0; i < domElements.length; i++) {
      domElements[i].innerHTML = newHtml;
    }
  }

  return {
    init: init
  };
};