/**
 * Created by bump94 on 12.11.2016.
 */

$("#adminLogOut").on("click", function () {
    SDK.logOut();
    window.location.href = "login.html";
});

$(document).ready(function () {

    var $adminReviewsTable = $("#adminReviewsTable")

    $.ajax({
        url: "http://localhost:5050/api/review/300",
        method: "GET",
        dataType: "json",
        contentType: "application/json",

        success: function (reviews) {
            reviews.forEach(function (reviews) {

                $adminReviewsTable.append(
                    "<tr>" +
                    "<td>" + reviews.id + "</td>" +
                    "<td>" + reviews.rating + "</td>" +
                    "<td>" + reviews.comment + "</td>" +
                    "<td><a role='button' href='' class='btn btn-success btn-lg'> Slett review</a></td>" +
                    "</tr>"
                );
            });
        }

    });


});