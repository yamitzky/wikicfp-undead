wikicfp-undead
==============

WikiCFPのiCalendar(ics)から、開催日に関する情報だけを取り出して表示するための、node.js サーバーです。

This is just a *node.js server* to serve iCalendar showing dates of conferences on WikiCFP.

## How to use

Launch the server,

    $ node app.js

then access `http://localhost:3000/?list={user_id}` .

When your ics url is `http://www.wikicfp.com/cfp/servlet/event.showcal?list=0`, access `http://localhost:3000/?list=0`.
