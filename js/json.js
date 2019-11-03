
layui.use(['element','form','jquery','code'], function () {
    let element = layui.element
        ,form = layui.form
        ,$ = layui.jquery;

    /*附上button提交表单*/
    $("form").on('submit', function (e) {
        e.preventDefault();
    });

    layui.code({
        title: 'JavaScript'
        ,height: '600px'
        ,about: false
        ,skin: 'notepad'
    });

    $(".layui-btn").click(function () {
        let type = $(this).attr('data-type')
            ,charset = $("select[name='charset']").val()
            ,txt = JSON.stringify(eval("(" + $("textarea[name='txt']").val() + ")"));

        $.ajax({
            url: gateway + '/api/v1/json'
            ,data: {type:type,charset:charset,txt:txt}
            ,type: 'POST'
            ,async: true
            ,success: function(res){
                if (res.code===0) {
                    if (type > 0) {
                        $(".layui-code").html(res.data.txt_dec);
                    } else {
                        $(".layui-code").html("<pre>" + JSON.stringify(res.data.txt_dec, null, 2) + "</pre>");
                    }
                    layui.code({
                        title: 'JavaScript'
                        ,height: '600px'
                        ,about: false
                        ,skin: 'notepad'
                    });
                } else {
                    layer.alert(res.msg, {icon: 2, shade:0});
                }
            }
            ,error: function () {
                layer.alert('网络错误', {icon: 2, shade:0});
            }
        });
    });

});