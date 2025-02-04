"use strict";
jQuery(document).ready(function($) {
    $("#submit_btn").on("click", function() {

        var proceed = true;
        //simple validation at client's end
        //loop through each field and we simply change border color to red for invalid fields		
        $("#contact_form input[required], #contact_form textarea[required]").each(function() {
            $(this).css('background-color', '');
            if (!$.trim($(this).val())) { //if this field is empty 
                $(this).css('background-color', '#ffbbbb'); //change border color to   
                proceed = false; //set do not proceed flag
            }
            //check invalid email
            var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            if ($(this).attr("type") === "email" && !email_reg.test($.trim($(this).val()))) {
                $(this).css('background-color', '#ffbbbb'); //change border color to  
                proceed = false; //set do not proceed flag				
            }
        });

        if (proceed) //everything looks good! proceed...
        {
            var to = 'babusunnah@gmail.com';
            //get input field values data to be sent to server
            var post_data = {
                'name': $('input[name=name]').val(),
                'email': $('input[name=email]').val(),
				'subject': $('input[name=subject]').val(),
                'message': $('textarea[name=message]').val(),
                'to': to
            };

            //Ajax post data to server
            $.post('https://aheadfitness.ng/send_mail.php', post_data, function(response) {
                if (response.type === 'error') { //load json data from server and output message     
                    var output = '<div class="error">' + response.text + '</div>';
                } else {
                    var output = '<div class="success">' + response.text + '</div>';
                    //reset values in all input fields
                    $("#contact_form input, #contact_form textarea").val('');

                }
				$('html, body').animate({scrollTop: $("#contact_form").offset().top-100}, 2000);
			
                $("#contact_results").hide().html(output).slideDown();
            }, 'json');
        }
    });

    //reset previously set border colors and hide all message on .keyup()
    $("#contact_form  input[required=true], #contact_form textarea[required=true]").keyup(function() {
        $(this).css('background-color', '');
        $("#result").slideUp();
    });
});