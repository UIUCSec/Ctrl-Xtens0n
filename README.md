Ctrl-Xtens0n

CS460 Project by Varun Kethineedi - kethine2 and Avinash Aerra - aerra2

Purpose of Project:

1. To demonstrate the lack of security chrome extensions have with a "Prank-Chrome Extension" that you control from an external server

2. Learn about chrome extension programming and their security risks

Project Goals:
We set out to create a chrome extension that demonstrates some security flaws with chrome's extensions. We decided to use a server in order to control our chrome extension. Its a common occurance for chrome extension to post data to an external server, however it is very rare for an external server to write to a chrome extension. We wanted to try having a server "controlling" a chrome extension to see what we could accomplish. This is also somewhat a proof of concept of having a server control the actions of a chrome extension because we could not find an extension that did that. 

What we accomplished:

1. We were able to successfully connect our chrome extension to an external server and have the extension post to the server and the server reply a "command" to the extension. We have the extension post to the server anytime the browser loads up a new webpage, and in reply the server can send a "command" to the extension. Because of this commands take place anytime the extension loads a new web page. Our server was written in python. Our server runs with two threads so one will be taking inputs (commands) from the owner to send to the victim while the other thread is sending and recieving messages from the chrome extension.
 
2. Changing the contents of the webpage. Our first "feature" is the ability to change the webpage from the server. You can send a command from the server to change the color on the next webpage the user with the extension loads up. This represents the ability of someone in an external server to access the content on a webpage. This idea can easily be made to remove "buttons" or change text content on the webpage. 

3. Our second "feature" is the ability to open up any page on the chrome. By sending a command from our server we are able to open up many instances of the "uiuc.sexy" page on our victim. Again showing the control one can have on chrome with an extension. 

4. Next "feature" is we allow you to add a url to the user's chrome history from the server. This shows how we can manipulate the user's chrome data.

5. We have a "blocking" feature. You can send websites from the server to have chrome block them on the victim. They cannot access these websites unless the extension is reloaded or deleted. Again, the ability to control the actual browswer. 

6. The url of every site the victim visits are written into a logs.txt file. 

7. if the user logs into any website using a form for the log in, the username and password and url of where they're logging into are written in passwords.txt. this shows a big security flaw with chrome because I am able to catch the form and extract the fields for username and password and send them to the server.

How to Run:

1. Download the folder.

2. cd Ctrl-Xtens0n

3. python server.py

4. Go into chrome -> Settings -> Extensions -> Enable Developer Mode -> Load Unpacked extension... -> click on the Ctrl-Xtens0n folder to upload it.
5. The menu in the console looks like: http://i.imgur.com/tKyr87L.jpg (this is an example of how each option works)

6. If you enter 1, you enter any of the options given and it will change the next page loaded into that color. Something like this: (http://i.imgur.com/1CTbRJ7.jpg)

7. If you enter 2, the next page the user loads will cause 10 new tabs to spawn with the url of "uiuc.sexy"

8. If you enter 3, it prompts you to enter a url to add to the victim's history (don't include "http://www" in this url)

9. If you enter 4, it prompts you to enter a url that will be blocked the next time a page is reloaded. For example if you block "reddit.com" you need to go to load another webpage and then after that "reddit.com" will be blocked. (It will use whatever you send as the URL as a substring of what to block) (something like: http://i.imgur.com/tRbxL16.jpg)

10. If you look at logs.txt you will see the pages visited by the victim.

11. If you try to log into for example facebook or twitter the chrome extension will extract the username and password from the form and write it into passwords.txt


In the future:
Although this extension is meant to be a "proof-of-concept" of being able to control the extension from a server, it also serves to show how doing that can exploit the security flaws in chrome. It is also meant as a "prank" extension. Something that should be further looked into and researched is being able to make this extension "invisible". This was possible a few years ago however, google has fixed this for now. 

Learned: 

From this project me and my partner learned how to create chrome extensions and the architecture behind them. We also did a lot of research into how chrome can be exploited. We learned how insecure chrome is because of their extensions. Thankfully Google checks the extensions before accepting them. However, this doesn't stop an extension from running  malicious code sent from an external server bypassing Google's checks. We succedeed in all goals we set out to accomplish. We were able to control to the extension with a server and able to show show some security flaws.
