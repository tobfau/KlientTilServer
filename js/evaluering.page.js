/**
 * Created by bump94 on 12.11.2016.
 */


//logg ut funksjon
$(document).ready(function () {

    $("#studentLogOut").on("click", function () {
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
                var $studentReviewsTable = $("#studentReviewsTable");

                reviews.forEach(function (review) {

                    var deleteButton;

                    //differansierer mellom innlogget brukers reviews og de som ikke er bruker sine
                    if (review.userId === SDK.Storage.load("tokenId")) {
                        deleteButton = "<button class ='deleteButton button-primary button-block toDelete' data-id=" + review.id + "> Slett</button>"
                    } else {
                        deleteButton = "<button class ='deleteButton button-danger button-block' data-id=" + review.id + "> Du kan kun slette dine egne reviews</button>"
                    }

                    //tabell hvor review dataene legges inn i + knapp for å slette review
                    $studentReviewsTable.append(
                        "<tr>" +
                        "<td>" + review.id + "</td>" +
                        "<td>" + review.rating + "</td>" +
                        "<td>" + review.comment + "</td>" +
                        "<td>" + deleteButton + "</td>" +
                        "</tr>"
                    );
                });
            },
            //får opp en melding på siden dersom leksjonen ikke inneholder reviews
            error: function () {
                alert("Leksjonen er enda ikke vurdert av noen!");
            }

        })

        //gjør det mulig å slette innlogget bruker sitt review på bakgrunn av reviewId og userId
        $("#studentReviewsTable").on("click", ".toDelete", function (e) {
            var id = $(this).data("id");

            //ajax call hvor man sletter et review via studentEndpoint på server siden
            $.ajax({
                type: "DELETE",
                url: SDK.serverURL + "/student/review",
                contentType: "application/json",
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

        //metode som innsetter et review i insertReview tabellen
        $("#insertReview").click(function (e) {
            e.preventDefault()
            var comment = $("#comment").val();
            var rating = $("#rating").val();
            var lecture = location.hash.replace('#', '');

            /*
             ajax call hvor man poster et review via studentEndpoint på server siden
             tar verdien av comment og rating + den leksjonen man er inne på og lagrer/poster den i DB
             */
            $.ajax({
                type: "POST",
                url: "http://localhost:5050/api/student/review",
                contentType: "application/json",
                data: JSON.stringify({
                    comment: comment,
                    rating: rating,
                    lectureId: lecture,
                    userId: SDK.Storage.load("tokenId")
                }),

                success: function (res) {
                    location.reload()

                },
                error: function (err) {
                    console.log(err);
                }

            })


        })


    });
});






