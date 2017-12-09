$(function() {
    $.ajax({
        url: "/employee/checkRootLogin",
        success: function(backData) {
            // console.log(backData);
            if (backData.error == 400) {
                window.location.href = "login.html";
            }
        }
    })
    $(".nav span.glyphicon-log-out").on("click", function () {
        $('.my-sure').modal('show');
    });
    $(".my-sure button.btn-primary").on("click", function () {
        $('.my-sure').modal('hide');
        $.ajax({
            url: "/employee/employeeLogout",
            success: function (backData) {
                window.location.href = "login.html";
            }
        })
    });
    $(".nav span.glyphicon-align-justify").on("click", function () {
        $(".info").toggle();
        $(".nav").toggleClass("moveleft");
        $(".path").toggleClass("moveleft");
    });
    $(".info .content ul >li:eq(1) a").on("click",function () {
        $(this).siblings("ol").slideToggle();
    });
})