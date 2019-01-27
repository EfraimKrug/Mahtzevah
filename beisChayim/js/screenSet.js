// screen placement...
var screenConfig = JSON.parse(ScreenConfigList);
var panelConfig = JSON.parse(PanelConfigList);

// Straight configuration values
function getSideBarHeight(){
  return screenConfig.settings["SideBarHeight"];
}

function getSideBarLeft(){
  return screenConfig.settings["SideBarLeft"];
}

//SideBar values
function getSideBarTop(n){
  var boxHeight = parseInt(getSideBarHeight());
  var top = (boxHeight * n) + (30 * n);
  //if(top < 100) alert(boxHeight + ":" + n + ":" + top);
  return top + "px";
}

function getOneByWidth(){
  return screenConfig.settings["OneByWidth"] + "px";
}

function getTopName1(){
  return screenConfig.settings["OneByName1"] + "px";
}

function getLeftOffsetName(){
  return screenConfig.settings["LeftOffsetName"] + "px";
}

function getName1Font(){
  return screenConfig.settings["OneByName1Font"] + "px";
}

function getName2Font(){
  return screenConfig.settings["OneByName2Font"] + "px";
}

function getDate1Font(){
  return screenConfig.settings["OneByDate1Font"] + "px";
}

function getDate2Font(){
  return screenConfig.settings["OneByDate2Font"] + "px";
}

function getSideBarFont(){
  return screenConfig.settings["SideBarFont"] + "px";
}

function getTopName2(){
  return screenConfig.settings["OneByName2"] + "px";
}

function getTopDate1(){
  return screenConfig.settings["OneByDate1"] + "px";
}

function getTopDate2(){
  return screenConfig.settings["OneByDate2"] + "px";
}

function getBelowDate2(){
  return (parseInt(screenConfig.settings["OneByDate2"]) + 26) + "px";
}

function getLeftPic1(){
  return screenConfig.settings["LeftPic1"] + "px";
}

function getLeftPic2(){
  return screenConfig.settings["LeftPic2"] + "px";
}

function getTopPic1(){
  return screenConfig.settings["OneByPic1"] + "px";
}

function getTopPic2(){
  return screenConfig.settings["OneByPic2"] + "px";
}

function getTopComment01High(){
  return (parseInt(screenConfig.settings["OneByComment01"]) - 170) + "px";
}

function getTopComment01(){
  return screenConfig.settings["OneByComment01"] + "px";
}

function getLeftComment01(){
  return screenConfig.settings["LeftComment01"] + "px";
}

// Panel values
function getTopOffset(row){
    var offset = parseInt(panelConfig.settings["PanelOffset"]);
    var rowHeight = parseInt(panelConfig.settings["RowHeight"]);

    return  ((row * rowHeight) + offset) + "px";
}

function getTopOffsetInt(row){
    var offset = parseInt(panelConfig.settings["PanelOffset"]);
    var rowHeight = parseInt(panelConfig.settings["RowHeight"]);

    return  ((row * rowHeight) + offset);
}

function getPanelBoxWidth(){
    return parseInt(panelConfig.settings["BoxWidth"]);
}

function getPanelSideBoxWidth(){
    return parseInt(panelConfig.settings["SideBoxWidth"]);
}

function getPanelBoxHeight(){
    return parseInt(panelConfig.settings["BoxHeight"]);
}

function getPanelFont(){
    return parseInt(panelConfig.settings["PanelFont"]);
}

function getColumnWidth(){
    return parseInt(panelConfig.settings["ColumnWidth"]);
}

function getColumnOffsetInt(col){
    var offset = parseInt(panelConfig.settings["PanelLeftOffset"]);
    var colWidth = parseInt(panelConfig.settings["ColumnWidth"]);

    return  ((col * colWidth) + offset);
}

function getColumnOffset(col){
    var offset = parseInt(panelConfig.settings["PanelLeftOffset"]);
    var colWidth = parseInt(panelConfig.settings["ColumnWidth"]);

    return  ((col * colWidth) + offset) + "px";
}

// the following code is becoming obsolete...
var BITES_PER_SQUARE = 4;

var margin = 96;

var hSquareSize = 0;
var wSquareSize = 0;

var hBiteSize = 0;
var wBiteSize = 0;

var topRow01 = 0;
var topRow02 = 0;
var topRow03 = 0;
var topRow04 = 0;
var topRow05 = 0;
var topRow06 = 0;
var topRow07 = 0;

var leftCol01 = 0;
var leftCol02 = 0;
var leftCol03 = 0;
var leftCol04 = 0;
var leftCol05 = 0;
var leftCol06 = 0;
var leftCol07 = 0;

var testPos = 1;

initScreen();
function getBoxWidth(){
  return getWSquareSize() - (getWSquareSize() * .10);
}

function getWSquareSize(){
  //console.log("s: " + wSquareSize);
  return Math.floor(wSquareSize);
}

function getHSquareSize(){
  //console.log("s: " + hSquareSize);
  return Math.floor(hSquareSize);
}

function getHBiteSize(){
  //console.log("b: " + hBiteSize);
  return Math.floor(hBiteSize);
}

function getPenUltimateColumn(){
  return GRID_SIZE - 2;
}

function getUltimateColumn(){
  return GRID_SIZE - 1;
}

function check(){
  var test = document.getElementById("test");
  test.style.left = getLeftOffset(testPos, 10);
  test.style.top = getTopOffset(testPos, 10);
  testPos++;
}

function getLeft(pos){
    if(pos > GRID_SIZE){
      pos = GRID_SIZE;
    }
    switch(pos){
      case 1: return Math.floor(leftCol01) + "px";
      case 2: return Math.floor(leftCol02) + "px";
      case 3: return Math.floor(leftCol03) + "px";
      case 4: return Math.floor(leftCol04) + "px";
      case 5: return Math.floor(leftCol05) + "px";
      case 6: return Math.floor(leftCol06) + "px";
      case 7: return Math.floor(leftCol07) + "px";
      default: return "0px";
    }
}

function getTop(pos){
    if(pos > GRID_SIZE){
      pos = parseInt(GRID_SIZE);
    }
    switch(pos){
      case 1: return Math.floor(topRow01) + "px";
      case 2: return Math.floor(topRow02) + "px";
      case 3: return Math.floor(topRow03) + "px";
      case 4: return Math.floor(topRow04) + "px";
      case 5: return Math.floor(topRow05) + "px";
      case 6: return Math.floor(topRow06) + "px";
      case 7: return Math.floor(topRow07) + "px";
      default: return "0px";
    }
}

function getBoxTop(slotCounter){
    //console.log("SC: " + slotCounter);
    var row = 1 + Math.floor(slotCounter / 4);
    var bite = slotCounter % 4;
    return getTopOffset(row, bite);
}


//offsets in quarters
function _getTopOffset(pos, offset){
  var os;
  //console.log("pos: " + pos + " offset: " + offset);
  if(offset > BITES_PER_SQUARE) offset = offset % BITES_PER_SQUARE;

  switch(offset){
    case 0: os = 0; break;
    case 1: os = hBiteSize * 1; break;
    case 2: os = hBiteSize * 2; break;
    case 3: os = hBiteSize * 3; break;
    default: os = 0; break;
  }
  //console.log("os: " + os + " pos: " + pos);
  switch(pos){
    case 1: return Math.floor(topRow01 + os) + "px";
    case 2: return Math.floor(topRow02 + os) + "px";
    case 3: return Math.floor(topRow03 + os) + "px";
    case 4: return Math.floor(topRow04 + os) + "px";
    case 5: return Math.floor(topRow05 + os) + "px";
    case 6: return Math.floor(topRow06 + os) + "px";
    case 7: return Math.floor(topRow07 + os) + "px";
    default: return "0px";
  }
}


function getLeftOffset(pos, offset){
  var os;
  if(offset > BITES_PER_SQUARE) offset = offset % BITES_PER_SQUARE;

  //console.log("wBiteSize: " + wBiteSize + "leftCol01(" + leftCol01 + ") leftCol02(" + leftCol02 + ")");
  switch(offset){
    case 0: os = 0; break;
    case 1: os = wBiteSize; break;
    case 2: os = wBiteSize * 2; break;
    case 3: os = wBiteSize * 3; break;
    case 4: os = wBiteSize * 4; break;
    case 5: os = wBiteSize * 5; break;
    case 6: os = wBiteSize * 6; break;
    case 7: os = wBiteSize * 7; break;
    default: os = 0; break;
  }

  switch(pos){
    case 1: return Math.floor(leftCol01 + os) + "px";
    case 2: return Math.floor(leftCol02 + os) + "px";
    case 3: return Math.floor(leftCol03 + os) + "px";
    case 4: return Math.floor(leftCol04 + os) + "px";
    case 5: return Math.floor(leftCol05 + os) + "px";
    case 6: return Math.floor(leftCol06 + os) + "px";
    case 7: return Math.floor(leftCol07 + os) + "px";
    default: return "0px";
  }
}

// for div with 2 rows of text
function getTwoRowHeight(){
  return hBiteSize / 1.6;
}

function getLargeFont(){
  return getHSquareSize() / parseInt(GRID_SIZE);
}

function getSmallFont(){
  //return hBiteSize - 24;
  //return parseInt(getWSquareSize() / 18)
  return parseInt(getHSquareSize() / 11)
  //return hBiteSize / 2;
}

function initScreen(){
  var sWidth = screen.width;
  var sHeight = screen.height;

  GSPlusOne = parseInt(GRID_SIZE) + 1;
  wSquareSize = (sWidth - (2 * margin)) / GSPlusOne;
  hSquareSize = (sHeight -(2 * margin)) / GSPlusOne;

  topRow01 = margin;
  topRow02 = hSquareSize + margin;
  topRow03 = (2 * hSquareSize) + margin;
  topRow04 = (3 * hSquareSize) + margin;
  topRow05 = (4 * hSquareSize) + margin;
  topRow06 = (5 * hSquareSize) + margin;
  topRow07 = (6 * hSquareSize) + margin;

  leftCol01 = margin;
  leftCol02 = wSquareSize + margin;
  leftCol03 = (2 * wSquareSize) + margin;
  leftCol04 = (3 * wSquareSize) + margin;
  leftCol05 = (4 * wSquareSize) + margin;
  leftCol06 = (5 * wSquareSize) + margin;
  leftCol07 = (6 * wSquareSize) + margin;

  wBiteSize = wSquareSize / BITES_PER_SQUARE;
  hBiteSize = hSquareSize / BITES_PER_SQUARE;
}
