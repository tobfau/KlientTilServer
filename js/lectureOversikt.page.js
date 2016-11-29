/**
 * Created by bump94 on 14.11.2016.
 */


$(document).ready(function(){

    $("#studentLogOut").on("click", function () {
        SDK.logOut();
        window.location.href = "login.html";
    });

    $(document).ready(function () {

        var course = location.hash;
        var course = course.replace('#', '');

        var $evaluatingCourseTable = $("#evaluatingCourseTable")
        var code = JSON.parse(localStorage.getItem("lectureCode"));


        $.ajax({
            url: "http://localhost:5050/api/lecture/" + course,
            method: "GET",
            dataType: "json",
            contentType: "application/json",

            success: function (lectures) {


                lectures.forEach(function (lecture) {

                    $evaluatingCourseTable.append(
                        "<tr>" +
                        "<td>" + lecture.id + " </td>" +
                        "<td>" + lecture.type + "</td>" +
                        "<td>" + lecture.description + "</td>" +
                        "<td>" + lecture.startDate + "</td>" +
                        "<td>" + lecture.endDate + "</td>" +
                        "<td><a role='button' href='evaluering.html' class='btn btn-success btn-lg'> Foreta review </a></td>" +
                        "</tr>"
                    );
                });


            },
            error: function () {
                alert("feil");
            }

        });
    });
    });


