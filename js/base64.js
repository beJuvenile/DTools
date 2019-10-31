
layui.use(['element','form','jquery'], function () {
    let element = layui.element
        ,form = layui.form
        ,$ = layui.jquery;

    /*附上button提交表单*/
    $("form").on('submit', function (e) {
        e.preventDefault();
    });

    $(".layui-btn").click(function () {
        let type = $(this).attr('data-type')
            ,charset = $("select[name='charset']").val()
            ,txt = $("textarea[name='txt']").val();

        $.ajax({
            url: gateway + '/api/v1/base64'
            ,data: {type:type,charset:charset,txt:txt}
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
/*
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
    
    */
});