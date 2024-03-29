
layui.use(['element','form','laydate','jquery'], function () {
    let element = layui.element
        ,form = layui.form
        ,laydate = layui.laydate
        ,$ = layui.jquery
        ,interval = null
        ,pause = false;

    laydate.render({
        elem: '#custom-date'
        ,type: 'datetime'
        ,format: 'yyyy-MM-dd HH:mm:ss'
        ,calendar: true
    });

    /*附上button提交表单*/
    $("form").on('submit', function (e) {
        e.preventDefault();
    });

    $(".unix-timestamp-btn .layui-btn:nth-child(1)").click(function () {
        pause = true;
    });
    $(".unix-timestamp-btn .layui-btn:nth-child(2)").click(function () {
        pause = false;
    });
    $(".unix-timestamp-btn .layui-btn:nth-child(3)").click(function () {
        refreshUnixTimestamp();
    });
    
    interval = setInterval(function () {
        if (!pause) {
            refreshUnixTimestamp();
        }
    }, 1000);

    $(".unix-timestamp-transform .layui-btn").click(function () {
        let timezone = $(".timezone select[name='timezone']").val()
            ,timestamp = $(".unix-timestamp-transform input[name='unix_timestamp']").val()
            ,unit = $(".unix-timestamp-transform select[name='unit']").val();

        $.ajax({
            url: gateway + '/api/v1/timestamp/format'
            ,data: {timezone:timezone,timestamp:timestamp,unit:unit}
            ,type: 'GET'
            ,async: true
            ,success: function(res){
                if (res.code===0) {
                    $(".unix-timestamp-transform").find("input[name='unix_timestamp_format']").val(res.data.date_format)
                } else {
                    layer.alert(res.msg, {icon: 2, shade:0});
                }
            }
            ,error: function () {
                layer.alert('网络错误', {icon: 2, shade:0});
            }
        });
    });

    $(".date-transform .layui-btn").click(function () {
        let timezone = $(".timezone select[name='timezone']").val()
            ,date = $(".date-transform input[name='date']").val();

        $.ajax({
            url: gateway + '/api/v1/date/convert/timestamp'
            ,data: {timezone:timezone,date:date}
            ,type: 'GET'
            ,async: true
            ,success: function(res){
                if (res.code===0) {
                    $(".date-transform").find("input[name='date_format']").val(res.data.unix_timestamp)
                } else {
                    layer.alert(res.msg, {icon: 2, shade:0});
                }
            }
            ,error: function () {
                layer.alert('网络错误', {icon: 2, shade:0});
            }
        });
    });

    $(".custom-date-transform .layui-btn").click(function () {
        let timezone = $(".timezone select[name='timezone']").val()
            ,date = $(".custom-date-transform input[name='custom_date']").val();

        $.ajax({
            url: gateway + '/api/v1/date/convert/timestamp'
            ,data: {timezone:timezone,date:date}
            ,type: 'GET'
            ,async: true
            ,success: function(res){
                if (res.code===0) {
                    $(".custom-date-transform").find("input[name='custom_date_format']").val(res.data.unix_timestamp)
                } else {
                    layer.alert(res.msg, {icon: 2, shade:0});
                }
            }
            ,error: function () {
                layer.alert('网络错误', {icon: 2, shade:0});
            }
        });
    });

    function refreshUnixTimestamp() {
        let timezone = $(".timezone select[name='timezone']").val();

        $.ajax({
            url: gateway + '/api/v1/unix/timestamp'
            ,data: {'timezone':timezone}
            ,type: 'GET'
            ,async: true
            ,success: function(res){
                if (res.code===0) {
                    $(".unix-timestamp").find("input[name='unix_timestamp']").val(res.data.unix_timestamp)
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