$(function() {
    var dialog, form,
        name = $("#name"),
        surname = $("#surname"),
        city = $("#city"),
        zipcode = $("#zipcode"),
        birth = $("#birth"),
        allFields = $([]).add(name).add(surname).add(city).add(zipcode).add(birth),
        tips = $(".validateTips");
 
    function updateTips(t) {
        tips
            .text(t)
            .addClass("ui-state-highlight");
        setTimeout(function() {
            tips.removeClass("ui-state-highlight", 1500);
        }, 500);
    }
 
    function checkLength(o, n, min, max) {
        if (o.val().length > max || o.val().length < min) {
            o.addClass("ui-state-error");
            updateTips("Length of " + n + " must be between " +
                min + " and " + max + ".");
            return false;
        } else {
            return true;
        }
    }
 
    function checkRegexp(o, regexp, n) {
        if ( !(regexp.test(o.val())) ) {
            o.addClass("ui-state-error");
            updateTips(n);
            return false;
        } else {
            return true;
        }
    }
 
    function addUser() {
        var valid = true;
        allFields.removeClass("ui-state-error");
        valid = valid && checkLength(name, "Name", 3, 40);
        valid = valid && checkLength(surname, "Surname", 3, 40);
        valid = valid && checkLength(city, "City", 3, 40);
        valid = valid && checkLength(zipcode, "Zip code", 6, 6);
 
        valid = valid && checkRegexp(name, /^[A-ZĄĘŁŃÓŚŹŻ]([a-ząęćśłńóźż])*$/i, "Name may consist of a-z, spaces and must begin with a letter.");
        valid = valid && checkRegexp(surname, /^[A-ZĄĘŁŃÓŚŹŻ]([a-ząęćśłńóźż])*$/i, "Surname may consist of a-z, spaces and must begin with a letter.");
        valid = valid && checkRegexp(zipcode, /^[0-9]{2}-[0-9]{3}/i, "The zip code must be in the format xx-xxx and consist of numbers and a dash." );
        valid = valid && checkRegexp(birth, /^[0-9]{2}-[0-9]{2}-[1-2]{1}[0-9]{1}[0-9]{1}[0-9]{1}/i, "Date of birth must be in the form DD-MM-YYYY.");
        if (valid) {
            $("#users tbody").append("<tr>" +
                "<td>" + name.val() + "</td>" +
                "<td>" + surname.val() + "</td>" +
                "<td>" + city.val() + "</td>" +
                "<td>" + zipcode.val() + "</td>" +
                "<td>" + birth.val() + "</td>" +
                "<td>" + "<button type='button'  class='removebutton' title='Remove'>Remove</button>" + "</td>" +
                "</tr>");
            $(this).dialog("close");
        }
        return valid;
    }
 
    dialog = $("#dialog-form").dialog({
        autoOpen: false,
        height: 400,
        width: 500,
        modal: true,
        buttons: {
            "Create": addUser,
            "Cancel": function() {
                dialog.dialog("close");
            }
        },
        close: function() {
            form[0].reset();
            allFields.removeClass("ui-state-error");
        }
    });
 
    form = dialog.find("form").on("submit", function (event) {
      event.preventDefault();
      addUser();
    });
 
    $("#create-user").button().on("click", function() {
      dialog.dialog("open");
    });
   
    $("#birth").datepicker({
        dateFormat: 'dd-mm-yy',
    });
 
    $(document).on('click', 'button.removebutton', function () {
        $("#dialog-remove").dialog('open');
        $(this).closest('tr').addClass('toRemove');
        return false;
    });
 
    $("#dialog-remove").dialog({
        modal: true,
        width: 210,
        height: 150,
        autoOpen: false,
        buttons: {
            "Yes": function () {
                $(".toRemove").remove();
                $(this).dialog("close");
            },
            "No": function () {
                $(".toRemove").removeClass("toRemove");
                $(this).dialog("close");
               
               
            }
        }
    });
});