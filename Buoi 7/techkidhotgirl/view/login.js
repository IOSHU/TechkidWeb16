

$(document).ready(function () {
    $("form").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            url: "http://localhost:6969/login",
            type: "post",
            data: {
                username: $("#username").val(),
                password: $("#password").val()
            },
            success: function (data) { // data -> du lieu server gui ve, ko lien quan data tren
                console.log(data);
                // window.location.href = "/question/" + data.question._id;
                window.location.href = "/api/users/" + data.user._id;
            },
            error: function (err) {
            }
        })
    });
})