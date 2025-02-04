"use strict";
jQuery(document).ready(function ($) {
    $("#submit_btn").on("click", function () {

        var proceed = true;
        //simple validation at client's end
        //loop through each field and we simply change border color to red for invalid fields		
        $("#contact_form input[required], #contact_form textarea[required]").each(function () {
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
            //get input field values data to be sent to server
            var post_data = {
                'service_id': 'service_3unba6r',
                'template_id': 'template_6wb5t17',
                'user_id': 'KTFPoPei_qQRQjSdY',
                'template_params': {
                    'subject': $('input[name=subject]').val(),
                    'from_name': $('input[name=name]').val(),
                    'from_email': $('input[name=email]').val(),
                    'message': $('textarea[name=message]').val(),
                    'reply_to': $('input[name=email]').val(),
                    'to_email': 'info@beckwin.org',
                }
            };

            $.ajax({
                url: 'https://api.emailjs.com/api/v1.0/email/send',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(post_data), // Convert object to JSON string
                success: function () {
                    var output = '<div class="alert alert-success">Email sent successfully!</div>';
                    $("#contact_form input, #contact_form textarea").val('');
                    $('html, body').animate({ scrollTop: $("#contact_form").offset().top - 100 }, 2000);
                    $("#contact_results").hide().html(output).slideDown();
                },
                error: function (xhr) {
                    let errorMessage = "An error occurred while sending the request.";

                    if (xhr.status === 400) {
                        errorMessage = xhr.responseText || "Bad Request: Missing required parameters.";
                    }

                    var output = '<div class="alert alert-danger">' + errorMessage + '</div>';
                    $("#contact_results").hide().html(output).slideDown();
                }
            });
        }
    });

    //reset previously set border colors and hide all message on .keyup()
    $("#contact_form  input[required=true], #contact_form textarea[required=true]").keyup(function () {
        $(this).css('background-color', '');
        $("#result").slideUp();
    });
});