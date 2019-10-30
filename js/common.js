

/*主页面向页面跳转*/
document.addEventListener('DOMContentLoaded', function () {
    let tools = document.getElementsByClassName("tools-item");
    for (let i=0; i < tools.length; i++) {
        tools[i].onclick = function () {
            openUrlCurrentTab(chrome.runtime.getURL(this.getAttribute("data-link")));
        }
    }
});

/*导航跳转*/
document.addEventListener('DOMContentLoaded', function () {
    let navs = document.querySelectorAll(".navigation a");

    for (let i=0; i < navs.length; i++) {
        navs[i].onclick = function () {
            link = this.getAttribute("data-link");
            if (!link) return ;

            openUrlCurrentTab(chrome.runtime.getURL(link));
        }
    }
});