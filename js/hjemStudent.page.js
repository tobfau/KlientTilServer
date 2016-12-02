/**
 * Created by bump94 on 12.11.2016.
 */

$(document).ready(function () {

    $("#studentLogOut").on("click", function () {
        SDK.logOut();
        window.location.href = "login.html";
    });


    var $studentCoursesTable = $("#studentCoursesTable")


    $.ajax({
        url: "http://localhost:5050/api/course/" + window.localStorage.getItem("storeSDKtokenId"),
        method: "GET",
        dataTyper: "json",
        contetType: "application/json",

        success: function (courses) {

            var courses = JSON.parse(courses)
            console.log(courses)

            courses.forEach(function (course) {
                $studentCoursesTable.append(
                    "<tr>" +
                    "<td>" + course.code + "</td>" +
                    "<td><a role='button' data-course=" + course.displaytext + " class='btn btn-success btn-lg knap'> Dine timer</a></td>" +
                    "</tr>"
                );
            });
        },

    });
    //metode som gjør at lectures blir lagt til de tilhørende courses
    $("#studentCoursesTable").on("click", ".knap", function () {
        var course = $(this).data("course");
        window.location.href = "/KlientTilServer/lectureOversikt.html#" + course
    })

});