export default class themeChanger {
  constructor() {}
    
  _addDarkTheme() {
    var body = document.body;
    body.classList.remove("light");
    body.classList.add("dark");
    
    this.initColor();
  }

  _removeDarkTheme() {
    var body = document.body;
    body.classList.remove("dark");
    body.classList.add("light");
    this.initColor();
  }

  darkThemeSwitch() {
  
    var body = document.body;
    var bodyClass = body.className;


   //var element = document.getElementById('test');
     
    switch(bodyClass){
      case "dark":this._removeDarkTheme(); break;
      case "light":this._addDarkTheme();  break;
      default:this._addDarkTheme(); break;
    }

    this.initColor();

   
  }

  initColor(){
    let root = document.documentElement;
    var body = document.body;
    var style;
    if (window.getComputedStyle) {
        style = window.getComputedStyle(body);
    } else {
        style = body.currentStyle;
    }

    root.style.setProperty('--currentBackgroundColor',style.backgroundColor);
  }
}