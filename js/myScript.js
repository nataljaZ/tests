var testsObj =null;
var testsJSON = "";
var currentUser="";

$('#username').keypress(function(e) {
    if(e.which == 13) {
		e.preventDefault();
    	login();
    }
});

$('#password').keypress(function(e) {
    if(e.which == 13) {
		e.preventDefault();
    	login();
    }
});

function setDiv(field){
    var aLeft = $('#'+field+'>a').offset().left;
    $('.new_r_div').css({'left' : aLeft});
}
function predicatBy(prop){
	return function(a,b){
		if( a[prop].toLowerCase() > b[prop].toLowerCase()){
			return 1;
		}else if( a[prop].toLowerCase() < b[prop].toLowerCase() ){
			return -1;
		}
		return 0;
	};

}
function initializePage(){
	getTestsFromServer();
	testsObj=JSON.parse(testsJSON);
	testsObj.tests.sort( predicatBy("teachername") );
	drawTests();
}
function getTestsFromServer(){
	var urlString="cgi-bin/getTests.py";
	jQuery.ajax({
	    url: urlString,
	    success: function(data) {
	    	testsJSON = data;
	    },
	    async:false
	  });
}
function drawTests(){
	var stringForListOfResults="";
	var counter=0;
	var from="",to="";
	if(currentUser==""){
		stringForListOfResults+="<table class='table'><tr><th>Title</th><th>Teacher</th><th>From</th><th>To</th></tr>";
		for(var testIndex in testsObj.tests){
			from=testsObj.tests[testIndex].datefrom;
			to=testsObj.tests[testIndex].dateto;
			if(testsObj.tests[testIndex].status=="active" && dataCheck(from,to)){
				stringForListOfResults+="<tr>"+
				"<td><a href='testpage.html?id="+testsObj.tests[testIndex].id+"' target='_blank'>"+testsObj.tests[testIndex].title+
				"</a></td><td>"+testsObj.tests[testIndex].teachername+"</td>"+
				"<td>"+from+"</td><td>"+to+"</td></tr>";
				counter++;
			}
		}
		
	}else{
		stringForListOfResults+="<table class='table'><tr><th>Title</th><th>From</th><th>To</th><th></th><th></th><th></th><th></th></tr>";
		for(var testIndex in testsObj.tests){
			if(currentUser==testsObj.tests[testIndex].teacher){
				stringForListOfResults+="<tr><td><a href='testpage.html?id="+testsObj.tests[testIndex].id+"' target='_blank'>"+testsObj.tests[testIndex].title+
				"</a></td><td>"+testsObj.tests[testIndex].datefrom+"</td><td>"+testsObj.tests[testIndex].dateto+"</td>"+
				"<td><button type='button' onclick='editTest("+testIndex+")' class='btn btn-primary btn-sm'>Edit</button> </td>"+
				"<td><button type='button' onclick='exportAns("+testsObj.tests[testIndex].id+")' class='btn btn-primary btn-sm'>Export</button> </td>"+
				"<td><a href='cgi-bin/statistics.py?id="+testsObj.tests[testIndex].id+"' target='_blank' class='btn btn-primary btn-sm' role='button'>Statistics</a> </td>"+
				"<td><button type='button' onclick='deleteTest("+testsObj.tests[testIndex].id+")' class='btn btn-primary btn-sm'><span class='glyphicon glyphicon-remove'></span></button></tr>";
				counter++;
			}
		}
		
	}
	
	stringForListOfResults+="</table>";	
	if(counter==0){
		stringForListOfResults="There are no tests yet.";
	}
	$("#listOfResults").html(stringForListOfResults);
}
function dataCheck(dateFrom,dateTo){
	var myDateFrom = new Date();
	var myDateTo = new Date();

	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	today = yyyy+'/'+mm+'/'+dd;
	var now=new Date(today);

	if(dateFrom=="" && dateTo==""){
		return true;
	}
	if(dateFrom=="" && dateTo!=""){
		myDateTo = new Date(convert(dateTo));
		if(now <= myDateTo){
			return true;
		}
	}
	if(dateFrom!="" && dateTo==""){
		myDateFrom = new Date(convert(dateFrom));
		if(now >= myDateFrom){
			return true;
		}
	}
	if(dateFrom!="" && dateTo!=""){
		myDateFrom = new Date(convert(dateFrom));
		myDateTo = new Date(convert(dateTo));
		if(now >= myDateFrom && now <= myDateTo){
			return true;
		}
	}
	
	
	return false;
}
function convert(date){
	var d=date.split("-");
	var day=d[0];
	var month=d[1];
	var year=d[2];
	return year+"/"+month+"/"+day;
}
function addTest(){
	$("#listOfResults").hide();
	$("#addTestBtn").hide();
	$("#form1").show();
	$("#form1").find("input[type=text], textarea").val("");
	$("#inputLanguage").val("estonian");
	$("#inputStatus").val("passive");
	$("#inputAuth").val("yes");
	setDiv('response');
}
function editTest(testId){
	//alert(testId);
	
	var obj = testsObj;
	$("#listOfResults").hide();
	$("#addTestBtn").hide();
	$("#form2").show();
	$("#editInputId").val(obj.tests[testId].id);
	$("#editInputTitle").val(obj.tests[testId].title);
	$("#editInputDescription").val(obj.tests[testId].description);
	$("#editInputQuestions").val(obj.tests[testId].question);
	$("#editInputFrom").val(obj.tests[testId].datefrom);
	var from=obj.tests[testId].datefrom;
	$('.datepicker').data({date: from}).datepicker('update').children("input").val(from);	
	$("#editInputTo").val(obj.tests[testId].dateto);
	var to=obj.tests[testId].dateto;
	$('.datepicker').data({date: to}).datepicker('update').children("input").val(to);
	$("#editInputStatus").val(obj.tests[testId].status);
	$("#editInputLanguage").val(obj.tests[testId].language);
	$("#editInputAuth").val(obj.tests[testId].auth);
	setDiv('response2');
}
function deleteTest(testId){
	var r=confirm("Are you sure that you want to delete this test?");
	if(r==true){
	//alert(testId);
		var urlString="cgi-bin/deleteTest.py?id="+testId+"";
		jQuery.ajax({
			url: urlString,
			success: function() {
				initializePage();
			},
			async:false
		  });
	}
}
function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}

function showTest(){
	var testId = getURLParameter('id');

//alert(testId);
	//window.location.assign("/~t103931/cgi-bin/vtest.py?id="+testId+"")
	//getTestsFromServer();
	//testsObj=JSON.parse(testsJSON);
	var stringForTitle="";
	var stringForDescription="";
	var stringForDate="";
	var n=0;
	var stringForQuestions="";
	//var questions='[["perviy",["1","2"]],["vtoroy",["3","4"]]]';
	for(var testIndex in testsObj.tests){
		if(testId==testsObj.tests[testIndex].id){
			language=testsObj.tests[testIndex].language;
			datefrom=testsObj.tests[testIndex].datefrom;
			dateto=testsObj.tests[testIndex].dateto;
			stringForTitle+=""+testsObj.tests[testIndex].title+"";
			stringForDescription+=""+testsObj.tests[testIndex].description+"";
			if(datefrom!="" && dateto!="" && language=="english"){
				stringForDate+="This test is available from "+datefrom+" to "+dateto;
			}
			if(datefrom!="" && dateto!="" && language=="estonian"){
				stringForDate+="Seda kontrolltood saab teha "+datefrom+" kuni "+dateto;
			}
			questions=testsObj.tests[testIndex].question;
			q=questions.split('\n');
			
			//quest=questions.substr(questions.indexOf('\n'));
			var start=false;
			var array=new Array();
			var ar=new Array();
			var ar2=new Array();
			for (i = 0; i < q.length; ++i) {
				str=q[i];
				fc=str.charAt(0);
				/*if(fc!=" " && fc!="*" && start==false){
					//stringForQuestions+=str+"<br>";
					ar.push(str);
				}
				if(fc!=" " && fc!="*" && start==true){
					//stringForQuestions+="</select><p>";
					ar.push(ar2);
					array.push(ar);
					ar=[];
					ar2=[];
					//n++;
					start=false;
					//stringForQuestions+=str+"<br>";
					ar.push(str);
				}
				if(fc==" " && start==true){
					//stringForQuestions+="<option>"+str+"</option>";
					ar2.push(str);
				}
				if(fc==" " && start==false){
					start=true;
					//stringForQuestions+="<select name='a"+n+"'>";
					//stringForQuestions+="<option>"+str+"</option>";
					ar2.push(str);
				}
				
				if(fc=="*"){
					//stringForQuestions+="<input type='text' name='a"+n+"'><br>";
					//n++;
					ar2.push('');
				}*/
				
				if(fc==" " ){
					ar2.push(str);
				}
				if(fc=="*"){
					ar2.push("");
				}
				if(fc!=" " && fc!="*"){
					if(i==0){
						ar.push(str);
					}else{
						ar.push(ar2);
						array.push(ar);
						ar=[];
						ar2=[];
						ar.push(str);
					}
				}
			}
			ar.push(ar2);
			array.push(ar);
			/*for (i = 0; i < q.length; ++i) {
				str=q[i];
				if(str.charAt(0)!=" " && i==0){
					stringForQuestions+=str+"<br><select name='a"+n+"'>";
				}				
				if(str.charAt(0)!=" " && i!=0){
					stringForQuestions+="</select><p>"+str+"<br><select name='a"+n+"'>";
				}else{
					stringForQuestions+="<option>"+str+"</option>";
				}
			}*/
			
			
			//if(questions!=""){
				//var array = JSON.parse(questions);
				var n=0;
				//alert(array.length);
				
				//proba=JSON.stringify(questions);
				//proba2=JSON.parse(proba);
				//proba3=JSON.parse(proba2);
				
				for (i = 0; i < array.length; ++i) {
					//stringForQuestions+=array[i][0]+"<br><select name='a"+n+"'>";
					if(i==0 && (array[i][0]=="" || array[i][0]==" ")){
						break;
					}
					stringForQuestions+=array[i][0]+"<br>";
					//for (j = 0; j < array[i].length; ++j) {
						
						//alert(array[j][1]);
					//}
					ans=array[i][1];
					if(ans==''){
						stringForQuestions+="<textarea name='a"+n+"'></textarea><br>";
						n++;
					}else{
						array2=shuffle(ans);
						stringForQuestions+="<select name='a"+n+"'>";
						for(j=0; j < array2.length; j++){
							stringForQuestions+="<option>"+array2[j]+"</option>";
						}
						stringForQuestions+="</select><p>";
						n++;
					}
					
				}
			//}
		}
	}
	if(language=="english"){
		$("#inputStCodeField > label").text("Your student code");
		$("#inputFnameField > label").text("Your first name");
		$("#inputLnameField > label").text("Your last name");
		$("#inputEmailField > label").text("Your e-mail");
		$("#legendName").text("Questions");
		$("#pForSave").text("After saving answers cannot be changed!");
		$("#btnSave").val("Save");
	}
	$("#titleOfTest").html(stringForTitle);
	$("#descriptionOfTest").html(stringForDescription);
	$("#dateOfTest").html(stringForDate);
	$("#questionsOfTest").html(stringForQuestions);
	$('input[name="test_id"]').val(testId);
}
function shuffle(array) {
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
function login(){
	var username=$("#username").val();
	var password=$("#password").val();
	var dataString = 'username='+username+'&password='+ password;
		
		
	$.ajax({  
		type: "POST",  
		url: "cgi-bin/checkUser.py",  
		data: dataString, 
		async: false,
		success: function(data) {  
			var result=JSON.parse(data);
			if(result.value=="false"){
				$("#error").show();
			}else{
				currentUser=result.value;
				if(result.value=="passive"){
					afterLoginActions(username,'passive');
				}else{
					afterLoginActions(username,'active');
				}
				
			}
		}  
	});  
}
function afterLoginActions(username,status){
	$("#spanForUsername").html(username+' | ');
	$("#logoutLink").css('display','inline');
	$("#myLogin").hide();
	$("#form4").hide();
	$("#listOfResults").show();
	$("#addTestBtn").show();
	drawTests();
	if(status=="active"){
		$("#addTestBtn").removeAttr('disabled');
	}
	if(status=="passive"){
		$("#addTestBtn").attr('disabled','disabled');		
		$("#alertW").show();
	}
}

function logout(){
	currentUser="";
	$("#spanForUsername").html('');
	$("#logoutLink").css('display','none');
	$("#myLogin").show();
	$("#alertW").hide();
	window.location.reload();
}
function submitAddTest(){
	/*var title = $('#inputTitle').val(); 
	var description = $('#inputDescription').val();
	var from = $('#inputFrom').val();
	var to = $('#inputTo').val();
	var status = $('#inputStatus').val();
	var questions = $('#inputQuestions').val();
	var dataString = 'title='+ title+'&description='+description+'&from='+from+'&to='+to+
	'&status='+status+'&questions='+String(questions)+'&teacher='+currentUser;*/
	//alert(JSON.stringify(questions));
	var data = $('#form1').serialize();
	//$.post('url', data);
	data=data+'&teacher='+currentUser;
	$.ajax({  
		  type: "POST",  
		  url: "cgi-bin/testsave.py",  
		  data: data, 
		  async: false,
		  success: function() {  
			//alert("save");
			initializePage();
			$("#form1").hide();
			$("#addTestBtn").show();
			$("#listOfResults").show();
			$("#alert").show();
			window.setTimeout(function() { $("#alert").hide(); }, 3000);
		  }  
	});
}
function submitEditTest(){
	/*var id = $('#editInputId').val();
	var title = $('#editInputTitle').val();  
	var description = $('#editInputDescription').val();
	var from = $('#editInputFrom').val();
	var to = $('#editInputTo').val();
	var status = $('#editInputStatus').val();
	var questions = $('#editInputQuestions').val();
	
	var dataString = 'id='+ id+'&title='+ title+'&description='+description+'&from='+from+'&to='+to+
	'&status='+status+'&questions='+questions+'&teacher='+currentUser;*/
	var data = $('#form2').serialize();
	//$.post('url', data);
	data=data+'&teacher='+currentUser;
	$.ajax({  
		  type: "POST",  
		  url: "cgi-bin/testedit.py",  
		  data: data, 
		  async: false,
		  success: function() {  
			//alert("edit");
			initializePage();
			$("#form2").hide();
			$("#addTestBtn").show();
			$("#listOfResults").show();
			$("#alert").show();
			window.setTimeout(function() { $("#alert").hide(); }, 2000);
		  }  
	});  
}
function exportAns(testId){
	/*var urlString="cgi-bin/exportTest.py?id="+testId+"";
	jQuery.ajax({
		url: urlString,
		success: function() {
			alert("export");
		},
		async:false
	  });*/
	  window.location = "cgi-bin/exportTest.py?id="+testId;
}
function back(){
	$("#listOfResults").show();
	$("#addTestBtn").show();
	$("#form1").hide();
	$("#form2").hide();
}
function closeSignUp(){
	$("#listOfResults").show();
	$("#form4").hide();
}
function signup(){
	$("#listOfResults").hide();
	$("#form4").show();
}
function submitSignUp(){
	if(validateSignUp()){
		var data = $('#form4').serialize();
		$.ajax({  
			  type: "POST",  
			  url: "cgi-bin/signup.py",  
			  data: data, 
			  async: false,
			  success: function() {
				currentUser=$('#inputEmail').val();
				afterLoginActions(currentUser,'passive');
				
			  }  
		});  
	}
	
}
function validateSignUp(){
	setInputStatus('inputFirstnField');
	setInputStatus('inputLastnField');
	setInputStatus('inputEmailField');
	setInputStatus('inputPasswordField');
	if($("#inputFirstnField").attr("class") == "form-group has-error"){
		$("#inputFirstnField> input").focus();
		return false;
	}
	if($("#inputLastnField").attr("class") == "form-group has-error"){
		$("#inputLastnField> input").focus();
		return false;
	}
	if($("#inputEmailField").attr("class") == "form-group has-error"){
		$("#inputEmailField> input").focus();
		return false;
	}
	if($("#inputPasswordField").attr("class") == "form-group has-error"){
		$("#inputPasswordField> input").focus();
		return false;
	}
	return true;
}
function setInputStatus(field){
	var input = $("#"+field+"> input").val();
	if(input.length==0){
		$("#"+field).attr("class","form-group has-error");
		$("#"+field+"> span").text("This is a required field!");
		//$("#"+field+"> input").focus();
	}else{
		$("#"+field).attr("class","form-group");
		$("#"+field+"> span").text("");
	}
}
function submitAnsSave(){
	var loginStatus=$('#inputLoginMethod').val();
	if((auth=="yes" && loginStatus!="") || (auth=="no" && loginStatus=="")) {
		if(validateAnsSave()){
			$("#form3").submit();	
		}
	}
	if(auth=="yes" && loginStatus==""){
		alert("You must login via facebook or google!");
		window.scrollTo(0,0);
	}
}
function validateAnsSave(){
	/*$("#form3 input[type=text]").each(function() {
		var input=this.value;
		if(input.length==0){
			$(this).css("border","1px solid #b94a48");
			$(this).focus();
		}else{
			$(this).css("border","1px solid #ccc");
		}
    });*/
	setInputStatus('inputStCodeField');
	setInputStatus('inputFnameField');
	setInputStatus('inputLnameField');
	setInputStatus('inputEmailField');
	/*if($("#inputStCodeField").attr("class") == "form-group has-error" ||
	$("#inputFnameField").attr("class") == "form-group has-error" ||
	$("#inputLnameField").attr("class") == "form-group has-error" ||
	$("#inputEmailField").attr("class") == "form-group has-error"){
		return false;
	}else{
		return true;
	}*/
	if($("#inputStCodeField").attr("class") == "form-group has-error"){
		$("#inputStCodeField> input").focus();
		return false;
	}
	if($("#inputFnameField").attr("class") == "form-group has-error"){
		$("#inputFnameField> input").focus();
		return false;
	}
	if($("#inputLnameField").attr("class") == "form-group has-error"){
		$("#inputLnameField> input").focus();
		return false;
	}
	if($("#inputEmailField").attr("class") == "form-group has-error"){
		$("#inputEmailField> input").focus();
		return false;
	}
	return true;
}


// FB login

function loginFB(person){
	FB.api('/me', function(response) {
		var id=response.id;
		var firstn=response.first_name;
		var lastn=response.last_name;
		var email=response.email;
		var name=response.name
		if(person==1){
			var dataString = 'id='+id+'&firstn='+ firstn+'&lastn='+ lastn+'&email='+email;
			//alert(dataString);
			$.ajax({  
				type: "POST",  
				url: "cgi-bin/checkUserFB.py",  
				data: dataString, 
				async: false,
				success: function(data) {  
					var result=JSON.parse(data);
					if(result.value=="false"){
						$("#error").show();
					}else{
						currentUser=result.value;
						if(result.value=="passive"){
							afterLoginActions(response.name,'passive');	
							$("#logoutLink").attr('onclick','logoutFB()');
						}else{
							afterLoginActions(response.name,'active');	
							$("#logoutLink").attr('onclick','logoutFB()');						
						}
						
					}
				}  
			});
		}
		
		if(person==2){
			gapi.auth.signOut();
			$('#loginText').text("Signed in via facebook");
			//$('#facebookbtn').hide();
			//$('#googlebtn').show();
			
			$('#inputFname').val(firstn);
			$('#inputLname').val(lastn);
			$('#inputEmail').val(email);
			
			$('#inputLoginId').val(id);
			$('#inputLoginName').val(name);
			$('#inputLoginEmail').val(email);
			$('#inputLoginMethod').val("facebook");
		}
	});
}
function logoutFB(){
	FB.logout(function(){
		logout();
	});
}



//Google login


function loginGoogle(person){
	var gid="",gfname="",glname="",gemail="",gname="";
	gapi.client.load('plus','v1', function(){
		var request = gapi.client.plus.people.get({
		   'userId': 'me'
		});
		request.execute(function(resp) {
			gname=resp.displayName;
			gfname=resp.name.givenName;
			glname=resp.name.familyName;
			gid=resp.id;
			gapi.client.load('oauth2', 'v2', function() {
				var request = gapi.client.oauth2.userinfo.get();
				request.execute(function(resp2) {
					gemail=resp2['email'];
					if(person==1){
						var dataString = 'id='+gid+'&firstn='+ gfname+'&lastn='+ glname+'&email='+gemail;
						//alert(dataString);
						$.ajax({  
							type: "POST",  
							url: "cgi-bin/checkUserGoogle.py",  
							data: dataString, 
							async: false,
							success: function(data) {  
								var result=JSON.parse(data);
								if(result.value=="false"){
									$("#error").show();
								}else{
									currentUser=result.value;
									if(result.value=="passive"){
										afterLoginActions(gemail,'passive');	
										$("#logoutLink").attr('onclick','logoutGoogle()');
									}else{
										afterLoginActions(gemail,'active');	
										$("#logoutLink").attr('onclick','logoutGoogle()');						
									}
									
								}
							}  
						});
					}
					if(person==2){
						FB.getLoginStatus(function(response) {
							if (response.status === 'connected') {
								FB.logout();
							}
						});						
						$('#loginText').text("Signed in via google");
						//$('#googlebtn').hide();
						//$('#facebookbtn').show();
						
						$('#inputFname').val(gfname);
						$('#inputLname').val(glname);
						$('#inputEmail').val(gemail);
						
						$('#inputLoginId').val(gid);
						$('#inputLoginName').val(gname);
						$('#inputLoginEmail').val(gemail);
						$('#inputLoginMethod').val("google");
					}
				});
			});
		});
	});	
}
function logoutGoogle(){
	gapi.auth.signOut();
	logout();
}
var auth="";
function checkLogin(){
	var testId = getURLParameter('id');
	getTestsFromServer();
	testsObj=JSON.parse(testsJSON);
	for(var testIndex in testsObj.tests){
		if(testId==testsObj.tests[testIndex].id){
			if(testsObj.tests[testIndex].auth=="yes"){
				auth="yes";
				$('#loginText').show();
				$('#facebookbtn').show();
				$('#googlebtn').show();
				return true;
			}else{
				auth="no";
				return false;
			}
		}
	}
	return false;
}