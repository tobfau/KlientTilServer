/**
 * Created by bump94 on 17.11.2016.
 */


//login funksjon laget på bagrunn av Jesper sitt eksempel i JS kurs
$(document).ready(function () {

    $("#loginButton").on("click", function(e){
        e.preventDefault();

        var email = $("#inputEmail").val();
        var pw = $("#inputPassword").val();

        SDK.login(email, pw, function(err, data){

            //feilaktig info fra bruker
            if(err) {
                return $("#loginForm").find(".form-group").addClass("has-error");
                window.alert("feil");
            }

            //login ok
            $("#loginForm").find(".form-group").addClass("has-success");

            //if else statement for å skille brukertyper
            if (data.type === "admin")
                window.location.href = "hjemAdmin.html";

            else if (data.type === "student") {
                window.location.href = "hjemStudent.html";
            }

        });

    });


});

