export default class themeChanger {
  constructor() {}
    
  _addDarkTheme() {
    var body = document.body;
    body.classList.remove("light");
    body.classList.add("dark");
    
  }

  _removeDarkTheme() {
    var body = document.body;
    body.classList.remove("dark");
    body.classList.add("light");
  }

  darkThemeSwitch() {
  //  let root = document.documentElement;
    var body = document.body;
    var bodyClass = body.className;


   /* //var element = document.getElementById('test');
    var style;
    if (window.getComputedStyle) {
        style = window.getComputedStyle(body);
    } else {
        style = body.currentStyle;
    }
    
    root.style.setProperty('--colorBackgroundStart',style.backgroundColor);*/
    
    switch(bodyClass){
      case "dark":this._removeDarkTheme(); break;
      case "light":this._addDarkTheme();  break;
      default:this._addDarkTheme(); break;
    }
  }
}