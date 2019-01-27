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

		var pdfSide = null;
		pdfSide = new pdfPix(YahrzeitListSpotList[listCounter]);

		if(RunPhaseView()){
			var pdfName = eval("YahrList.Yahrzeits[" + YahrzeitListSpotList[listCounter] + "].PDF01");
			//console.log("========>>>>>>>>>>" + pdfName);
			if (pdfName.trim() != ""){
				//console.log("========>>>>>>>>>>" + "adding side bar action");
				BodyListener.setSideFunction(pdfSide.getNextPDF);
				BodyListener.addSideListener("side",sbar);
				//pdfSide.addEvent("side", sbar);
			}
			//sbar.setAttribute("onclick", "getPDF(" + YahrzeitListSpotList[listCounter] + ", 1, 'side')" );
		}
		listCounter = ListCounterInc(listCounter);
		slotCounter = SideBarCounterInc(slotCounter);
	}
}

//var iTBack = 2;
function turnBack(){
	console.log("turning back" + currentIDX);
	pdfP.getFirstPDF(currentIDX);
	// if(getPDF(0, iTBack++, 'side')) return;
	// pdfView = document.getElementById("pdfView");
	// pdfImg = document.getElementById("pdfImg");
	// pdfImg.src = "";
	// pdfImg.style.display = "none";
	// pdfView.style.display = "none";
	// screenHidden = false;
	// addBodyListener();
	// iTBack = 2;
}

//****************************************************
//*	pdfPix is accessed when the element in clicked...
//*
//*		getFirstPDF -returns the first pdf image name
//*		getNextPDF - returns next pdf image name
//*		getPrevPDF - returns previous image name
//*
//* 		Once the name is returned, it must be
//*				loaded into the div.src:
//*			setName - loads the name into the div.src
//*			makeVisible - makes the div visible
//*			makeNotVisible - makes the div hidden
//************************************************

var pdfPix = function(idx){
	var currentIDX = idx;
	//console.log(currentIDX);
	var pdfView = document.getElementById("pdfView");
	var pdfImg = document.getElementById("pdfImg");
	var appBody = document.getElementById("appBody");

	var pdfCurrency = 1;
	var pdfName = "";

	var actions = {
			// getFirstPDF: function(){
			// 	//console.log(YahrList.Yahrzeits[num]);
			// 	//eval("YahrList.Yahrzeits[num].PDF01");
			// 	console.log("firing getFirstPDF: " + currentIDX);
			// 	pdfCurrency = 1;
			// 	actions.setName();
			// 	timeControl.clearTimer();
			// },
			setCurrency: function(val){
				pdfCurrency = val;
			},
			incCurrency: function(){
				if(pdfCurrency < 5) pdfCurrency++;
			},
			decCurrency: function(){
				if(pdfCurrency > 1) pdfCurrency--;
			},
			getNextPDF: function(div){
				//console.log("getNextPDF");
				console.log("getNextPDF:" + div.target.id + "[" + currentIDX + "][" + pdfCurrency + "]");
				if(div.target.id.indexOf("sbar") == 0){
					BodyListener.removeBodyListener("pdf");
				}
				timeControl.clearTimer();
				timeControl.clearSideTimer();
				actions.setName();
				actions.makeVisible();
				if(actions.noPicture()){
					console.log("no pic");
					//timeControl.setTimer();
					timerLoad(currentIDX + 1);
					//timeControl.setSideTimer(loadSideBar);
				}
				actions.incCurrency();
			},
			getPrevPDF: function(){
				this.decCurrency();
				this.makeVisible();
				this.setName();
			},
			makeVisible: function(){
				pdfImg.style.display = "inline";
				pdfView.style.display = "inline";
			},
			makeNotVisible: function(){
				pdfImg.style.display = "none";
				pdfView.style.display = "none";
			},
			isNext: function(){
				var pdfCurrencyNext = pdfCurrency + 1;
				if(pdfCurrencyNext > 5) return false;
				var pdfNameTemp = eval("YahrList.Yahrzeits[" + currentIDX + "].PDF0" + pdfCurrencyNext);
				//console.log("isNext: [" + pdfNameTemp + "]");
				if(pdfNameTemp.trim() == "") return false;
				return true;
			},
			setName: function(){
				if(this.noPicture()){
					console.log("clearing");
					this.clearName();
				} else {
					pdfName = eval("YahrList.Yahrzeits[" + currentIDX + "].PDF0" + pdfCurrency);
					pdfImg.src = "./pdf/" + pdfName;
					this.makeVisible();
					//BodyListener.setFirstFunction(this.getNextPDF);
					//BodyListener.addPDFListener("pdf");
					//console.log(pdfName + "::" + pdfImg.src);
				}
			},
			clearName: function(){
				pdfImg.src = "";
				this.makeNotVisible();
			},
			// addEvent: function(type, div_id){
			// 	//console.log("adding event: " + currentIDX);
			// 	if(type == "pdf"){
			// 			BodyListener.addBodyListener(type);
			// 	//BodyListener.setFirstFunction(junk);
			// 			BodyListener.setFirstFunction(this.getFirstPDF);
			// 		}
			// 	if(type == "side"){
			// 			BodyListener.addSideListener(type, div_id);
			// 		//BodyListener.setSideFunction(this.getFirstPDF);
			// 	}
			// },
			// removeEvent: function(type){
			// 	BodyListener.removeBodyListener(type);
			// 	//appBody.removeEventListener("click",turnBack, true);
			// },
			noPicture: function(){
				if(currentIDX > YahrList.Yahrzeits.length - 1) return true;
				pdfName = eval("YahrList.Yahrzeits[" + currentIDX + "].PDF0" + pdfCurrency);
				//console.log(eval("YahrList.Yahrzeits[" + currentIDX + "].ID"));
				//console.log(pdfName + ":" + pdfCurrency);
				if(pdfName.trim() == ""){
					return true;
				}
				return false;
			}
	};

	return actions;
}

//var pdfPx = new pdfPix();
//pdfPx.getFirstPDF(1);


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
	var pdfName = eval("YahrList.Yahrzeits[num-1].PDF0" + pdfNum);
	//console.log(YahrList.Yahrzeits[num]);
	if(pdfName !== "" && pdfName){
		//removeBodyListener();
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
	//console.log("in loadSideBar");
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

		if(YahrList.Yahrzeits[i].Name.indexOf("(demo)") > 0){
			loadSideBarArray(i);
		} else
		if(dateHold.indexOf(htoday.month) > -1){
			dateHold = dateHold.trim();
			//console.log(dateHold + "::" + htoday.month + "-" + htoday.day);
			if(parseInt(dateHold.substring(0, (dateHold.trim()).indexOf(' '))) == parseInt(htoday.day)){
				loadSideBarArray(i);
			}
		}
	}
	renderSideBarArray();
}
