modulePolifil();
document.addEventListener("DOMContentLoaded", event => {
  const tabs = window.module.tabs();
  tabs.init();
});

function modulePolifil() {
  if (!window.module) {
    window.module = {};
  }
}
window.module.tabs = function (props) {
  // TODO: find Object.assign polifil for IE10+.
  props = Object.assign({
    target: 'Tab'
  }, props);
  const tabs = document.getElementsByClassName(props.target);

  const init = () => {
    for (let j = 0; j < tabs.length; j++) {
      const tab = tabs[j];
      tab.addEventListener('click', function (event) {
        removeClasses(tabs, '__active');
        addClasses(document.getElementsByClassName('Tab-container'), '__hidden');
        this.classList.add('__active');

        if (this.children && this.children.length && /material-icons/g.test(this.children)) {
          editInnerHtml(document.getElementsByClassName('material-icons'), 'add');
          this.children[0].innerHTML = 'remove';
        }

        const content = document.getElementById(this.getAttribute('rel'));
        content.classList.remove('__hidden');
      });
    }

    ;
  };

  function removeClasses(domElements, className) {
    for (let i = 0; i < domElements.length; i++) {
      domElements[i].classList.remove(className);
    }
  }

  function addClasses(domElements, className) {
    for (let i = 0; i < domElements.length; i++) {
      domElements[i].classList.add(className);
    }
  }

  function editInnerHtml(domElements, newHtml) {
    for (let i = 0; i < domElements.length; i++) {
      domElements[i].innerHTML = newHtml;
    }
  }

  return {
    init
  };
};