/**
 * Created by bump94 on 12.11.2016.
 */

$("#adminLogOut").on("click", function () {
    SDK.logOut();
    window.location.href = "login.html";
});

$(document).ready(function () {

    var $adminReviewsTable = $("#adminReviewsTable")
    var code = JSON.parse(localStorage.getItem("lectureID"));

    $.ajax({
        url: "http://localhost:5050/api/review/300",
        method: "GET",
        dataTyper: "json",
        contetType: "application/json",

        success: function (reviews) {

            var reviews = JSON.parse(reviews)
            console.log(reviews)
            reviews.forEach(function (reviews) {

                $adminReviewsTable.append(
                    "<tr>" +
                    "<td>" + reviews.user.id + "</td>" +
                    "<td><a role='button' href='' class='btn btn-success btn-lg'> Slett review</a></td>" +
                    "</tr>"
                );
            });
        }

    });
});