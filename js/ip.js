
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
        ip = $(".layui-form input[name='ip']").val();

        tbIpInfo();
        ddIpInfo();
        iaIpInfo();
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
        if (ip) {
            $(".container .layui-form input[name='ip']").val(ip);
            clearInterval(localIpInterval);

            tbIpInfo();
            ddIpInfo();
            iaIpInfo();
        }
    }, 500);
    
    /*淘宝*/
    function tbIpInfo() {
        $.ajax({
            url: gateway + '/api/v1/tb/ip/check'
            ,data: {ip:ip}
            ,type: 'GET'
            ,async: true
            ,success: function(res){
                if (res.code===0) {
                    let data = res.data.info;

                    $(".tb td:nth-child(2) a").attr({'href': 'http://ip.taobao.com/service/getIpInfo.php?ip=' + ip, 'target': '_blank'});
                    $(".tb td:nth-child(3)").html(data.country);
                    $(".tb td:nth-child(4)").html(data.region + ' ' + data.city + ' ' + data.county);
                    $(".tb td:nth-child(5)").html(data.isp);
                } else {
                    layer.alert(res.msg, {icon: 2, shade:0});
                }
            }
            ,error: function () {
                layer.alert('网络错误', {icon: 2, shade:0});
            }
        });
    }

    /*当当*/
    function ddIpInfo() {
        $.ajax({
            url: gateway + '/api/v1/dd/ip/check'
            ,data: {ip:ip}
            ,type: 'GET'
            ,async: true
            ,success: function(res){
                if (res.code===0) {
                    let data = res.data.info;

                    $(".dangdang td:nth-child(2) a").attr({'href': 'http://iplookup.dangdang.com/?format=json&ip=' + ip, 'target': '_blank'});
                    $(".dangdang td:nth-child(3)").html(data.Loc[0]);
                    $(".dangdang td:nth-child(4)").html(data.Loc[1] + ' ' + data.Loc[2] + ' ' + data.Loc[3]);
                } else {
                    layer.alert(res.msg, {icon: 2, shade:0});
                }
            }
            ,error: function () {
                layer.alert('网络错误', {icon: 2, shade:0});
            }
        });
    }

    /*IP-API*/
    function iaIpInfo() {
        $.ajax({
            url: gateway + '/api/v1/ia/ip/check'
            ,data: {ip:ip}
            ,type: 'GET'
            ,async: true
            ,success: function(res){
                if (res.code===0) {
                    let data = res.data.info;

                    $(".ip-api td:nth-child(2) a").attr({'href': 'http://ip-api.com/json/' + ip, 'target': '_blank'});
                    $(".ip-api td:nth-child(3)").html(data.country);
                    $(".ip-api td:nth-child(4)").html(data.regionName + ' ' + data.city);
                    $(".ip-api td:nth-child(5)").html(data.isp);
                    $(".ip-api td:nth-child(6)").html(data.lat + ',' + data.lon);
                    $(".ip-api td:nth-child(7)").html(data.org);
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