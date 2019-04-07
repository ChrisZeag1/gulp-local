"use strict";

modulePolyfill();
document.addEventListener("DOMContentLoaded", function (event) {
  // new: executes our function Tabs and names it constructor
  // it also adds a prototype node to the new object, this property will be common 
  // to all objects created from Tabs function. This is the mechanism of inheritance in JS
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
  // TODO: find Object.assign polyfil for IE10+.
  //props = Object.assign({ target: 'Tab'}, props);
  var tabs = document.getElementsByClassName(props.target);

  var init = function init() {
    for (var j = 0; j < tabs.length; j++) {
      var tab = tabs[j];
      tab.addEventListener('click', function (event) {
        removeClasses(tabs, '__active');
        addClasses(document.getElementsByClassName('Tab-container'), '__hidden'); // this: pointing to the current context where click is being executed.

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
  }; // Hositing: function declarations only are moved to the top of the lexical scope.


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
  } // Closure: when init is excuted outside of its lexical scope, 
  // tabs variable doesn't quite exists in the code but init function is able to remeber it. 
  // Module is common pater in JS that uses closure and helps avoid polluting the global namespace.
  // and can make part of your "private"


  return {
    init: init
  };
};