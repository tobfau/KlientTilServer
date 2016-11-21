/**
 * Created by bump94 on 14.11.2016.
 */


$(document).ready(function(){

    var $evaluatingCourseTable = $("#evaluatingCourseBody")

    $.ajax({
        url: "http://localhost:5050/api/lecture/BEOKO1020U_XC_E16",
        method: "GET",


        dataType: "json",
        accept : "application/json",
        contentType: "application/json",
        success: function (lectures, status, xhr) {


            console.log(lectures);
            lectures.forEach(function (lecture) {

                $evaluatingCourseTable.append(
                    "<tr>" +
                    "<td> + lecture.id + </td>" +
                    "<td> + lecture.courseId + </td>" +
                    "<td> + lecture.type + </td>" +
                    "<td> + lecture.description + </td>" +
                    "<td> + lecture.startDate + </td>" +
                    "<td> + lecture.endDate + </td>" +
                    // "<td> + evaluating.lokale + </td>" +
                    // "<td> + evaluating.kurs-id + </td>" +
                    "</tr>"
                );
            });


        },

        error: function (xhr, status, error) {
            console.log(xhr, status, error);
        }
    });
    });


