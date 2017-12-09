$(function(){
    var pageNum = 1;
    var pageSize = 5;
    function getPage() {
        $.ajax({
            url: "/category/queryTopCategoryPaging",
            data: {
                page: pageNum,
                pageSize: pageSize
            },
            success: function(backData) {
                $("tbody").html(template("first",backData));
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
    $("form").bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-heart-empty',
            invalid: 'glyphicon glyphicon-heart',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            //校验用户名，对应name表单的name属性
            categoryName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '一级分类名称不能为空'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            url: "/category/addTopCategory",
            data: $("form").serialize(),
            type: "post",
            success: function (backData) {
                $('.modal-add').modal('hide');
                getPage();
            }
        });
    });
})