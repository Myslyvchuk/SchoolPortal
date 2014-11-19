$(document).ready(function() {

	var root_action = $("#root_action").val();
	
	$.validator.addMethod("regexName", function(value, element) {
		return /^[a-zA-Z]+$/.test(value);
	}, "Only letters are allowed!");

	$.validator.addMethod("uniqueEmail", function(value, element) {
		var result = false;
		$.ajax({
			type : "GET",
			url : root_action+"email/check",
			data : "email=" + value,
			dataType : 'json',
			contentType : 'application/json',
			mimeType : 'application/json',
			async : false,
			success : function(response) {
				if (response == 0) {
					result = false;
				} else {
					result = true;
				}

			},
			error : function(e) {
				alert('Internal server erroriiii');
			}
		});
		return result;
	}, "Email is Already Taken!");

	$('#signup_from').validate({
		rules : {
			firstName : {
				required : true,
				minlength : 2,
				maxlength : 15,
				regexName : true
			},
			lastName : {
				required : true,
				minlength : 2,
				maxlength : 15,
				regexName : true
			},
			email : {
				required : true,
				email : true,
				uniqueEmail : true
			},
			password : {
				required : true,
				minlength : 8,
				maxlength : 15
			},
			password2 : {
				required : true,
				minlength : 8,
				maxlength : 15
			},
			questionAnsver : {
				required : true,
				minlength : 4,
				maxlength : 15
			},

		},
		messages : {
			firstname : {
				required : "Please enter first name!",
			},
			lastname : {
				required : "Please enter last name!",
			},
			email : {
				required : "Please enter email!",
				email : "This is not a valid email!",
			},
			password : {
				required : "Please enter password!",
				minlength : "Too weak password!",
				maxlength : "Too long password!",
			},
			password2 : {
				required : "Please enter password!",
				minlength : "Too weak password!",
				maxlength : "Too long password!",
			},
			questionAnsver : {
				required : "Please enter ansver!",
				minlength : "Too weak ansver!",
				maxlength : "Too long ansver!",
			},
		},
		success : function(element) {
			element.addClass('valid');
		}
	});

	$("#signup_button").click(function() {
		if ($("#signup_from").valid()) {
			var firstname = $("#firstname").val();
			var lastname = $("#lastname").val();
			var email = $("#email").val();
			var password = $("#createapassword").val();
			var sex = $("input:radio[name=sex]:checked").val();
			var role = $("input:radio[name=role]:checked").val();
			var questionNumber = $("#questionNumber").val();
			var questionAnsver = $("#questionAnsver").val();

			var json = {
					"id" : 0,
					"registrationCode" : 0,
					"question" : questionNumber,
					"answer" : questionAnsver,
					"user" : {
						"id" : 0,
						"email" : email,
						"password" : password,
						"firstName" : firstname,
						"lastName" : lastname,
						"registration" : 0,
						"confirmed" : false,
						"roles" : [ {
							"id" : role,
							"name" : ""
						} ]
					}
				}
			
			$.ajax({
				url : root_action+'registration',
				type : "POST",
				data : JSON.stringify(json),
				beforeSend : function(xhr) {
					xhr.setRequestHeader("Accept", "application/json");
					xhr.setRequestHeader("Content-Type", "application/json");
				},
				success : function(responce) {
					if (responce.valueOf() == 1) {
						$("#signUpSuccesButton").click();
					} else {
						$("#signUpFailureButton").click();
					}
				},
				error : function() {
					alert('Internal server erroreeeeee');
				}
			});

		}
	});

});