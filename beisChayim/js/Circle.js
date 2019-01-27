/*
 * ========== going though the list ====================
 */
var YahrList = JSON.parse(YahrzeitList);
var SideBarList = [];
var PayLevelList = [];
var YahrzeitListSpotList = [];
var currentName = 0;
var TESTING_OFF = false;

function correctHFontSize(val){
		return val;
}

function getNextTop(t){
	if(t >= BITES_PER_SQUARE - 1) return 0;
	return t + 1;
}

var screenHidden = false;

function positionElts(){
		var t = BITES_PER_SQUARE;
		var s = 2;
		var name = document.getElementById("Name");
		name.style.top = getTopName1();
		name.style.left = getLeftOffsetName();
		name.style.width = getOneByWidth();
		name.style.fontSize = getName1Font();

		var dpic01  = document.getElementById("DPic01");
		dpic01.style.top = getTopPic1();
		dpic01.style.left = getLeftPic1();

		var pic01  = document.getElementById("Pic01");
		pic01.style.left = "0px";

		t = getNextTop(t);
		if(t == 0) s++;

		var hname = document.getElementById("HName");
		hname.style.top = getTopName2();
		hname.style.left = getLeftOffsetName();
		hname.style.width = getOneByWidth();
		hname.style.fontSize = getName2Font();

		t += 1;
		if(t > BITES_PER_SQUARE){
			s++;
			t = 0;
		}

		var hdate = document.getElementById("HDate");
		hdate.style.top = getTopDate1();
		hdate.style.left = getLeftOffsetName();
		hdate.style.width = getOneByWidth();
		hdate.style.fontSize = getName1Font();

		t += 1;
		if(t > BITES_PER_SQUARE){
			s++;
			t = 0;
		}

		var edate = document.getElementById("EDate");
		edate.style.top = getTopDate2();
		edate.style.left = getLeftOffsetName();
		edate.style.width = getOneByWidth();
		edate.style.fontSize = getName2Font();

		t = getNextTop(t);
		if(t == 0) s++;

		var dpic02  = document.getElementById("DPic02");
		dpic02.style.top = getTopPic2();
		dpic02.style.left = getLeftPic2();

		var pic02  = document.getElementById("Pic02");
		pic02.style.left = getLeftPic2();
		var Comment01  = document.getElementById("Comments01");
		Comment01.style.top = getTopComment01();
		Comment01.style.left = getLeftComment01();

		if(!screenHidden){
			name.style.display = "inline";
			hname.style.display = "inline";
			hdate.style.display = "inline";
			edate.style.display = "inline";
			pic01.style.display = "inline";
			pic02.style.display = "inline";
		}
}

function hideScreen01(){
			screenHidden = true;
			var name = document.getElementById("Name");
			name.style.display = "none";
			var hname = document.getElementById("HName");
			hname.style.display = "none";
			var hdate = document.getElementById("HDate");
			hdate.style.display = "none";
			var edate = document.getElementById("EDate");
			edate.style.display = "none";
			var pic01  = document.getElementById("Pic01");
			pic01.style.display = "none";
			var pic02  = document.getElementById("Pic02");
			pic02.style.display = "none";
			var Comments01  = document.getElementById("Comments01");
			Comments01.style.display = "none";
}

var timeControl = (function(){
	var tf = TIME_FACTOR * 1000;
	OneByInterval = 0;
	SideInterval = 0;
	var actions = {
		setTimer: function(func){
				//console.log("setting timer");
				OneByInterval = setInterval(func, tf);
		},
		setSideTimer: function(func){
				//alert("Setting Side Timer");
				console.log("setting side timer");
				SideInterval = setInterval(func, tf);
		},
		clearTimer: function(){
				//console.log("clearing timer");
				clearInterval(OneByInterval);
		},
		clearSideTimer: function(){
				console.log("clearing side timer");
				clearInterval(SideInterval);
		}
	};
	return actions;
})();

function setupTimerLoad(){
	buildPanel01();
	setCurrentMonth();
	timerLoad();
}

function timerLoad(lastNum){
	//console.log("timerLoad: " + lastNum);
	var lastN = -1;
	var renderAll = new renderBoth();
	var rendPlaques = new renderingPlaquesX(renderAll.endingCycle);
 	if(lastNum) lastN = lastNum;
	//console.log("timerLoad2: " + lastN);
	if(DISPLAY_SETTING == 0) timeControl.setTimer(function(){ renderAll.loadingPlaques(rendPlaques);});
	timeControl.setSideTimer(loadSideBar);
	if(DISPLAY_SETTING == 1) timeControl.setTimer(function(){ lastN = renderAll.loadingOneBy(lastN);});
	if(DISPLAY_SETTING == 2) timeControl.setTimer(function(){ renderAll.loadAlternate();});

	//	OneByInterval = setInterval( function(){ renderAll.loadingPlaques(rendPlaques);}, tf);
	//if(DISPLAY_SETTING == 1)
	//	OneByInterval = setInterval( function(){ renderAll.loadingOneBy();}, tf);
	//if(DISPLAY_SETTING == 2)
	//	OneByInterval = setInterval( function(){ renderAll.loadAlternate();}, tf);
}

function sideTimerLoad(lastNum){
	//console.log("timerLoad: " + lastNum);
	var lastN = -1;
	var renderAll = new renderBoth();
	var rendPlaques = new renderingPlaquesX(renderAll.endingCycle);
 	if(lastNum) lastN = lastNum;
	//console.log("timerLoad2: " + lastN);
	timeControl.setTimer(function(){ renderAll.loadingPlaques(rendPlaques);});
}

var renderBoth = function(){
	var i = -1;
	var pRun = 1;
	var actions = {
		loadAlternate: function(){
			if(this.isOneBy()){
				hideScreen02();
				this.loadingOneBy(i);
			} else {
				hideScreen01();
				this.loadingPlaques();
			}
		},
		loadAlternateEvery: function(){
			if(this.isOneBy()){
				hideScreen02();
				this.loadingOneBy(i);
				this.setProcessPlaque();
			} else {
				hideScreen01();
				this.loadingPlaques();
				this.setProcessOneBy();
			}
		},
		loadingOneBy: function(lastNum){
			//console.log("loadingOneBy: " + lastNum);
			i = lastNum ? lastNum : i;
			i = getNum(i);
			loadElement(i, this.endingCycle);
			return i;
		},
		endingCycle: function(){
			i = -1;
			if(DISPLAY_SETTING == 2){
				if(pRun == 2) pRun = 1;
				else pRun = 2;
			}
		},
		loadingPlaques: function(rendP){
			rendP.renderScreen();
		},
		setProcessOneBy: function(){
			pRun = 1;
		},
		setProcessPlaque: function(){
			pRun = 2;
		},
		isOneBy: function(){
			return pRun == 1;
		},
		isPlaque: function(){
			return pRun == 2;
		},

	};
	return actions;
}


function getNum(i){
	var last = YahrList.Yahrzeits.length - 1;
	i++;
	if(i > last){
		i = 0;
		resetSideBar();
	}
	var dateHold = YahrList.Yahrzeits[i].HDate;
	if(TESTING_OFF)
		while(dateHold.indexOf(currentMonth) < 0 && i < last){
			i++;
			dateHold = YahrList.Yahrzeits[i].HDate;
			if(dateHold.indexOf('Teves') > -1){
				var start = dateHold.indexOf('Teves');
				dateHold = dateHold.substring(0, start+4) + 't' + dateHold.substring(start+6, dateHold.length);
				//console.log(dateHold);
			}
		}
	else {
		dateHold = YahrList.Yahrzeits[i].HDate;
		if(dateHold.indexOf('Teves') > -1){
			var start = dateHold.indexOf('Teves');
			dateHold = dateHold.substring(0, start+4) + 't' + dateHold.substring(start+6, dateHold.length);
		}
	}

	if(i > last) i = -1;
	return i;
}

var lastI = -1;
function loadElement(i, callback){
	if(i < lastI){
		setTimeout(callback, 1500);
		lastI = -1;
		return;
	} else {
		lastI = i;
	}
	//turnBack();
	positionElts();
	var bd = document.getElementById("body");
	var cName = "";
	if(!YahrList.Yahrzeits[i].PayLevel){
		cName = "bg0";
	} else {
		cName = "bg" + YahrList.Yahrzeits[i].PayLevel;
	}
	bd.className = cName;

	var HDate = document.getElementById("HDate");
	if(YahrList.Yahrzeits[i].HDate){
		HDate.innerHTML = YahrList.Yahrzeits[i].HDate;
		if(HDate.innerHTML.substring(0,1) == '0'){
			 HDate.innerHTML = YahrList.Yahrzeits[i].HDate.substring(1);
		}
		HDate.innerHTML = fixDate(HDate.innerHTML);
		HDate.className = "hdate" + YahrList.Yahrzeits[i].PayLevel;
	}

	var Name = document.getElementById("Name");
	Name.innerHTML = YahrList.Yahrzeits[i].Name;
	Name.className = "Name" + YahrList.Yahrzeits[i].PayLevel;

	var HName = document.getElementById("HName");
	HName.innerHTML = YahrList.Yahrzeits[i].HName;
	if(Name.innerHTML.trim().toLowerCase() == HName.innerHTML.trim().toLowerCase()){
		HName.innerHTML = "";
	}
	HName.className = "HName" + YahrList.Yahrzeits[i].PayLevel;

	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var EDate = document.getElementById("EDate");
	var dt = new Date(YahrList.Yahrzeits[i].EDate);

	var d = dt.getDate() ? dt.getDate() : "";
	var y = dt.getFullYear() ? dt.getFullYear() : "";
	var m = dt.getMonth() ? dt.getMonth() : "";

	EDate.innerHTML = (d && m) ? months[m] + " " + d : "";
	EDate.innerHTML = (m && y) ? months[m] + " " + y : "";
	EDate.innerHTML = (d && y) ? d + " " + y : "";

	EDate.innerHTML = (d && m && y) ? months[m] + " " + d + ", " + y : "";
	EDate.className = "edate" + YahrList.Yahrzeits[i].PayLevel;

	var Pic01  = document.getElementById("Pic01");
	var Pic02  = document.getElementById("Pic02");

	Pic01.src = "";
	Pic02.src = "";
	Pic01.style.visibility = "hidden";
	Pic02.style.visibility = "hidden";

	if((YahrList.Yahrzeits[i].PayLevel > 1) && YahrList.Yahrzeits[i].Pic01){
		Pic01.style.visibility = "visible";
		Pic01.src = "./img/" + YahrList.Yahrzeits[i].Pic01;
	}

	if(YahrList.Yahrzeits[i].PayLevel > 2 && YahrList.Yahrzeits[i].Pic02){
		Pic02.style.visibility = "visible";
		Pic02.src = "./img/" + YahrList.Yahrzeits[i].Pic02;
	}

	var pdfP = null;
	pdfP = new pdfPix(i);
	if(YahrList.Yahrzeits[i].PDF01.trim() != ""){
		//console.log("adding event to: " + YahrList.Yahrzeits[i].Name);
		//pdfP.addEvent("pdf");
		BodyListener.setFirstFunction(pdfP.getNextPDF);
		BodyListener.addBodyListener("pdf");
	}
	else {
		BodyListener.removeBodyListener("pdf");
		//console.log("else");
		//pdfP.removeEvent("pdf");
	}

	var Comments01 = document.getElementById("Comments01");
	Comments01.innerHTML = YahrList.Yahrzeits[i].Comments01;
	Comments01.style.display = 'none';
	if(YahrList.Yahrzeits[i].Pic01.trim() != ""){
		Comments01.style.display = 'inline';
	}
	Comments01.className = "Comments01" + YahrList.Yahrzeits[i].PayLevel;
	if(YahrList.Yahrzeits[i].Comments01.length > 411){
		if(YahrList.Yahrzeits[i].Pic02.trim() == ""){
			Comments01.style.top = getBelowDate2();
		}
		if(YahrList.Yahrzeits[i].Pic01.trim() != ""){
			Comments01.style.left = getLeftOffsetName();
		}
	}

	currentIDX = i;
	//setTimeout(loadSideBar, (TIME_FACTOR  * 1000) / 2);
	//timeControl.setSideTimer(loadSideBar);
}
