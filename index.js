var sum =0
var mydata = 0
$(document).ready(function () {
  var arr = ["Number" ,	"First Name",	"Last Name",	"Value", "	Day"]
  $.ajax({
            url: "https://vpn-marketing66.herokuapp.com/interview-test",
            type: 'GET',
            dataType: 'json',
            
            contentType: 'application/json; charset=utf-8',
            success: function (result) {
              mydata = result 
              tableCreate()

               
            },
            error: function (error) {
                console.log(error);
            }
  });
      
     
  $("#Get").click(function() {
    $('#text1').text("sum of values: " + "" + sum +"")
    post()
  });  

});

 

function tableCreate() {
  $table = "<table id = 'resultTable'><tr><td>Number</td><td>First Name</td><td>Last Name</td><td>Value</td><td>Day</td></tr>";
  for (var i = 0; i < mydata.data.length; i++) {
    $table += "<tr>";
    var it = mydata.data[i];
    $table += "<td>" + i + "</td>";
    $table += "<td>" + it.first_name.split('-')[1] + "</td>";
    $table += "<td>" + it.last_name.split('-')[0] + "</td>";
    $table += "<td>" + it.value + "</td>";
    sum += it.value
    var new_date = mydata.data[i].date.split('T')[0].split('-')
    $table += "<td>" + new_date[2]+ '/' + new_date[1] + '/' + new_date[0] + "</td>";
    $table += "</tr>";
  }
  $table += "</table>";
  $('body').append($table);

  
}
function post(){
  fetch('https://vpn-marketing66.herokuapp.com/interview-test-result', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: new URLSearchParams({
      'session_number': ''+mydata.session_number+'',
      'result': ''+sum+''
    })
  }).then(function(response) {
    return response.text();
  }).then(function(data) {
    $('#text2').text("response text: " + "" + data +"")
  })
  .catch(error => {
      console.log(error)
  });
  
  
}
