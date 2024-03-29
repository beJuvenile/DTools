// omnibox 演示
chrome.omnibox.onInputChanged.addListener((text, suggest) => {
    console.log('inputChanged: ' + text);
    if(!text) return;
    if(text == '美女') {
        suggest([
            {content: '中国' + text, description: '你要找“中国美女”吗？'},
            {content: '日本' + text, description: '你要找“日本美女”吗？'},
            {content: '泰国' + text, description: '你要找“泰国美女或人妖”吗？'},
            {content: '韩国' + text, description: '你要找“韩国美女”吗？'}
        ]);
    }
    else if(text == '微博') {
        suggest([
            {content: '新浪' + text, description: '新浪' + text},
            {content: '腾讯' + text, description: '腾讯' + text},
            {content: '搜狐' + text, description: '搜索' + text},
        ]);
    }
    else {
        suggest([
            {content: '百度搜索 ' + text, description: '百度搜索 ' + text},
            {content: '谷歌搜索 ' + text, description: '谷歌搜索 ' + text},
        ]);
    }
});

// 当用户接收关键字建议时触发
chrome.omnibox.onInputEntered.addListener((text) => {

    if (!text) return;
    if (text.startsWith('home')) {
        openUrlCurrentTab(chrome.runtime.getURL('html/home.html'));
    } else if (text.startsWith('time')) {
        openUrlCurrentTab(chrome.runtime.getURL('html/tools/time.html'));
    } else if (text.startsWith('base64')) {
        openUrlCurrentTab(chrome.runtime.getURL('html/tools/base64.html'));
    } else if (text.startsWith('url')) {
        openUrlCurrentTab(chrome.runtime.getURL('html/tools/url.html'));
    } else if (text.startsWith('ip')) {
        openUrlCurrentTab(chrome.runtime.getURL('html/tools/ip.html'));
    } else if (text.startsWith('serialize')) {
        openUrlCurrentTab(chrome.runtime.getURL('html/tools/serialize.html'));
    } else if (text.startsWith('json')) {
        openUrlCurrentTab(chrome.runtime.getURL('html/tools/json.html'));
    } else if (text.startsWith('md5')) {
        openUrlCurrentTab(chrome.runtime.getURL('html/tools/md5.html'));
    }

    return;


    var href = '';
    if(text.endsWith('美女')) href = 'http://image.baidu.com/search/index?tn=baiduimage&ie=utf-8&word=' + text;
    else if(text.startsWith('百度搜索')) href = 'https://www.baidu.com/s?ie=UTF-8&wd=' + text.replace('百度搜索 ', '');
    else if(text.startsWith('谷歌搜索')) href = 'https://www.google.com.tw/search?q=' + text.replace('谷歌搜索 ', '');
    else href = 'https://www.baidu.com/s?ie=UTF-8&wd=' + text;
    openUrlCurrentTab(href);
});
// 获取当前选项卡ID
function getCurrentTabId(callback)
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
        if(callback) callback(tabs.length ? tabs[0].id: null);
    });
}

// 当前标签打开某个链接
function openUrlCurrentTab(url)
{
    getCurrentTabId(tabId => {
        chrome.tabs.update(tabId, {url: url});
    })
}