/**
 * Created by bump94 on 12.11.2016.
 */


//metode hentet fra jespers crash course i JS
$("#adminLogOut").on("click", function () {
    SDK.logOut();
    window.location.href = "login.html";
});

var $adminCoursesTable = $("#adminCoursesTable")

//ajax forespørsel som henter alle kurser på bakgrunn av innlogget bruker
$.ajax({
    url: "http://localhost:5050/api/course/" + window.localStorage.getItem("storeSDKtokenId"),
    method: "GET",
    dataTyper: "json",
    contetType: "application/json",

    success: function (courses) {

        var courses = JSON.parse(courses)
        console.log(courses)

        //tabell hvor de forskjellige kursene legges inn + knapp for å tilgå kursets leksjoner
        courses.forEach(function (course) {
            $adminCoursesTable.append(
                "<tr>" +
                "<td>" + course.code + "</td>" +
                "<td><a role='button' data-course=" + course.displaytext + " class='btn btn-success btn-lg knap'> Kursets leksjoner</a></td>" +
                "</tr>"
            );
        });
    },

});

//metode som gjør at lectures blir lagt til de tilhørende courses
$("#adminCoursesTable").on("click", ".knap", function () {
    var course = $(this).data("course");
    window.location.href = "/KlientTilServer/adminLectureOversikt.html#" + course
})
