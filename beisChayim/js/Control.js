// Control.js
var currentMonth = "Elul";
var backgroundTrack = 0;
var showButtonSec = false;
var showButton = false;
var autoProcess = true;

//console.log(config);

// ========== selecting the month ======================
var autoTimeStamp = new Date();

function saveAutoTime(){
			autoTimeStamp = new Date();
}

function autoSecClose(){
	if(!autoProcess) return;
	var autoTimeStampComp = new Date();
	var advancedTimeStamp = new Date(autoTimeStamp.getTime() + (60 * 1000));
	//console.log(autoTimeStampComp + " <? " + advancedTimeStamp);
	if (autoTimeStampComp < advancedTimeStamp){
		setTimeout(autoSecClose, 10000);
		return;
	}

	var security = document.getElementById("security");
	security.style.display = 'none';
	var ks = document.getElementById("keyShow");
	ks.style.display = 'none';
	showButtonSec = true;
	addBodyListener();
	hideIt();
}

function hideSecurity(){
	var security = document.getElementById("security");
	security.style.display = 'none';
	var ks = document.getElementById("keyShow");
	ks.style.display = 'none';
	showButtonSec = true;
	initKeys();
}

function checkClick(){
	if(placeClick == 'side'){
		placeClick = '';
		return false;
	}
	getPDF(currentIDX, 1, 'main');
	//alert(YahrList.Yahrzeits[currentIDX].HName.trim() == "" ? YahrList.Yahrzeits[currentIDX].Name : YahrList.Yahrzeits[currentIDX].HName);
	return true;
}
function showSecurity(){
	if(SCREEN_UP) return;
	if (RunPhaseView()){
		setTimeout(checkClick, 10);
		return;
	}

	var security = document.getElementById("security");
	//alert(security.style.zIndex);
	if(showButtonSec && showButton){
		security.style.display = 'inline';
		showButtonSec = false;
		initKeys();
		//passkey = '';
		//pkLetterCount = 0;
		removeBodyListener();
		setTimeout(autoSecClose, 10000);
	} else {
		initKeys();
		hideSecurity()
	}
	hideIt();
}

function showIt(){
	//var month = document.getElementById("monthSelect");
	if(RunPhaseView()) return;
	var action = document.getElementById("actionSelect");
	action.value = "";
	action.style.display = 'inline';
	//month.style.display = 'inline';

	showButton = false;
	hideSecurity();
}

function hideIt(){
	//var month = document.getElementById("monthSelect");
	var action = document.getElementById("actionSelect");

	action.style.display = 'none';
	//month.style.display = 'none';
	showButton = true;
}

function doit(){
	//var month = document.getElementById("monthSelect");
	//currentMonth = month.value;
	hideIt();
	//alert(month.value);
}

/////////////////////////////////////////////////////////////////////////
// adding and removing listeners - to clean up for touch screen...
/////////////////////////////////////////////////////////////////////////
function addBodyListener(){
	if(RunPhaseView()){
		pdfView = document.getElementById("pdfView");
		pdfView.addEventListener("click",turnBack, true);
		bd = document.getElementById("appBody");
		appBody.addEventListener("click",checkClick,true);
		return;
	}
	
	bd = document.getElementById("appBody");
	appBody.addEventListener("click",showSecurity,true);
}

function removeBodyListener(){
	if(RunPhaseView()){
		pdfView = document.getElementById("pdfView");
		pdfView.removeEventListener("click",turnBack,true);
		appBody.removeEventListener("click",checkClick,true);
		return;
	}

	bd = document.getElementById("appBody");
	appBody.removeEventListener("click",showSecurity,true);
}
