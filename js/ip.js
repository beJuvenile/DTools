
layui.use(['element','form','jquery'], function () {
    let element = layui.element
        ,form = layui.form
        ,$ = layui.jquery
        ,localIpInterval = null
        ,ip = null
        ,tbInfo = null;

    /*附上button提交表单*/
    $("form").on('submit', function (e) {
        e.preventDefault();
    });

    $(".layui-btn").click(function () {
        let type = $(this).attr('data-type')
            ,language = $("select[name='language']").val()
            ,txt = $("textarea[name='txt']").val();

        $.ajax({
            url: gateway + '/api/v1/url'
            ,data: {type:type,language:language,txt:txt}
            ,type: 'POST'
            ,async: true
            ,success: function(res){
                if (res.code===0) {
                    $("textarea[name='txt_dec']").val(res.data.txt_dec)
                } else {
                    layer.alert(res.msg, {icon: 2, shade:0});
                }
            }
            ,error: function () {
                layer.alert('网络错误', {icon: 2, shade:0});
            }
        });
    });


    /*当前IP地址*/
    (function () {
        $.ajax({
            url: gateway + '/api/v1/client/ip'
            ,data: {}
            ,type: 'GET'
            ,async: true
            ,success: function(res){
                if (res.code===0) {
                    ip = res.data.ip;
                }
            }
            ,error: function () {
            }
        });
    })();
    localIpInterval = setInterval(function () {
        if (typeof returnCitySN !== "undefined") {
            $(".container .layui-form input[name='ip']").val(returnCitySN['cip']);
            ip = returnCitySN['cip'];
            clearInterval(localIpInterval);

            tbIpInfo();
        }
    }, 500);
    
    /*淘宝*/
    function tbIpInfo() {
        $.ajax({
            url: 'http://ip.taobao.com/service/getIpInfo.php'
            ,data: {ip:ip}
            ,type: 'GET'
            ,async: true
            ,success: function(res){
                if (res.code===0) {
                    $(".tb td:nth-child(3)").html(res.data.country);
                    $(".tb td:nth-child(4)").html(res.data.region + ' ' + res.data.city + ' ' + res.data.county);
                    $(".tb td:nth-child(5)").html(res.data.isp);
                } else {
                    layer.alert(res.msg, {icon: 2, shade:0});
                }
            }
            ,error: function () {
                layer.alert('网络错误', {icon: 2, shade:0});
            }
        });
    }

});