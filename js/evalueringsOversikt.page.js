/**
 * Created by bump94 on 28.11.2016.
 */

//logg ut funksjon
$(document).ready(function () {

    //metode hentet fra jespers crash course i JS
    $("#adminLogOut").on("click", function () {
        SDK.logOut();
        window.location.href = "login.html";
    });


//metode for å hente reviews
    $(document).ready(function () {
        var id = location.hash.replace('#', '');

        //ajax call som henter alle reviews via userEndpoint på serverSiden på bakgrunn av reviewId
        $.ajax({
            url: "http://localhost:5050/api/review/" + id,
            method: "GET",
            dataType: "json",
            contentType: "application/json",

            success: function (reviews) {
                var $adminReviewsTable = $("#adminReviewsTable");

                reviews.forEach(function (review) {

                    var deleteButton;

                    //differansierer mellom innlogget brukers reviews og de som ikke er bruker sine
                    if (review.userId === SDK.Storage.load("tokenId")) {
                        deleteButton = "<button class ='deleteButton button-primary button-block toDelete' data-id=" + review.id + "> Slett</button>"
                    } else {
                    }

                    //tabell hvor review dataene legges inn i + knapp for å slette review
                    $adminReviewsTable.append(
                        "<tr>" +
                        "<td>" + review.id + "</td>" +
                        "<td>" + review.rating + "</td>" +
                        "<td>" + review.comment + "</td>" +
                        "<td>" + deleteButton + "</td>" +
                        "</tr>"
                    );
                });
            },
            error: function () {
                alert("Leksjonen er enda ikke vurdert av noen!");
            }

        })

        //gjør det mulig å slette innlogget bruker sitt review på bakgrunn av reviewId og userId som definert på serverside
        $("#adminReviewsTable").on('click', '.toDelete', function (e) {
            var id = $(this).data("id");

            $.ajax({
                type: "DELETE",
                url: SDK.serverURL + "/student/review",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({
                    id: id,
                    userId: SDK.Storage.load("tokenId")
                }),
                success: function (res) {
                    location.reload()
                },
                error: function (err) {
                    console.log(err);
                }
            })
        });
    });
});






