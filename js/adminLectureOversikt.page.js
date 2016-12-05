/**
 * Created by bump94 on 02.12.2016.
 */


$(document).ready(function () {

    $("#adminLogOut").on("click", function () {
        SDK.logOut();
        window.location.href = "login.html";
    });

    $(document).ready(function () {

        var course = location.hash;
        var course = course.replace('#', '');

        var $courseTable = $("#courseTable")
        var lectureCode = JSON.parse(localStorage.getItem("lectureCode"));


        $.ajax({
            url: "http://localhost:5050/api/lecture/" + course,
            method: "GET",
            dataType: "json",
            contentType: "application/json",

            success: function (lectures) {

                lectures.forEach(function (lectureId) {
                    $courseTable.append(
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
    $("#courseTable").on("click", ".evaluering", function () {
        var id = $(this).data("id");
        window.location.href = "/KlientTilServer/evalueringsOversikt.html#" + id
    });
});