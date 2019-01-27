var offset = 0;
var FONT_SIZE = "14";

function resetSideBar(){
		SideBarList = [];
		var max = parseInt(MAX_SLOTS) + 1;
		for(var i=1; i < max; i++){
			var name = "sbar0" + i;
			var e = document.getElementById(name);
		}
}

function ListCounterInc(lCounter){
	if(lCounter >= SideBarList.length - 1){
		return 0;
	}
	return lCounter + 1;
}

function SideBarCounterInc(SBCounter){
	if(SBCounter >= MAX_SLOTS){
		return 1;
	}
	return SBCounter + 1;
}

function getBGround(pl){
	return "sbarpl" + pl;
}

function hideSideBarArray(){
	var slotCounter = 1;

	for (var i=1; i < 17 ; i++){
		var sbar = document.getElementById("sbar0" + i);
		sbar.style.display = "none";
	}
}

function getGridColumn(){
	var col = getPenUltimateColumn();
	if (col < 4) col = 4;
	return col;
}

var listCounter = 0;
var slotCounter = 1;

function renderSideBarArray(){
	MAX_SLOTS = SideBarList.length < MAX_SLOTS ? SideBarList.length : MAX_SLOTS;
	for (var i=0; (i < MAX_SLOTS) && (i < SideBarList.length); i++){
		var sbar = document.getElementById("sbar0" + slotCounter);
		var sect;
		sbar.className = "sbar";
		if( !screenHidden ) sbar.style.display = "inline";
		sbar.style.left = getSideBarLeft() + "px";
		//sbar.style.left = "1199px";
		sbar.style.top = getSideBarTop(slotCounter);
		sbar.className = getBGround(PayLevelList[listCounter]);
		sbar.style.height = getSideBarHeight();
		sbar.style.width = getPanelSideBoxWidth() + "px";
		fs = parseInt(getSideBarFont()) + parseInt(PayLevelList[listCounter]);
		sbar.style.fontSize = fs + "px";
		sbar.innerHTML = SideBarList[listCounter];
		if(RunPhaseView()){
			sbar.setAttribute("onclick", "getPDF(" + YahrzeitListSpotList[listCounter] + ", 1, 'side')" );
		}
		listCounter = ListCounterInc(listCounter);
		slotCounter = SideBarCounterInc(slotCounter);
	}
}

var iTBack = 2;
function turnBack(){
	if(getPDF(0, iTBack++, 'side')) return;
	pdfView = document.getElementById("pdfView");
	pdfImg = document.getElementById("pdfImg");
	pdfImg.src = "";
	pdfImg.style.display = "none";
	pdfView.style.display = "none";
	screenHidden = false;
	addBodyListener();
	iTBack = 2;
}

var placeClick = "";
var pdfIDNumber = 1;

function getPDF(num, pdfNum, place){
	if(pdfNum > 5) return false;
	if(num == 0){
		num = pdfIDNumber;
	} else {
		pdfIDNumber = num;
	}
	placeClick = place;
	var pdfName = eval("YahrList.Yahrzeits[num].PDF0" + pdfNum);
	if(pdfName !== "" && pdfName){
		removeBodyListener();
		hideSecurity();
		hideScreen01();
		hideSideBarArray();
		pdfView = document.getElementById("pdfView");
		pdfImg = document.getElementById("pdfImg");
		//pdfImg.src = "/home/efraiim/code/BeisChayim/img/" + YahrList.Yahrzeits[num].PDF01;
		//pdfImg.src = "./img/" + YahrList.Yahrzeits[num].PDF01;
		pdfImg.src = "./pdf/" + pdfName;
		pdfImg.style.display = "inline";
		pdfView.style.display = "inline";
		return true;
	}
	pdfIDNumber = 1;
	return false;
}

function loadSideBarArray(i){
	var spot = SideBarList.length; //first empty spot
	var outLine;

	outLine = YahrList.Yahrzeits[i].HName + "<br>" +
											fixDate(YahrList.Yahrzeits[i].HDate);

  if(!YahrList.Yahrzeits[i].HName)
		outLine = YahrList.Yahrzeits[i].Name + "<br>" +
											fixDate(YahrList.Yahrzeits[i].HDate);

	for(var j=0; j < spot; j++){
		if(SideBarList[j] == outLine) return;
	}

	PayLevelList[spot] = YahrList.Yahrzeits[i].PayLevel ? YahrList.Yahrzeits[i].PayLevel : 0;
	SideBarList[spot] = outLine;
	YahrzeitListSpotList[spot] = i;
}

function setCurrentMonth(){
	var today = new Date();
	var htoday = G2H(today.getFullYear(), today.getMonth() + 1, today.getDate(), false);
	currentMonth = htoday.month;
}

function loadSideBar(){
	//setCurrentMonth();
	var today = new Date();
	var htoday = G2H(today.getFullYear(), today.getMonth() + 1, today.getDate(), false);
	currentMonth = htoday.month;
	resetSideBar();
	for(var i = 0; i < YahrList.Yahrzeits.length; i++){
		var dateHold = fixDate(YahrList.Yahrzeits[i].HDate);
		if(dateHold.indexOf('Teves') > -1){
			var start = dateHold.indexOf('Teves');
			dateHold = dateHold.substring(0, start+4) + 't' + dateHold.substring(start+6, dateHold.length);
			//console.log(dateHold);
		}
		if(dateHold.indexOf(htoday.month) > -1){
			dateHold = dateHold.trim();
			if(parseInt(dateHold.substring(0, (dateHold.trim()).indexOf(' '))) == parseInt(htoday.day)){
				loadSideBarArray(i);
			}
		}
	}
	renderSideBarArray();
}
