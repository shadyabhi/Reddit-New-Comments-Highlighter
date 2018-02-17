# Reddit New Comments Highlighter

It's a chrome/firefox/safari extension used to highlight new comments on a comments page that was visited earlier on reddit.
It helps keep track of new comments when you revisit a comments page.

# How is it built?

The extension is built using Kango Framework & works on multiple browsers.

## To update the framework

```
➜ $?=0 @arastogi-mn3.linkedin.biz shadyabhi/Reddit-New-Comments-Highlighter [ 8:13AM] (master|✚1…)➤ make update
wget -q http://kangoextensions.com/kango/kango-framework-latest.zip
unzip -q -o -d kango_dir kango-framework-latest.zip
rm kango-framework-latest.zip

>>>  1s elasped...
```

## To build the extension for multiple browsers
```
➜ $?=0 @arastogi-mn3.linkedin.biz shadyabhi/Reddit-New-Comments-Highlighter [ 8:14AM] (master|✚1…)➤ make build
python kango_dir/kango.py build ./
[   INFO] Contact extensions@kangoextensions.com to enable IE support
[   INFO] Running Kango v1.8.0
[   INFO] Building chrome extension...
[   INFO] Building firefox extension...
[   INFO] Building safari extension...

>>>  2s elasped...
➜ $?=0 @arastogi-mn3.linkedin.biz shadyabhi/Reddit-New-Comments-Highlighter [ 8:14AM] (master|✚1…)➤
```

# Extension Links

Chrome: https://chrome.google.com/webstore/detail/reddit-new-comments-highl/ajdilinnnkbmpoegibgacadjlblmpjad

Firefox: https://addons.mozilla.org/en-US/firefox/addon/reddit-new-comments-highlighte/
