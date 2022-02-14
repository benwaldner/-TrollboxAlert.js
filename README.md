-TrollboxAlert.js
This file was first published by the user https://gist.github.com/ILoveMexKetchup

This script filters all BitMEX trollbox posts for the usernames or keywords you configure. You can use text or regular expressions for both the keyword and the username filter.

If a trollbox post matches your configuration you will be notified by an audio alert and by the according post highlighted in the trollbox.

If you want your configured keywords and usernames beeing stored permanently make sure your browser doesn't delete the session data after closing it.

For a screenshot click here

Tested with Chrome, Opera and Firefox.

In firefox you can use custom sound alerts, just change the *.mp3 links in the script.
In Chrome and Opera only built-in BitMEX Sound alerts can be used (the pop and the click sounds we all know...).

Installation:

1. Install Tampermonkey (available for Chrome, Microsoft Edge, Safari, Opera Next, and Firefox)
Go to https://www.tampermonkey.net
Click the download button, this will redirect you to the according addon page for your browser. Click the install button.

2. Install the userscript
Click on the new Tampermonkey icon in your browser, then click "Create a new script".
A blank script template will open. Replace everything in it with the userscript above (copy and paste)
click on file, save
refresh the bitmex.com page and wait 10 seconds
Make sure to click the new volume icon in the trollbox topbar once after each page refresh/browser restart (important to let the browser play audio when in background) .

3. Tired of BitMEX fees?
Get 10% discount on BitMEX fees by using this link to register

Mutelist.js
https://gist.github.com/ILoveMexKetchup/f0cac24cb0d655b0775705e1efe2f48c

PercentageButtons.js
https://gist.github.com/ILoveMexKetchup/6583ad53cb87c711c59bc600b67e2535

