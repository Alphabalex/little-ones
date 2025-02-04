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
            var to = 'babusunnah@gmail.com';
            //get input field values data to be sent to server
            var post_data = {
                'service_id' :  'service_3unba6r',
                'template_id' : 'template_6wb5t17',
                'user_id' : 'KTFPoPei_qQRQjSdY',
                'template_params': {
                    'subject': $('input[name=subject]').val(),
                    'from_name': $('input[name=name]').val(),
                    'message': $('textarea[name=message]').val(),
                    'reply_to': $('input[name=email]').val()
                }
                // 'name': $('input[name=name]').val(),
                // 'email': $('input[name=email]').val(),
                // 'subject': $('input[name=subject]').val(),
                // 'message': $('textarea[name=message]').val(),
                // 'to': to
            };

            //Ajax post data to server
            // $.post('https://api.emailjs.com/api/v1.0/email/send', post_data, function (response) {
            //     if (!response.success) { //load json data from server and output message     
            //         var output = '<div class="alert alert-danger">' + response.message + '</div>';
            //     } else {
            //         var output = '<div class="alert alert-success">' + response.message + '</div>';
            //         //reset values in all input fields
            //         $("#contact_form input, #contact_form textarea").val('');

            //     }
            //     $('html, body').animate({ scrollTop: $("#contact_form").offset().top - 100 }, 2000);

            //     $("#contact_results").hide().html(output).slideDown();
            // }, 'json').fail(function () {
            //     $("#contact_results").hide().html('<div class="alert alert-danger">An error occurred while sending the request.</div>').slideDown();
            // });

            $.ajax({
                url: 'https://api.emailjs.com/api/v1.0/email/send',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(post_data), // Convert object to JSON string
                success: function (response) {
                    var output;
                    if (!response.success) {
                        output = '<div class="alert alert-danger">' + response.message + '</div>';
                    } else {
                        output = '<div class="alert alert-success">Email sent successfully!</div>';
                        $("#contact_form input, #contact_form textarea").val('');
                    }
                    $('html, body').animate({ scrollTop: $("#contact_form").offset().top - 100 }, 2000);
                    $("#contact_results").hide().html(output).slideDown();
                },
                error: function () {
                    $("#contact_results").hide().html('<div class="alert alert-danger">An error occurred while sending the request.</div>').slideDown();
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