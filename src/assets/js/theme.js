export default class themeChanger {
  constructor() {}
    
  _addDarkTheme() {
    var body = document.body;
    body.classList.remove("light");
    body.classList.add("dark");
    this.initColor(false);
  }

  _removeDarkTheme() {
    var body = document.body;
    body.classList.remove("dark");
    body.classList.add("light");
    this.initColor(true);
  }

  darkThemeSwitch() {
  
    var body = document.body;
    var bodyClass = body.className;
     
    switch(bodyClass){
      case "dark":this._removeDarkTheme(); break;
      case "light":this._addDarkTheme();  break;
      default:this._addDarkTheme(); break;
    }

    this.initColor(bodyClass != "light");

   
  }

  initColor(isLight){
    let root = document.documentElement;
    var body = document.body;
    var style;
    if (window.getComputedStyle) {
        style = window.getComputedStyle(body);
    } else {
        style = body.currentStyle;
    }

    root.style.setProperty('--currentBackgroundColor',style.backgroundColor);

    if(isLight){
      root.style.setProperty('--secondaryColor',"rgb(211, 211, 211)");
    }else{
      root.style.setProperty('--secondaryColor',"rgb(61, 61, 61)");
    }
          
  }
}