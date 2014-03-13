/*
validate_form
jQuery plugin to validate forms in a simple way
(c) Alexis Esposito 2014 (@alexisesposito)
*/

(function($) {
    $.fn.validateForm = function() {
        var inputs_error = new Array();
        var form = $(this);
        form.children('input[type=text]').each(function(e){
            var field = new Array();
            field.field = $(this);
            field.errors = new Array();
            var val = $(this).val();
            var data_validation_maxlength = $(this).attr('data-validation-maxlength');
            var data_validation_minlength = $(this).attr('data-validation-minlength');
            var data_validation_required = $(this).attr('data-validation-required');
            var data_validation_mail = $(this).attr('data-validation-mail');
            var data_validation_onlynumbers = $(this).attr('data-validation-onlynumbers');
            var data_validation_different = $(this).attr('data-validation-different');
            var data_validation_onlycharacters = $(this).attr('data-validation-onlycharacters');
            var data_validation_url = $(this).attr('data-validation-url');
            
            if (data_validation_maxlength != undefined)
            {
                var length = parseInt(data_validation_maxlength);
                if (val.length > length)
                {
                    field.errors.push('maxlength');
                }
            }

            if (data_validation_minlength != undefined)
            {
                var length = parseInt(data_validation_minlength);
                if (val.length < length)
                {
                    field.errors.push('minlength');
                }
            }

            if (data_validation_required != undefined && data_validation_required == 'true')
            {
                if ($.trim(val) == '')
                {
                    field.errors.push('required');
                }
            }

            if (data_validation_mail != undefined && data_validation_mail == 'true')
            {
                var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if ($.trim(val) == '' || !regex.test(val))
                {
                    field.errors.push('mail');
                }
            }

            if (data_validation_onlynumbers != undefined && data_validation_onlynumbers == 'true')
            {
                var regex = /^\d+$/;
                if (!regex.test(val))
                {
                    field.errors.push('onlynumbers');
                }
            }

            if (data_validation_different != undefined && $.trim(data_validation_different) != '')
            {
                var data_validation_different_casesensitive = $(this).attr('data-validation-different-casesensitive');
                var check_caseSensitive = false;
                var caseSensitive = false;
                if (data_validation_different_casesensitive != undefined)
                {
                    check_caseSensitive = true;
                    if (data_validation_different_casesensitive == 'true')
                    {
                        caseSensitive = true;
                    }
                }
                var list = data_validation_different.split(",");
                for (var i = 0; i < list.length; i++) {
                    if (check_caseSensitive)
                    {
                        if (caseSensitive)
                        {
                            if (val.toUpperCase() == list[i].toUpperCase())
                            {
                                field.errors.push('different');
                            }
                        }
                        else
                        {
                            if (val == list[i])
                            {
                                field.errors.push('different');
                            }
                        }
                    }
                    else
                    {
                        if (val == list[i])
                        {
                            field.errors.push('different');
                        }
                    }
                }
            }

            if (data_validation_onlycharacters != undefined && data_validation_onlycharacters == 'true')
            {
                var regex = /^([^0-9]*)$/;
                if (!regex.test(val))
                {
                    field.errors.push('onlycharacters');
                }
            }

            if (data_validation_url != undefined && data_validation_url == 'true')
            {
                if (!val.indexOf("http") != -1)
                {
                    val = 'http://' + val;
                }
                var regex = /^(https?|ftp):\/\/((((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])(\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])(\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/(((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|\[|\]|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#(((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
                if (!regex.test(val))
                {
                    field.errors.push('url');
                }
            }

            if (field.errors.length > 0)
            {
                inputs_error.push(field);
            }

        });

        var oReturn = new Array();
        oReturn.success = (inputs_error.length > 0) ? false : true;
        oReturn.inputs_error = inputs_error;

        return oReturn;

    }
}(jQuery));