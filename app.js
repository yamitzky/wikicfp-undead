var http = require("http");
var icalendar = require("icalendar");
var url = require("url");
var cfp_url = "http://www.wikicfp.com/cfp/servlet/event.showcal?list=";

var server = http.createServer(function(req, res) {
  var num = url.parse(req.url, true).query["list"];

  http.get(cfp_url + num, function(cal_res) {
    var body = ""

    cal_res.on("data", function(data) {
      body += data;
    });

    cal_res.on("end", function () {
      var ical, events, ical_new;

      ical = icalendar.parse_calendar(body);
      events = ical.events();
      ical_new = new icalendar.iCalendar();

      for (var i = 0; i < events.length; i += 1) {
        var summary, title;
        summary = events[i].properties["SUMMARY"];
        if (!summary || summary.length == 0) {
          continue;
        }
        title = summary[0]["value"];
        if (title.match(/[Dd]eadline$/) || title.match(/[Dd]ue$/)) {
          continue;
        }
        ical_new.addComponent(events[i]);
      }

      res.writeHead(200, {'Content-Type': 'text/calendar'});
      res.write(ical_new.toString());
      res.end();
    })
  });
}).listen(3000);
