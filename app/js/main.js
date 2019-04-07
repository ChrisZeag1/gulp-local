modulePolifil();

document.addEventListener("DOMContentLoaded", (event)  => {
  const tabs = window.module.tabs();
  tabs.init();
});

function modulePolifil() {
  if(!window.module) {
    window.module = {
    };
  }
}