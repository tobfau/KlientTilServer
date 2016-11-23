/**
 * Created by bump94 on 12.11.2016.
 */

$(document).ready(function () {

    $("studentLogOut").on("click", function () {
        SDK.logOut();
        window.location.href = "login.html";
    });
});