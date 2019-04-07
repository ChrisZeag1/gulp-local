modulePolyfill();

document.addEventListener("DOMContentLoaded", (event)  => {
  const tabs = new window.module.Tabs({target: 'Tab'});
  tabs.init();
});

function modulePolyfill() {
  if(!window.module) {
    window.module = {
    };
  }
}