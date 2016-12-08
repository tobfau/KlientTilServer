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

        /*
         location.hash betyr at den tar den "hash" verdi som finnes i urlen, eks. www.google.dk#ape,
         altså ville det blitt #ape, med .replace sletter man # fra strengen 🙂
         */
        var id = location.hash.replace('#', '');

        //ajax forespørsel som henter alle reviews via userEndpoint på server siden på bakgrunn av reviewId
        $.ajax({
            url: "http://localhost:5050/api/review/" + id,
            method: "GET",
            dataType: "json",
            contentType: "application/json",

            success: function (reviews) {
                var $adminReviewsTable = $("#adminReviewsTable");

                reviews.forEach(function (review) {

                    var deleteButton;

                    //knapp som gjør det mulig for administrator å slette alle reviewene
                    deleteButton = "<button class ='deleteButton button-primary button-block toDelete' data-user=" + review.userId + " data-id=" + review.id + "> Slett</button>"


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
            var tokenId = $(this).data("user");


            //ajax forespørsel som gjør det mulig for admin å slette alle reviews
            $.ajax({
                type: "DELETE",
                url: SDK.serverURL + "/student/review",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({
                    id: id,
                    userId: tokenId
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






