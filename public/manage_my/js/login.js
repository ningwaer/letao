$(function() {
    $("form").bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-heart-empty',
            invalid: 'glyphicon glyphicon-heart',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            //校验用户名，对应name表单的name属性
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 3,
                        max: 8,
                        message: '用户名长度必须3在到8之间'
                    },
                    callback: {
                        message: "用户名错误"
                    }
                    //正则校验
                    // regexp: {
                    //     regexp: /^[a-zA-Z0-9_\.]+$/,
                    //     message: '用户名由数字字母下划线和.组成'
                    // }
                }
            },
            password: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '用户名长度必须6在到12之间'
                    },
                    callback: {
                        message: "密码错误"
                    }
                    //正则校验
                    // regexp: {
                    //     regexp: /^[a-zA-Z0-9_\.]+$/,
                    //     message: '用户名由数字字母下划线和.组成'
                    // }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        NProgress.start();        
        //使用ajax提交逻辑
        $.ajax({
            url: "/employee/employeeLogin",
            data: $("form").serialize(),
            type: "post",
            success: function(backData) {
                // console.log(backData);
                if(backData.success == true) {
                    window.location.href = "./index.html"
                } else {
                    var validator = $("form").data('bootstrapValidator'); 
                    if(backData.error == 1000) {
                        validator.updateStatus("username", "INVALID", "callback");
                    } else if (backData.error == 1001) {
                        validator.updateStatus("password", "INVALID", "callback");
                    }
                }
                NProgress.done();
            }
        });
    });
    $("button[type=reset]").on("click",function() {
        var validator = $("form").data('bootstrapValidator');
        validator.methodName(params);
    })
})