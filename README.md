## Tests

Tests is a web application. It is designed to create tests for students. 
Teachers can sign up for it. After they sign in, they can create a test (title, description, dates, questions with set of answers).
Students then can see this test and do it. Test's results and information about student are saved. Teacher can see test's results of each his student.

### Demo

You can see a demo [here](http://dijkstra.cs.ttu.ee/~t103931/startpage.html).

You can login as **demo user** to try programm.
<br>**e-mail:** demo@gmail.com
<br>**password:** demo

### Installation

In folder 'css' are all neccessary css files. 'fonts' is a folder with pictures. In folder 'js' are javascripts.
Database is written on sqlite. This file  is called 'database.sql' and is in folder 'sqlite'.
Also in folder 'sqlite' are files written on python to work with database.

To install this web application you will need to create sqlite database on your server.
You need to make changes in python files (they are in folder 'sqlite') with your own path to database.
Then you will need to copy 'css', 'js', 'fonts' folders to your server. Copy files from folder 'sqlite' to 'cgi-bin' folder on your server.
Copy 'startpage.html' and 'testpage.html' to your server.

After copying all necessary files to server, you simply need to open webpage 'startpage.html' in your browser.

### User guide

You can read user guide [here] (https://github.com/nataljaZ/tests/blob/master/UserGuide.md)