/**
 * Created by bump94 on 02.12.2016.
 */


$(document).ready(function () {

    // log ut metode hentet fra jespers crash course i JS
    $("#adminLogOut").on("click", function () {
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

        var $courseTable = $("#courseTable")
        var lectureCode = JSON.parse(localStorage.getItem("lectureCode"));


        /*
         ajax forespørsel som henter alle lectures via userEndpoint på serverSiden
         på bakgrunn av det bestemte course innlogget bruker er tilknyttet
         */
        $.ajax({
            url: "http://localhost:5050/api/lecture/" + course,
            method: "GET",
            dataType: "json",
            contentType: "application/json",

            success: function (lectures) {

                /*
                 tabell hvor lecture data legges inn i når det hentes fra server
                 + knapp til å komme videre til oversikten over alle reviene
                 */
                lectures.forEach(function (lectureId) {
                    $courseTable.append(
                        "<tr>" +
                        "<td>" + lectureId.id + " </td>" +
                        "<td>" + lectureId.type + "</td>" +
                        "<td>" + lectureId.description + "</td>" +
                        "<td>" + lectureId.startDate + "</td>" +
                        "<td>" + lectureId.endDate + "</td>" +
                        "<td class='btn-row'> <button class='btn btn-default evaluering' data-id=" + lectureId.id + ">Se og slett reviews</button></td>" +
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
    $("#courseTable").on("click", ".evaluering", function () {
        var id = $(this).data("id");
        window.location.href = "/KlientTilServer/evalueringsOversikt.html#" + id
    });
});