/**
 * Created by bump94 on 14.11.2016.
 */


$(document).ready(function () {

    // log ut metode hentet fra jespers crash course i JS
    $("#studentLogOut").on("click", function () {
        SDK.logOut();
        window.location.href = "login.html";
    });

    $(document).ready(function () {


        /*
         location.hash betyr at den tar den "hash" verdi som finnes i urlen, eks. www.google.dk#ape,
         altså ville det blitt #ape, på linje to sletter man # fra strengen 🙂
         */
        var course = location.hash;
        var course = course.replace('#', '');

        var $evaluatingCourseTable = $("#evaluatingCourseTable")
        var lectureCode = JSON.parse(localStorage.getItem("lectureCode"));

        /*
         ajax forespørsel som henter alle lectures via userEndpoint på serverSiden
         på bakgrunn av det bestemte course bruker er tilknyttet
         */
        $.ajax({
            url: "http://localhost:5050/api/lecture/" + course,
            method: "GET",
            dataType: "json",
            contentType: "application/json",

            success: function (lectures) {

                lectures.forEach(function (lectureId) {

                    /*
                     tabell hvor lecture data legges inn i når det hentes fra server
                     + knapp til å komme videre til reviews siden
                     */
                    $evaluatingCourseTable.append(
                        "<tr>" +
                        "<td>" + lectureId.id + " </td>" +
                        "<td>" + lectureId.type + "</td>" +
                        "<td>" + lectureId.description + "</td>" +
                        "<td>" + lectureId.startDate + "</td>" +
                        "<td>" + lectureId.endDate + "</td>" +
                        "<td class='btn-row'> <button class='btn btn-default evaluering' data-id=" + lectureId.id + ">Se og opprett reviews</button></td>" +
                        "</tr>"
                    );
                });


            },
            error: function () {
                alert("feil");
            }

        });
    });
    //metode som gjør at lectures blir lagt til de tilhørende reviews
    $("#evaluatingCourseTable").on("click", ".evaluering", function () {
        var id = $(this).data("id");
        window.location.href = "/KlientTilServer/evaluering.html#" + id
    });
});