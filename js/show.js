/**
 * Created by Administrator on 2016/10/11.
 */
$(function () {
    // 方案的显示与隐藏
    $("nav li").click(function () {
        // 初始化
        // $("nav li a").removeClass("active");
        $(".scheme").hide();
        //获取当前点击对象和激活属性以及切換
        if ( $(this).children("a").hasClass("active")) {
            $(this).children("a").removeClass("active");
            var activeTab1 = $(this).children("a").attr("href");
            $(activeTab1).fadeOut();
            return false;
        } else {
            $("nav li a").removeClass("active");
            $(this).children("a").addClass("active");  // 如果添加一个新的active之前
            var activeTab = $(this).children("a").attr("href");
            console.log(activeTab);
            // 效果
            $(activeTab).fadeIn();
            return false;
        }
    });

    // 获取cookie
    var data1 = Cookies.get("data1");
    var data2 = Cookies.get("data2");
    var data3 = Cookies.get("data3");
    var data4 = Cookies.get("data4");
    var data5 = Cookies.get("data5");
    var data6 = Cookies.get("data6");
    var data7 = Cookies.get("data7");
    // 调用展示函数
    // ajaxFun();
    // ajax 提交参数获取数据库json数据

        $.ajax({
            type: "GET",
            url: "http://localhost:8006/getresult",
            data: {
                "bingfaliang" :  data1,
                "shujuliang"  :  data2,
                "gongwang"    :  data3,
                "duxie"       :  data4,
                "chijiu"      :  data5,
                "jiegou"      :  data6,
                "mingzhong"   :  data7
            },
            contentType: "application/json",
            dataType: "json",
            timeout: 100,
            cache: false,
            async: false,
            beforeSend: function(){
                console.log('开始返回数据');
            },
            error:function(err){
                console.log(err);
            },
            success:sucFun           //  抽离出来的返回图表
        });
    //}

    function sucFun(data) {
       console.log(data);
        if (data.code == 000) {
            $(".wrapper").css("display","block");
            //  1  拿回数据用图表展示
            $('.show-charts').highcharts({
                chart: {
                    zoomType: 'xy'
                },
                title: {
                    text: '缓存方案错误率、吞吐率对比图',
                    style: {
                        fontWeight: 'bold'
                    }
                },
                credits: {
                    enabled: false    // 版权信息
                },
                xAxis: {
                    categories: data.content[1].struct,
                    crosshair: true
                },
                yAxis: [ { // 第1条Y轴
                    title: {
                        text: '吞吐率',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    labels: {
                        format: '{value} 次/秒',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    }
                },{ // 第2条Y轴
                    labels: {                             //  轴标签
                        //  轴标签的旋转角度rotation: Number   默认值：0
                        //  间隔显示轴标签的步长  step: number
                        format: '{value} %',
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },
                    title: {
                        text: '错误率',
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },
                    alternateGridColor: '#FDFFD5',        //  相间的网格行颜色
                    // gridLineColor: '#197F07',             //  网格线的颜色 默认值：#C0C0C0.
                    tickInterval: 1,                      //  坐标轴的刻度值
                    ceiling: 3,                           //  允许最高的自动计算的坐标轴刻度极端值
                    allowDecimals: Boolean,               //  允许坐标轴刻度为小数

                    plotLines:[{                          //  标线
                        label: {
                            text: "合理错误率",
                            style: {
                                //   color: 'blue',
                                fontWeight: 'bold'
                            },
                            align: 'right',
                            x: 65,                        //  x 轴偏移量
                            y: 3
                        },

                        color:'red',                      //  线的颜色，定义为红色
                        dashStyle:'solid',                //  默认值，这里定义为实线
                        value:0.5,                        //  定义在那个值上显示标示线，这里是在x轴上刻度为3的值处垂直化一条线
                        width:1                           //  标示线的宽度，1px
                    }],
                    opposite: true
                }],
                tooltip: {
                    shared: true
                },
                // 图列
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    verticalAlign: 'top',
                    borderWidth: 0,
                    // x: 150,
                    // y: 60,
                    //floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
                },
                series: [{
                    name: '错误率',
                    type: 'column',
                    yAxis: 1,
                    data: data.content[1].cuowulv,
                    tooltip: {
                        valueSuffix: ' %'
                    }

                },{
                    name: '吞吐率',
                    type: 'column',
                    data: data.content[1].tuntuliang,
                    tooltip: {
                        valueSuffix: '次/秒'
                    }
                }]
            });
            // 判断推荐方案是否是 memcached
            var str = String(data.content[0].fangan).slice(0,9);
            if (str !== "memcached" ){
                //  2  拿回数据非用图表展示

                // redis 方案
                $("#args1").append("并发量为" + data.content[0].bingfa + ", " + "缓存" + data.content[0].mingzhong + ", " +
                    "缓存中存储的" + data.content[0].shujuliang + ", " + "缓存操作类型为" + data.content[0].duxie + ", " +data.content[0].chijiu + ", " +
                    "缓存与服务器之间"  +  data.content[0].gongwang + ", " + data.content[0].jiegou );

                $("#title1").text("测试结果");
                $("#title2").text("Redis数据扩容方案");
                $("#title3").text("Redis数据备份方案");
                $("#title4").text("Redis数据迁移方案");
                $("#title5").text("经过我们数月对三种缓存的性能测试，利用正交法和余弦向量法科学有效地分析得出了不同使用情况下，缓存类型架构数据结构的最优方案，因此根据您的选择，在合理的错误率允许范围内，为您推荐以下缓存使用方案：");

                $("#args2").append(data.content[0].fangan);
                $("#args3").append( "推荐方案: " + data.content[0].fangan );
                $("#args4").append( "错误率: " + data.content[0].cuowulv + "%" );
                $("#args5").append( "吞吐率: " + data.content[0].tuntuliang + "次/秒");
                $("#args51").append( "服务器台数：" + data.content[0].nummachine + "台" );
                $("#args6").append(data.content[0].kuorong);
                $("#args7").append(data.content[0].beifen);
                $("#args8").append(data.content[0].qianyi);
                $(".memcached").remove();
            }
            else {
                //  memcached 方案
                $("#args1").append( "并发量为" + data.content[0].bingfa + ", " + "缓存" + data.content[0].mingzhong + ", " +
                    "缓存中存储的" + data.content[0].shujuliang + ", " + "缓存操作类型为" + data.content[0].duxie + ", " +data.content[0].chijiu + ", " +
                    "缓存与服务器之间"  +  data.content[0].gongwang + ", " + data.content[0].jiegou );

                $("#title1").text("测试结果");
                $("#title2").text("Memcached数据扩容方案");
                $("#title3").text("Memcached数据备份方案");
                $("#title4").text("Memcached数据迁移方案");
                $("#title5").text("经过我们数月对三种缓存的性能测试, 分析得出各种缓存使用场景最优方案结果 , 在可接受的错误率范围内:");



                $("#args2").append(data.content[0].fangan);
                $("#args3").append( data.content[0].fangan );
                $("#args4").append( "错误率: " + data.content[0].cuowulv + "%" );
                $("#args5").append( "吞吐率: " + data.content[0].tuntuliang + "次/秒" );
                $("#args51").append("服务器台数：" + data.content[0].nummachine + "台" );
                $("#args6").append(data.content[0].kuorong);
                $("#args7").append(data.content[0].beifen);
                $("#args8").append(data.content[0].qianyi);

                $("#ml1").append( data.content[2].title );
                $("#ml2").append( "<strong>功能及特点: </strong>&nbsp;&nbsp; " + data.content[2].title1 );
                $("#ml3").append( "<strong>缺点及不足:</strong>&nbsp;&nbsp; " + data.content[2].title2 );
                $("#ml4").append( "<strong>部署架构:</strong>&nbsp;&nbsp; " + data.content[2].title3 );

                $("#mr1").append( data.content[3].title );
                $("#mr2").append( "<strong>Magent的作用:</strong> &nbsp;&nbsp;" + data.content[3].title11 );
                $("#mr3").append( "<strong>Repcached的作用:</strong> &nbsp;&nbsp;" + data.content[3].title12 );
                $("#mr4").append( " <strong>Keepalived的作用:</strong> &nbsp;&nbsp;" + data.content[3].title13 );
                $("#mr5").append( " <strong>架构功能:</strong> &nbsp;&nbsp;" + data.content[3].title2 );
                $("#mr6").append( " <strong>部署架构: </strong>&nbsp;&nbsp;" + data.content[3].title3 );

                $("#m1").append( data.content[4].title );
                $("#m2").append( "<strong>特性及功能:</strong> &nbsp;&nbsp;" + data.content[4].title11 );
                $("#m3").append( "<strong>集群功能:</strong> &nbsp;&nbsp;" + data.content[4].title12 );
                $("#m4").append( " <strong>备份容灾功能:</strong> &nbsp;&nbsp;" + data.content[4].title13 );
                $("#m5").append( " <strong>数据同步功能:</strong> &nbsp;&nbsp;" + data.content[4].title14 );
                $("#m6").append( " <strong>热加载功能: </strong>&nbsp;&nbsp;" + data.content[4].title15 );
                $("#m7").append( " <strong>MCrouter IP地址: </strong>&nbsp;&nbsp;" + data.content[4].title2 );


                // 拿服务器图片
                $("#img1").attr("src", "http://localhost:8006/images/agentcluster.png");
                $("#img2").attr("src", "http://localhost:8006/images/agentcluster.png");
                $("#img3").attr("src", "http://localhost:8006/images/agentcluster.png");


            }
        }
        else if(data.code == 102 || data.code == 101) {
            var d = dialog({
                title: '友情提示',
                content: '集群列表不存在,请返回重新选择！',
                okValue: '确定',
                ok: function () {
                    location.href=history.back(-1);
                },
                cancelValue: '取消',
                cancel: false,
                width:200,
                height: 50
            });
            d.showModal();
            d.width(320);
            d.height(60)
        }else {
            console.log("test1");
            var d = dialog({

                title: '友情提示',
                content: '请求失败,请返回重新选择！',
                okValue: '确定',
                ok: function () {
                    location.href=history.back(-1);
                },
                cancelValue: '取消',
                cancel: false,
                color: red,
                width:200,
                height: 50
            });
            d.color(black);
            d.showModal();
            d.width(320);
            d.height(60)
            console.log("test2");
            location.href=history.go(-1);

        }



    }
    



});
