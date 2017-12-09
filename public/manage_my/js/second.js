$(function() {
    var pageNum = 1;
    var pageSize = 5;
    function getPage() {
        $.ajax({
            url: "/category/querySecondCategoryPaging",
            data: {
                page: pageNum,
                pageSize: pageSize
            },
            success: function(backData) {
                //console.log(backData);
                $("tbody").html(template("second",backData));
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
                                    message: '二级分类名称不能为空'
                                }
                            }
                        }
                    }
                }).on('success.form.bv', function (e) {
                    e.preventDefault();
                    //使用ajax提交逻辑
                    $.ajax({
                        url: "/category/addSecondCategory",
                        data: $("form").serialize(),
                        type: "post",
                        success: function (backData) {
                            $('.modal-add').modal('hide');
                            getPage();
                        }
                    });
                });
            }
        })
    }
    getPage();
    // $.ajax({
    //     url: "/category/updateSecondCategory",
    //     type: "post",
    //     data: {
    //         id:
    //         brandName:
    //         categoryId:
    //         brandLogo:
    //         isDelete:
    //         hot:
    //     }
    // })
})