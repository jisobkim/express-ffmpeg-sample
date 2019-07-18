var express = require("express");
var spawn = require("child_process").spawn;

var router = express.Router();

/* GET users listing. */
router.get("/capture", function(req, res) {
  var ffmpeg = spawn("ffmpeg", [
    "-ss", "00:00:15",
    "-i", "https://cstr-vod.castr.io/vdafddac30977c11e9bdcb/71983cc5-f510-4b36-b77a-fc3d216e15d3/tracks-v1a1/mono.m3u8",
    "-vframes", "1",
    "-y",
    "./public/images/thumbnail.jpg"
  ]);

  ffmpeg.stdout.on("data", data => {
    console.log(`stdout: ${data}`);
  });

  ffmpeg.stderr.on("data", data => {
    console.log(`stderr: ${data}`);
  });

  ffmpeg.on("close", code => {
    console.log(`child process exited with code ${code}`);
    //res.sendStatus(200);
    res.download("./public/images/thumbnail.jpg");
  });
});

/* POST medias listing. */
router.post("/capture", function(req, res) {
  if (
    typeof req.body.media_url !== "undefined" &&
    typeof (req, body.position) !== "undefined"
  ) {
    var ffmpeg = spawn("ffmpeg", [
      "-ss", req.body.position,
      "-i", req.body.media_url,
      "-vframes", "1",
      "-y",
      "./public/images/thumbnail.jpg"
    ]);

    ffmpeg.stdout.on("data", data => {
      console.log(`stdout: ${data}`);
    });

    ffmpeg.stderr.on("data", data => {
      console.log(`stderr: ${data}`);
    });

    ffmpeg.on("close", code => {
      console.log(`child process exited with code ${code}`);
      //res.sendStatus(200);
      res.download("./public/images/thumbnail.jpg");
    });
  } else {
    res.status(400);
  }
});

module.exports = router;
