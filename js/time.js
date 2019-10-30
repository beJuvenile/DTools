
layui.use(['element','form','laydate'], function () {
    let element = layui.element
        ,form = layui.form
        ,laydate = layui.laydate;

    laydate.render({
        elem: '#custom-date'
        ,type: 'datetime'
        ,format: 'yyyy-MM-dd HH:mm:ss'
        ,calendar: true
    });
});