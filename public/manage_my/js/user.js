$(function() {
    var pageNum = 1;
    var pageSize = 5;
    function getPage() {
        $.ajax({
            url: '/user/queryUser',
            data: {
                page: pageNum,
                pageSize: pageSize
            },
            success: function (backData) {
                // console.log(backData);
                    $("tbody").html(template("user", backData));
                    $("#pagintor").bootstrapPaginator({
                        bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
                        currentPage: pageNum,//当前页
                        totalPages: Math.ceil(backData.total / backData.size),//总页数
                        size: "small",//设置控件的大小，mini, small, normal,large
                        onPageClicked: function (event, originalEvent, type, page) {
                            //为按钮绑定点击事件 page:当前点击的按钮值
                            pageNum = page;
                            getPage();
                        }
                    });
                }
        })
    }
    getPage();
    $("tbody").on("click","button",function() {
        // console.log($(".modal-sure").find("strong"));
        var name = $(this).parent().siblings("td").eq(1).html();
        console.log(name);
        $(".modal-sure").find("strong").html(($(this).html() == "禁用"? "禁用" : "启用") + name);
        $('.modal-sure').modal('show');
        var isDelete = undefined;
        var id = $(this).parent().attr("data-id");
        if($(this).html() == "禁用") {
            isDelete = 1;
        } else {
            isDelete = 0;
        }
        $('.modal-sure').on('click', '.btn-primary', function () {
            $.ajax({
                url: "/user/updateUser",
                type: "post",
                data: {
                    id: id,
                    isDelete: isDelete
                },
                success: function (backData) {
                    $(".modal-sure").modal("hide");
                    getPage();
                }
            })
        });
    });
})