modulePolyfill();

document.addEventListener("DOMContentLoaded", (event)  => {
  // new: executes our function Tabs and names it constructor
  // it also adds a prototype node to the new object, this property will be common 
  // to all objects created from Tabs function. This is the mechanism of inheritance in JS
  const tabs = new window.module.Tabs({target: 'Tab'});
  tabs.init();
});

function modulePolyfill() {
  if(!window.module) {
    window.module = {
    };
  }
}