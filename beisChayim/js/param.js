function buildParamString(YahrList, currentIDX){
  //console.log(currentIDX);
  //console.log(YahrList.Yahrzeits[currentIDX]);
  //alert(currentIDX);
  var params = "&ID=" + YahrList.Yahrzeits[currentIDX].ID;
  params += "&BGround=" + YahrList.Yahrzeits[currentIDX].BGround;
  params += "&Name=" + YahrList.Yahrzeits[currentIDX].Name;
  params += "&HName=" + YahrList.Yahrzeits[currentIDX].HName;
  params += "&EDate=" + YahrList.Yahrzeits[currentIDX].EDate;
  params += "&HDate=" + YahrList.Yahrzeits[currentIDX].HDate;
  params += "&Pic01=" + YahrList.Yahrzeits[currentIDX].Pic01;
  params += "&Pic02=" + YahrList.Yahrzeits[currentIDX].Pic02;

  params += "&PDF01=" + YahrList.Yahrzeits[currentIDX].PDF01;
  params += "&PDF02=" + YahrList.Yahrzeits[currentIDX].PDF02;
  params += "&PDF03=" + YahrList.Yahrzeits[currentIDX].PDF03;
  params += "&PDF04=" + YahrList.Yahrzeits[currentIDX].PDF04;
  params += "&PDF05=" + YahrList.Yahrzeits[currentIDX].PDF05;

  params += "&MournBy=" + YahrList.Yahrzeits[currentIDX].MournBy;
  params += "&Relationship=" + YahrList.Yahrzeits[currentIDX].Relationship;
  params += "&PayLevel=" + YahrList.Yahrzeits[currentIDX].PayLevel;

  //params += "&FBook=" + YahrList.Yahrzeits[currentName].Pic02;
  params += "&Comments01=" + YahrList.Yahrzeits[currentIDX].Comments01;
  return params;
}
