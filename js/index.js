/**
 * Created by Administrator on 2016/10/8.
 */
$(function () {
    // tab页切换
    $(".tabs li").click(function() {
        //Remove any "active" class
        $(".tabs li a").removeClass("active");
        $(".tab-content").hide();

        $(this).find("a").addClass("active");
        var activeTab = $(this).find("a").attr("href");
        //Fade in the active content
        $(activeTab).fadeIn();
        // $(activeTab).addClass("animated fadeInLeftBig");
        return false;
    });



    // 上一步
    $(".prev").addClass("hvr-backward");
    $(".prev").click(function(){
        $(".tabs li:eq("+($(this).attr("class").slice(4,5)-1)+")") .trigger("click");
        // var animatedTab = $(this).parents(".tab-content").prev();
        // $(animatedTab).addClass("animated fadeInLeftBig");
        return false;
    });
    // 下一步
    $(".next").addClass("hvr-forward");
    $(".next").click(function(){
        // 最后面减去的   这个数字真是神奇   卧槽
        $(".tabs li:eq("+($(this).attr("class").slice(4,5)-6)+")") .trigger("click");  // 就因为一个括号浪费了一个小时 基本功查
        // var animatedTab = $(this).parents(".tab-content").next();
        // $(animatedTab).addClass("animated fadeInRightBig");
        return false;
    });



    // 单选框选中
    $(".option:not(#test1)").click(function () {
        // $(this).find("input").remove(":checked");
        if (  $(this).hasClass("three-box") ) {
            $(".reset").trigger("click");
            $(".option:not(#test1)").parent().find("#input-img").css("display", "none");
        }
        $(this).parent().find(".radio-img").children("img:not(#input-img)").css("display", "none");   // 这句代码影响了自选输入框的打勾
        $(this).find("input:not(#test1)").attr("checked",true);

        $(this).find("img:not(#input-img)").css("display", "block");
    });
    
    $("#test1").click(function () {
       // $(this).siblings().find("input:not(#radio1)").attr("checked",false); // 没有删除成功 貌似是因为之前用prop()的原因
        $("input[name=radio1]").removeAttr('checked');

        $(this).siblings().find("img:not(#input-img,#checkConfirm img)").css("display", "none");
    });


    // 排除并发量自选中的input 标签
    $("input:not(.def-input)").click(function () {
        $(".option").trigger('click');
    });

    // 提示函数
    function toolTip(content,num) {
        var thisNum = num;
        var d = dialog({
            title: '友情提示',
            content: content,
            okValue: '确定',
            ok: function () {
                $(".tabs li:eq('+thisNum+')").trigger("click");
            },
            cancelValue: '取消',
            cancel: false,
            width:200,
            height: 50
        });
        d.showModal();
        d.width(320);
        d.height(60)
    }

    $(".btn-success1").click(function () {
    // 验证数字方式
        var reg = /.*\..*/;
        if( $(".def-input").val() == null ) {
            $(".btn-success").attr("data-content", "输入不能为空！");
            // alert("输入不能为空！");
        } else if( $(".def-input").val() < 0 ) {
            toolTip('输入不能为负数！', 0);
            $(".input-group")[0].reset();
        } else if ( $(".def-input").val() == 0 ) {
            toolTip('输入不能为空或0！', 0);
            $(".input-group")[0].reset();
        } else if ( reg.test($(".def-input").val())) {
            toolTip('请输入整数！', 0);
            $(".input-group")[0].reset();
        } else if ( $(".def-input").val() >20000 ) {
            toolTip('请输入不大于20000的数值！', 0);
            $(".input-group")[0].reset();
        }
        else if(!isNaN( $(".def-input").val() )) {
            $(this).parent().find("input:not(#radio1)").removeAttr('checked');
            $("#input-img").css("display", "block");
            $(".input-group").css("display","none");
            $(".def-value").append("并发量" + $(".def-input").val());
            $(".reset").css("display","inline-block");
            $("#radio1").prop("checked",true)

        }
        else {
            toolTip('请输入有效的数值！', 0);
            $(".input-group")[0].reset();
            // $(".def-input").val(" "); 这种方式也可以
        }

    });

    // 并发量重选
    $(".reset").click (function () {

        $(".input-group").css("display","block");
        $(".reset").css("display","none");

        $("#radio1").removeAttr("checked");
        $(".def-value").empty();
        $(".def-input").empty();

        // $(this).siblings().first().find("img").css("display", "none");
        $("#input-img").css("display", "none");

        $(".input-group")[0].reset();
        // location.reload();

    });


    //  ajax获取数据并展示
    $("#submit").click(function(){
        var data1 = $('input[name="radio1"]:checked').val() < 4 ? $('input[name="radio1"]:checked').val() : $('.def-input').val(),
            length1 = data1.length,
            data2 = $('input[name="radio2"]:checked').val(),
            data31 = $('input[name="radio3"]:checked').val(),
            data32 = $('input[name="radio4"]:checked').val(),
            data3 = ( data31 + data32 == 0) ? 0 : 1,
            data4 = $('input[name="radio5"]:checked').val(),
            data5 = $('input[name="radio6"]:checked').val(),
            data6 = $('input[name="radio7"]:checked').val(),
            data7 = $('input[name="radio8"]:checked').val();
            console.log(data1,data2,data3,data4,data5,data6,data7);

       //   对7个参数进行是否是数字判断
        if (!isNaN(data1)&&(length1 > 0)&&!isNaN(data2)&&!isNaN(data31)&&!isNaN(data32)&&!isNaN(data4)&&!isNaN(data5)&&!isNaN(data6)&&!isNaN(data7)&&($("input[name=radio1]:checked").length==1))
        {
            $(this).attr("href","show.html");
            console.log(data1,data2,data3,data4,data5,data6,data7);
            var date = new Date();
            date.setTime(date.getTime()+30*1000);      // 30表示30秒钟
            //  设置cookie
            Cookies.set("data1", data1, {expires: date, path: "/"} );
            Cookies.set("data2", data2, {expires: date, path: "/"} );
            Cookies.set("data3", data3, {expires: date, path: "/"} );
            Cookies.set("data4", data4, {expires: date, path: "/"} );
            Cookies.set("data5", data5, {expires: date, path: "/"} );
            Cookies.set("data6", data6, {expires: date, path: "/"} );
            Cookies.set("data7", data7, {expires: date, path: "/"} );
        } else if (length1 == 0) {
            //$(".tabs li:eq(0)").trigger("click");
            var d = dialog({
                title: '友情提示',
                content: "请选择并发量选项再提交",
                okValue: '确定',
                ok: function () {
                    $(".tabs li:eq(0)").trigger("click");
                },
                cancelValue: '取消',
                cancel: false,
                width:200,
                height: 50
            });
            d.showModal();
            d.width(320);
            d.height(60)
        }
        else if ($("input[name=radio1]:checked").length==0) {
            var d = dialog({
                title: '友情提示',
                content: "请点击并发量确定按钮再提交！",
                okValue: '确定',
                ok: function () {
                    $(".tabs li:eq(0)").trigger("click");
                },
                cancelValue: '取消',
                cancel: false,
                width:200,
                height: 50
            });
            d.showModal();
            d.width(320);
            d.height(60)
        }
        else if (data2 == undefined) {
            var d = dialog({
                title: '友情提示',
                content: '请选择数据量选项再提交！',
                okValue: '确定',
                ok: function () {
                    $(".tabs li:eq(1)").trigger("click");
                },
                cancelValue: '取消',
                cancel: false,
                width:200,
                height: 50
            });
            d.showModal();
            d.width(320);
            d.height(60)
        } else if (data31 == undefined || data32 == undefined) {
            var d = dialog({
                title: '友情提示',
                content: '请选择跨公网选项再提交！',
                okValue: '确定',
                ok: function () {
                    $(".tabs li:eq(2)").trigger("click");
                },
                cancelValue: '取消',
                cancel: false,
                width:200,
                height: 50
            });
            d.showModal();
            d.width(320);
            d.height(60)
        } else if (data4 == undefined) {
            var d = dialog({
                title: '友情提示',
                content: '请选择读写选项再提交！',
                okValue: '确定',
                ok: function () {
                    $(".tabs li:eq(3)").trigger("click");
                },
                cancelValue: '取消',
                cancel: false,
                width:200,
                height: 50
            });
            d.showModal();
            d.width(320);
            d.height(60)
        } else if (data5 == undefined) {
            var d = dialog({
                title: '友情提示',
                content: '请选择数据重要性选项再提交！',
                okValue: '确定',
                ok: function () {
                    $(".tabs li:eq(4)").trigger("click");
                },
                cancelValue: '取消',
                cancel: false,
                width:200,
                height: 50
            });
            d.showModal();
            d.width(320);
            d.height(60)
        } else if (data6 == undefined) {
            var d = dialog({
                title: '友情提示',
                content:'请选择数据结构选项再提交！',
                okValue: '确定',
                ok: function () {
                    $(".tabs li:eq(5)").trigger("click");
                },
                cancelValue: '取消',
                cancel: false,
                width:200,
                height: 50
            });
            d.showModal();
            d.width(320);
            d.height(60)

        } else if (data7 == undefined) {
            var d = dialog({
                title: '友情提示',
                content: '请选择缓存使用率选项再提交！',
                okValue: '确定',
                ok: function () {
                    $(".tabs li:eq(6)").trigger("click");
                },
                cancelValue: '取消',
                cancel: false,
                width:200,
                height: 50
            });
            d.showModal();
            d.width(320);
            d.height(60)
         }
    });

});







