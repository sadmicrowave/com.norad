$("#contactForm").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError($(this), $("#msgSubmit"));
        submitMSG($("msgSubmit"), false, "Did you fill in the form properly?");
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm();
    }
});


$("#subscribeForm").validator().on("submit", function(event) {
	if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError($(this), $("#msgSubscribeSubmit"));
        //submitMSG($("#msgSubscribeSubmit"), false, "Did you enter your email?");
    } else {
        // everything looks good!
        event.preventDefault();
        submitSubscribeForm();
    }
});

$("#registerForm").validator().on("submit", function(event) {
	if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError($(this), $("#msgRegisterSubmit"));
        //submitMSG($("#msgSubscribeSubmit"), false, "Did you enter your email?");
    } else {
        // everything looks good!
        event.preventDefault();
        submitRegisterForm();
    }
});

$("#loginForm").validator().on("submit", function(event) {
	if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError($(this), $("#msgLoginSubmit"));
        //submitMSG($("#msgSubscribeSubmit"), false, "Did you enter your email?");
    } else {
        // everything looks good!
        event.preventDefault();
        submitLoginForm();
    }
});


function submitSubscribeForm(){
	var $this = $(this)
		,$msgdiv = $("#msgSubscribeSubmit")
		,$form = $("#subscribeForm")
		;
	$.ajax({'url':'http://localhost:2222/subscribe?email=' + $('#subscribe-email-input').val()
		,'method': 'POST' 
		,'success': function(data){
			 $form[0].reset();
			 submitMSG($msgdiv, true, "Successfully Subscribed!")
		}
		,'error': function(data){
			$("#subscribe-status").removeClass('hidden').text('An error occurred while attempting to subscribe!');
			formError($form, $msgdiv);
            submitMSG($msgdiv, false, text);
		}
	});

}

function submitRegisterForm(){
	var $this = $(this)
		,$msgdiv = $("#msgRegisterSubmit")
		,$form = $("#registerForm")
		;
	$.ajax({'url':'http://localhost:2222/users'
		,'method': 'POST' 
		,'data': $form.serialize()
		,'success': function(data){
						try {
							if ( data && data['body'] && data['body']['error'] )
								throw Error(data['body']['error']);
							
							$form[0].reset();
							submitMSG($msgdiv, true, "Check your email to verify account setup")
						} catch (err) {
							formError($form, $msgdiv);
							submitMSG($msgdiv, false, err);
						}
						
					}
		,'error'  : function(xhr, ajaxOptions, thrownError){
						formError($form, $msgdiv);
						submitMSG($msgdiv, false, thrownError);
					}
	});
}


function submitForm(){
    // Initiate Variables With Form Content
    /*var name = $("#name").val();
    var email = $("#email").val();
    var msg_subject = $("#msg_subject").val();
    var message = $("#message").val();
    


    $.ajax({
        type: "POST",
        url: "php/form-process.php",
        data: "name=" + name + "&email=" + email + "&msg_subject=" + msg_subject + "&message=" + message,
        success : function(text){
            if (text == "success"){
                formSuccess();
            } else {
                formError($("#contactForm"), $);
                submitMSG($("$msgSubmit"), false, text);
            }
        }
    });
    */
    
    var $form = $('#contactForm')
    	,$msgdiv = $('#msgSubmit')
    	;
    	    
    $.ajax({
			'url': 'http://localhost:2222/contact'
			,'method': 'POST'
			,'dataType': 'json'
			,'data': $form.serialize()
			,'success': function(data){
							console.log( data );
							try {
								if ( data && data['body'] && data['body']['error'] )
									throw Error(data['body']['error']);
								
								$form[0].reset();
								submitMSG($msgdiv, true, "Message Sent!")
							} catch (err) {
								formError($form, $msgdiv);
								submitMSG($msgdiv, false, err);
							}
							
						}
			,'error'  : function(xhr, ajaxOptions, thrownError){
							console.log( xhr, ajaxOptions, thrownError );
							formError($form, $msgdiv);
							submitMSG($msgdiv, false, thrownError);
						}
			
		});
    
}

function formSuccess(){
    $("#contactForm")[0].reset();
    submitMSG($("#msgSubmit"), true, "Message Submitted!")
}

function formError($form, $msgdiv){
    //$("#contactForm")
    $msgdiv.removeClass().addClass('hidden');
    $form.removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass();
    });
}

function submitMSG($div, valid, msg){
    if(valid){
        var msgClasses = "h4 text-center fadeInUp animated text-success";
    } else {
        var msgClasses = "h4 text-center text-danger";
    }
    //$("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
    $div.removeClass().addClass(msgClasses).text(msg).delay(5000).fadeOut('slow');
}