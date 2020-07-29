

var database = 0;
var datalist = 0;
var booklist = [[],[]];
var i = 0;
var table = document.getElementById("table");
var table_line = 0;
var line_check = 0;
var line_title = 0;
var line_writer = 0;
var allnum = 0;
var readnum = 0;
var unreadnum = 0;

var checked_icon = "<i class = \"far fa-check-square\"></i>";
var unchecked_icon = "<i class = \"far fa-square\"></i>";
var delete_icon = "<i class=\"far fa-times-circle fa-xs delete_icon\"></i>"

var check_mode = document.getElementById("check_mode");
var current_mode = 0;
var all = 0;
var check_only = 1;
var uncheck_only = 2;
var sort_mode = '';

function read_data(list){
  i = 0;
  list.once("value").then(function(snapshot) {
    snapshot.forEach(function(childsnapshot){
      booklist[0][i] = childsnapshot.getRef();
      booklist[1][i] = childsnapshot.val();
      i++;
    })
  })
}

function drawtable(list){
  while (table.rows.length > 1){
    table.deleteRow(1);
  }
  i = 0;
  allnum = 0;
  readnum = 0;
  unreadnum = 0;
  list.orderByChild(sort_mode).once("value").then(function(snapshot) {
    snapshot.forEach(function(childsnapshot){
      console.log(allnum, readnum, unreadnum)
      booklist[0][i] = childsnapshot.getRef();
      booklist[1][i] = childsnapshot.val();
      var a = childsnapshot.val();
      table_line = document.createElement("tr");
      line_check = document.createElement("td");
      line_title = document.createElement("td");
      line_writer = document.createElement("td");

      line_check.classList.add("check");
      line_title.classList.add("title");
      line_writer.classList.add("writer");

      line_title.innerText = booklist[1][i].title;
      line_writer.innerText = booklist[1][i].writer;


      if (booklist[1][i].check == "TRUE"){
        line_check.innerHTML = checked_icon;
        readnum++;
      }
      else{
        line_check.innerHTML = unchecked_icon;
        unreadnum++;
      }


      line_title.onclick = function(){
        window.open('https://library.kaist.ac.kr/search/ctlgSearch/posesn/list.do?q='+a.title, 'blank_')
       //  var el = document.createElement('textarea');
       //  var range;
       //  el.value = a.title;
       //  el.setAttribute('readonly', '');
       //  el.style = {position: 'absolute', left: '-9999px'};
       //  document.body.appendChild(el);
       //  el.select();
       //  if (navigator.userAgent.match(/ipad|iphone/i)) {
       //    document.activeElement.blur();
       //    el.blur();
       //    el.contentEditable = false;
       //    el.readOnly = true;
       //    var editable = el.contentEditable;
       //    var readOnly = el.readOnly;
       //
       //    el.contentEditable = true;
       //    el.readOnly = false;
       //    var range = document.createRange();
       //    range.selectNodeContents(el);
       //
       //    var selection = window.getSelection();
       //    selection.removeAllRanges();
       //    selection.addRange(range);
       //    el.setSelectionRange(0, 999999);
       //    el.contentEditable = editable;
       //    el.readOnly = readOnly;
       // } else {
       //     el.select();
       // }
       //  document.execCommand('copy');
       //  document.body.removeChild(el);
       //  var snackbar = document.getElementById("snackbar");
       //  snackbar.className = "show";
       //  setTimeout(function(){ snackbar.className = snackbar.className.replace("show", "");}, 1000)
      }

      table_line.appendChild(line_check);
      table_line.appendChild(line_title);
      table_line.appendChild(line_writer);

      if (current_mode == 0 && booklist[1][i].check == "TRUE") {
        line_check.innerHTML = checked_icon;
        table.appendChild(table_line);
      }
      else if (current_mode == 1 && booklist[1][i].check == "FALSE"){
        line_check.innerHTML = unchecked_icon;
        table.appendChild(table_line);
      }
      i++;
      allnum++;
      document.getElementById("counts").innerText = readnum.toString() + " / " + allnum.toString();
    })
  })
}

$( document ).ready(function(){
  var config = {
    apiKey: "AIzaSyAOu_rFWRCspeQYI18TjNya9rTPefMKHhg",
    authDomain: "project-1-e8674.firebaseapp.com",
    databaseURL: "https://project-1-e8674.firebaseio.com",
    projectId: "project-1-e8674",
    storageBucket: "project-1-e8674.appspot.com",
    messagingSenderId: "694687091638"
  };
  firebase.initializeApp(config);
  database = firebase.database();
  datalist = database.ref('booklist');
  sort_mode = 'key';
  drawtable(datalist);
})

check_mode.onclick = function(){
  current_mode ++;
  current_mode = current_mode % 2;
  if (current_mode == 0){
    check_mode.innerHTML = "<i class = \"far fa-check-square\"></i>"
  }
  else if (current_mode == 1){
    check_mode.innerHTML = "<i class = \"far fa-square\"></i>"
  }
  drawtable(datalist);
}


document.getElementById('by_title').onclick = function(){
  if (sort_mode == 'title'){
    sort_mode = 'key';
  }
  else{
    sort_mode = 'title';
  }
  drawtable(datalist);
}

document.getElementById('by_writer').onclick = function(){
  if (sort_mode == 'writer'){
    sort_mode = 'key';
  }
  else{
    sort_mode = 'writer';
  }
  drawtable(datalist);
}
