

var fileName01 = "";
var fileName02 = "";
var newPDFFilename01 = "";
var newPDFFilename02 = "";
var newPDFFilename03 = "";
var newPDFFilename04 = "";
var newPDFFilename05 = "";

var lastNewID = 0;

//localStorage.removeItem("lastNewID");

function keepFileName(picNum){
	//alert("AB" + document.getElementById("editFilename1").value);
	if(picNum == 1){
  	var f = document.getElementById("editFilename1");
		//fileName01 = document.getElementById("editFilename1").value;
		fileName01 = f.value.substring(f.value.lastIndexOf('\\') + 1);
	}

	if(picNum == 2){
  	var f = document.getElementById("editFilename2");
		fileName02 = f.value.substring(f.value.lastIndexOf('\\') + 1);
	}

	//
	// newPanel
	if(picNum == 8){
  	var f = document.getElementById("newFilename1");
		fileName01 = f.value.substring(f.value.lastIndexOf('\\') + 1);
	}

	if(picNum == 9){
  	var f = document.getElementById("newFilename2");
		fileName02 = f.value.substring(f.value.lastIndexOf('\\') + 1);
	}

	if(picNum == 10){
  	var f = document.getElementById("newPDFFilename01");
		newPDFFilename01 = f.value.substring(f.value.lastIndexOf('\\') + 1);
	}

	if(picNum == 11){
  	var f = document.getElementById("newPDFFilename02");
		newPDFFilename02 = f.value.substring(f.value.lastIndexOf('\\') + 1);
	}

	if(picNum == 12){
  	var f = document.getElementById("newPDFFilename03");
		newPDFFilename03 = f.value.substring(f.value.lastIndexOf('\\') + 1);
	}

	if(picNum == 13){
  	var f = document.getElementById("newPDFFilename04");
		newPDFFilename04 = f.value.substring(f.value.lastIndexOf('\\') + 1);
	}

	if(picNum == 14){
  	var f = document.getElementById("newPDFFilename05");
		newPDFFilename05 = f.value.substring(f.value.lastIndexOf('\\') + 1);
	}

}

function createNewID(){
	var idList = [];
	for(var i=0; i < YahrList.Yahrzeits.length; i++){
			if(YahrList.Yahrzeits[i].ID < 99999){
				idList.push(YahrList.Yahrzeits[i].ID);
			}
	}

	lastNewID = localStorage.getItem("lastNewID") || 90000;
	//if(localStorage.getItem("lastNewID")){
	//	lastNewID = localStorage.getItem("lastNewID");
	//} else {
	//	lastNewID = 90000;
	localStorage.setItem("lastNewID",lastNewID);
	//}

	idList.push(lastNewID);
	idList.sort();

	if(idList.length == 0){
		localStorage.setItem("lastNewID",90001);
		return "0090001";
	} else {
		var h = Number(idList[idList.length - 1]) + 1;
		localStorage.setItem("lastNewID", h);
		return (Number(idList[idList.length - 1]) + 1);
	}
}


function addStuff(ID, edit, callback){
	var id = "\"ID\":\"" + ID + "\"";
	if(!edit){
		ID = createNewID();
		id = "\"ID\":\"00" + ID + "\"";
	}

	if(edit){
		var name = "\"Name\":\"" + escapeHTML(document.getElementById("editName").value) + "\"";
		//var bground = "\"BGround\":\"" + escapeHTML(document.getElementById("bground").value) + "\"";
		var hname = "\"HName\":\"" + escapeHTML(document.getElementById("editHName").value) + "\"";
		var edate = "\"EDate\":\"" + escapeHTML(document.getElementById("editEDate").value) + "\"";
		var hdate = "\"HDate\":\"" + escapeHTML(document.getElementById("editHDate").value) + "\"";
		var pic01 = "\"Pic01\":\"" + escapeHTML(document.getElementById("editPic01").innerHTML) + "\"";
		var pic02 = "\"Pic02\":\"" + escapeHTML(document.getElementById("editPic02").innerHTML) + "\"";
		var pdf01 = "\"PDF01\":\"" + escapeHTML(document.getElementById("editPDF01").innerHTML) + "\"";
		var pdf02 = "\"PDF02\":\"" + escapeHTML(document.getElementById("editPDF02").innerHTML) + "\"";
		var pdf03 = "\"PDF03\":\"" + escapeHTML(document.getElementById("editPDF03").innerHTML) + "\"";
		var pdf04 = "\"PDF04\":\"" + escapeHTML(document.getElementById("editPDF04").innerHTML) + "\"";
		var pdf05 = "\"PDF05\":\"" + escapeHTML(document.getElementById("editPDF05").innerHTML) + "\"";

		//console.log("pic01: " + pic01);
		if(fileName01.trim() !== ""){
			pic01 = "\"Pic01\":\"" + escapeHTML(fileName01) + "\"";
		}
		//console.log("And" + pic01);
		if(fileName02.trim() !== ""){
			var pic02 = "\"Pic02\":\"" + escapeHTML(fileName02) + "\"";
		}

		if(newPDFFilename01.trim() !== ""){
			pdf01 = "\"PDF01\":\"" + escapeHTML(newPDFFilename01) + "\"";
		}
		if(newPDFFilename02.trim() !== ""){
			pdf02 = "\"PDF02\":\"" + escapeHTML(newPDFFilename02) + "\"";
		}
		if(newPDFFilename03.trim() !== ""){
			pdf03 = "\"PDF03\":\"" + escapeHTML(newPDFFilename03) + "\"";
		}
		if(newPDFFilename04.trim() !== ""){
			pdf04 = "\"PDF04\":\"" + escapeHTML(newPDFFilename04) + "\"";
		}
		if(newPDFFilename05.trim() !== ""){
			pdf05 = "\"PDF05\":\"" + escapeHTML(newPDFFilename05) + "\"";
		}

		var mournby = "\"MournBy\":\"" + escapeHTML(document.getElementById("editMournby").value) + "\"";
		var relationship = "\"Relationship\":\"" + escapeHTML(document.getElementById("editRelationship").value) + "\"";
		var pl = document.getElementById("editPaylevel").value;
		if(pl == ""){
			pl = "0";
		}
		var paylevel = "\"PayLevel\":\"" + pl + "\"";
		//var fbook = "\"FBook\":\"\"";
		var comments01 = "\"Comments01\":\"" + escapeHTML(document.getElementById("editComments01").value) + "\"";

  } else {
		var name = "\"Name\":\"" + escapeHTML(document.getElementById("newName").value) + "\"";
		//var bground = "\"BGround\":\"" + escapeHTML(document.getElementById("bground").value) + "\"";
		var hname = "\"HName\":\"" + escapeHTML(document.getElementById("newHName").value) + "\"";
		var edate = "\"EDate\":\"" + escapeHTML(document.getElementById("newEDate").value) + "\"";
		var hdate = "\"HDate\":\"" + escapeHTML(document.getElementById("newHDate").value) + "\"";
		var pic01 = "\"Pic01\":\"" + escapeHTML(document.getElementById("newPic01").innerHTML) + "\"";
		var pic02 = "\"Pic02\":\"" + escapeHTML(document.getElementById("newPic02").innerHTML) + "\"";
		var pdf01 = "\"PDF01\":\"" + escapeHTML(document.getElementById("newPDF01").innerHTML) + "\"";
		var pdf02 = "\"PDF02\":\"" + escapeHTML(document.getElementById("newPDF02").innerHTML) + "\"";
		var pdf03 = "\"PDF03\":\"" + escapeHTML(document.getElementById("newPDF03").innerHTML) + "\"";
		var pdf04 = "\"PDF04\":\"" + escapeHTML(document.getElementById("newPDF04").innerHTML) + "\"";
		var pdf05 = "\"PDF05\":\"" + escapeHTML(document.getElementById("newPDF05").innerHTML) + "\"";

		if(fileName01.trim() !== ""){
			pic01 = "\"Pic01\":\"" + escapeHTML(fileName01) + "\"";
		}
		if(fileName02.trim() !== ""){
			pic02 = "\"Pic02\":\"" + escapeHTML(fileName02) + "\"";
		}
		if(newPDFFilename01.trim() !== ""){
			pdf01 = "\"PDF01\":\"" + escapeHTML(newPDFFilename01) + "\"";
		}
		if(newPDFFilename02.trim() !== ""){
			pdf02 = "\"PDF02\":\"" + escapeHTML(newPDFFilename02) + "\"";
		}
		if(newPDFFilename03.trim() !== ""){
			pdf03 = "\"PDF03\":\"" + escapeHTML(newPDFFilename03) + "\"";
		}
		if(newPDFFilename04.trim() !== ""){
			pdf04 = "\"PDF04\":\"" + escapeHTML(newPDFFilename04) + "\"";
		}
		if(newPDFFilename05.trim() !== ""){
			pdf05 = "\"PDF05\":\"" + escapeHTML(newPDFFilename05) + "\"";
		}


		var mournby = "\"MournBy\":\"" + escapeHTML(document.getElementById("newMournby").value) + "\"";
		var relationship = "\"Relationship\":\"" + escapeHTML(document.getElementById("newRelationship").value) + "\"";
		var pl = document.getElementById("newPaylevel").value;
		if(pl == ""){
			pl = "0";
		}
		var paylevel = "\"PayLevel\":\"" + pl + "\"";
		//var fbook = "\"FBook\":\"\"";
		var comments01 = "\"Comments01\":\"" + escapeHTML(document.getElementById("newComments01").value) + "\"";
}
	var line = "'{" + id + "," + name + ","  +
	hname + "," + edate + "," + hdate + "," + mournby + "," + relationship + "," + paylevel + "," +
	pic01 + "," + pic02 + ","  + pdf01 + ","  + pdf02 + ","  + pdf03 + ","  + pdf04 + ","  +
	pdf05 + "," + comments01 + "},' + " ;
	//console.log("LINE: " + line);
	if(!edit){
		download(line, escapeHTML("$$BC$$New00" + ID), "text/plain");
	} else {
		download(line, escapeHTML("$$BC$$" + ID), "text/plain");
	}
	callback();
}
// Function to download data to a file
function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
	  else { // Other
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

function escapeHTML(usafe) {
  return usafe.replace(/[&<"',>\n\r]/g, function(m) {
    switch (m) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case ',':
        return '&comma;';
      case '"':
        return '&quot;';
			case '\n':
				return '&#013;';
			case '\r':
				return '&#010;';
      default:
        return '&#039;';
    }
  });
};
