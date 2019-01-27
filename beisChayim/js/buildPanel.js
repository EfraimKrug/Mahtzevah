//buildPanel.js
//TIME_FACTOR = config.settings["time_factor"];
//COLUMN_COUNT = config.settings["column_count"];
//COLUMN_COUNT = 3;
//ROW_COUNT = config.settings["row_count"];

var YahrList = JSON.parse(YahrzeitList);
var panelArray = [];

function fixDate(dt){
  var year = "";
  var d = dt.trim();
  d = d.replace(/\s+/g, "?");
  d = d.replace(/\,+/g, "?");
  d = d.replace(/&comma;/g, "?");
  d = d.replace(/[?]+/g, "?");

  var dArray = d.split('?');
  if(dArray.length > 2){
    dArray[1] = dArray[1].toLowerCase().indexOf('eve') > -1 ? 'Tevet': dArray[1];
    return dArray[0] + " " + dArray[1] + ", " + dArray[2];
  }

  return dArray[0] + " " + dArray[1];
}

function checkToday(checkDate){
	var today = new Date();
	var htoday = G2H(today.getFullYear(), today.getMonth() + 1, today.getDate(), false);
	currentMonth = htoday.month;
	var dateHold = fixDate(checkDate);
		if(dateHold.indexOf(htoday.month) > -1){
			dateHold = dateHold.trim();
			if(parseInt(dateHold.substring(0, (dateHold.trim()).indexOf(' '))) == parseInt(htoday.day)){
				return true;
			}
		}
	return false;
}

function buildPanel01(){
  //console.log("Building panel");
  var outLine;
  var lag = -1;
  var j = 0;
  panelArray = [];
  //
  for(var i=0; i < YahrList.Yahrzeits.length; i++){
      if(j >= COLUMN_COUNT){
        j = 0;
      }
      if(j == 0){
        panelArray.push([]);
      }
      var n = i / COLUMN_COUNT;
      n = Math.floor(n);
      panelArray[n].push({"ID":"","Name":"", "Date":"", "PayLevel":"", "IDX":""});
      //if(n == 64) console.log(YahrList.Yahrzeits[i].ID);
      panelArray[n][j]["ID"] = YahrList.Yahrzeits[i].ID;
      panelArray[n][j]["IDX"] = i;
      panelArray[n][j]["Name"] = YahrList.Yahrzeits[i].HName;
      panelArray[n][j]["Date"] = fixDate(YahrList.Yahrzeits[i].HDate);
      panelArray[n][j]["PayLevel"] = YahrList.Yahrzeits[i].PayLevel;
      if(!YahrList.Yahrzeits[i].HName)
  	     panelArray[n][j]["Name"] = YahrList.Yahrzeits[i].Name;
      j++;
  }
  //console.log(panelArray);
}

function getColID(idx){
  //console.log("n" + idx);
  switch(idx){
    case 0: return "pbarA";
    case 1: return "pbarB";
    case 2: return "pbarC";
    case 3: return "pbarD";
    case 4: return "pbarE";
    case 5: return "pbarF";
    case 6: return "pbarG";
    case 7: return "pbarH";
  }
}

function calcRow(i){
  if(i < 4) return 1;
  if(i < 8) return 2;
  if(i < 12) return 3;
  if(i < 16) return 4;
  return calcRow(i -16);
}

function calcOffset(i){
    return i % 4;
}

function renderingPlaques(callback){
    console.log("In renderingPlaques: " + currentPosition + ":" + panelArray.length);
  	var tf = TIME_FACTOR * 1000;
  	PlaqueInterval = setInterval( function(){ if(currentPosition > panelArray.length){ currentPosition = 0; return 0;}; renderScreen(callback); }, tf);
}

function getEdit(idx){
  currentName = idx;
  currentIDX = idx;
  doEdit();
}

function hideScreen02(){
  var vi = 0;
  for(var x=0; x < 12; x++){
      vi++;
      if(vi < 10) vi = "0" + vi;
      if(vi > 12) vi = "01";
      for(var j=0; j < 8; j++){
        var pbar = document.getElementById(getColID(j) + vi);
        //console.log(getColID(j) + vi);
        pbar.style.display = "none";
      }
    }
}


var renderingPlaquesX = function (cb){
    console.log("renderingPlaquesX");
    var currPos = 0;
    var callback = cb;
    var actions = {
        renderScreen: function (){
            hideScreen02();
            //var tf = TIME_FACTOR * 1000;
            var vi = 0;
            //console.log("up here: " + panelArray.length + ":" + currPos );
            for(var row_count=0; (currPos < panelArray.length && row_count < ROW_COUNT); currPos++, row_count++){
                console.log("rendering: " + currPos);
                vi = parseInt(vi) + 2;
                if(vi < 10) vi = "0" + vi;
                if(vi > 12) vi = "01";
                for(var j=0; j < COLUMN_COUNT; j++){
                  if(!(panelArray[currPos][j])){
                    currPos = 0;
                    console.log("here");
                    setTimeout(callback, 1500);
                    return;
                  }
                  //console.log("rendering");
                  //if(currPos > 375) console.log("currPos: " + currPos + "; col: " + j + "; row_count: " + row_count);
                  var pbar = document.getElementById(getColID(j) + vi);
                  pbar.style.position = "absolute";
                  pbar.style.left = getColumnOffset(j);

                  pbar.style.top = getTopOffset(row_count);
                  pbar.className = getBGround(panelArray[currPos][j]["PayLevel"]);
                  if(RunPhaseEdit()){
                    pbar.setAttribute("onclick", "getEdit(" + panelArray[currPos][j]["IDX"] + ")" );
                  }

                  pbar.style.width = getPanelBoxWidth() + "px";
                  pbar.style.height = getPanelBoxHeight() + "px";
                  pbar.style.font = "normal";

                  pbar.style.fontSize = getPanelFont() + "px";
                  if(panelArray[currPos][j]["Name"].length > 28){
                    pbar.style.fontSize = (getPanelFont() - 2) + "px";
                  }

                  pbar.style.padding = "3px";
                  pbar.style.margin = "0px";
                  pbar.style.display = "inline";
                  pbar.style.zIndex = 5;
                  //console.log(pbar.style.width + ":" + pbar.style.left);
                  var dt = panelArray[currPos][j]["Date"];
                  if(panelArray[currPos][j]["Date"].substring(0,1) == "0"){
                    dt = panelArray[currPos][j]["Date"].substring(1);
                  }
                  pbar.innerHTML = panelArray[currPos][j]["Name"] + "<br>" + dt;
                  if(pbar.innerHTML.indexOf("undefined") > -1){
                    pbar.innerHTML = pbar.innerHTML.substring(0,pbar.innerHTML.indexOf("undefined"));
                    //console.log(currPos + "[" +panelArray[currPos][j]["Name"] + "]");
                  }
                  //alert(pbar.innerHTML.indexOf("undefined"));
                  pbar.style.border = "1px solid black";
                  if(checkToday(dt)){
                    pbar.style.border = "2px solid orange";
                    pbar.style.zIndex = 10;
                    pbar.style.padding = "10px";
                    pbar.style.width = (getPanelBoxWidth() - 16) + "px";
                    pbar.style.height = (getPanelBoxHeight() - 8) + "px";
                    pbar.style.top = (getTopOffsetInt(row_count) - 4) + "px";
                    pbar.style.left = (getColumnOffsetInt(j) - 1) + "px";
                  }
                  tempID = panelArray[currPos][j]["IDX"];
                  if(currPos > panelArray.length ){
                    console.log("ANd Here: " + currPos);
                    currPos = 0;
                    setTimeout(callback, 1500);
                    return;
                  }
                }
              }
            },
          };
          return actions;
        }
