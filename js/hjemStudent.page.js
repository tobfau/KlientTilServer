/**
 * Created by bump94 on 12.11.2016.
 */

$(document).ready(function () {

    //metode hentet fra jespers crash course i JS
    $("#studentLogOut").on("click", function () {
        SDK.logOut();
        window.location.href = "login.html";
    });


    var $studentCoursesTable = $("#studentCoursesTable")


    //ajax forespørsel for å hente courses som innlogget bruker er tilmeldt
    $.ajax({
        url: "http://localhost:5050/api/course/" + window.localStorage.getItem("storeSDKtokenId"),
        method: "GET",
        dataType: "json",
        contentType: "application/json",

        success: function (courses) {

            //tabell hvor de forskjellige kursene legges inn + knapp for å tilgå kursets leksjoner
            courses.forEach(function (course) {
                $studentCoursesTable.append(
                    "<tr>" +
                    "<td>" + course.code + "</td>" +
                    "<td><a role='button' data-course=" + course.displaytext + " class='btn btn-success btn-lg lectures'> Dine timer</a></td>" +
                    "</tr>"
                );
            });
        },

    });

    //metode som gjør at lectures blir lagt til de tilhørende courses
    $("#studentCoursesTable").on("click", ".lectures", function () {
        var course = $(this).data("course");
        window.location.href = "/KlientTilServer/lectureOversikt.html#" + course
    })

});