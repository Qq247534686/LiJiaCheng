jQuery.fn.extend({
    validateForm: function () {
        $.validator.setDefaults({
            debug: true,
            //submitHandler: function () {
               
            //}
        });
        var validateResult = $(this).validate({
            errorElement: "em",
            errorPlacement: function (error, element) {
                error.addClass("hide");
                result = false;
                // Add `has-feedback` class to the parent div.form-group
                // in order to add icons to inputs
                element.parent().addClass("has-feedback");

                if (element.prop("type") === "checkbox") {
                    error.insertAfter(element.parent("label"));
                } else {
                    error.insertAfter(element);
                }
                if (!element.next("span")[0]) {
                    $("<span data-toggle='tooltip' class='glyphicon glyphicon-exclamation-sign form-control-feedback' title='" + error[0].innerText + "'></span>").insertAfter(element);
                    $('[data-toggle="tooltip"]').tooltip();
                }
            },
            success: function (label, element) {
                // Add the span element, if doesn't exists, and apply the icon classes to it.
                if (!$(element).next("span")[0]) {
                    $("<span class='glyphicon glyphicon-ok form-control-feedback'></span>").insertAfter($(element));
                }
            },
            highlight: function (element, errorClass, validClass) {
                $(element).parent().addClass("has-error").removeClass("has-success");
                $(element).next("span").addClass("glyphicon-exclamation-sign").removeClass("glyphicon-ok");
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).parent().addClass("has-success").removeClass("has-error");
                $(element).next("span").addClass("glyphicon-ok").removeClass("glyphicon-exclamation-sign");
            }
        });
        $(this).submit();
        return validateResult.form();



    },
});