import "zx/globals";
import fs from "fs";
const dotenv = require("dotenv");
dotenv.config();

// eslint-disable-next-line no-undef
$`echo "javascript: \(function \(w\) {
  const { document } = w;
  function findVideo\(\) {
    var videoContainer;
    if \(document.location.href.includes\(\\"amazon.com\\"\)\) {
      /* Amazon */ videoContainer = document.getElementsByClassName\(
        \\"rendererContainer\\"
      \)[0];
    } else if \(document.getElementsByTagName\(\\"video\\"\).length > 0\) {
      /* HULU */ videoContainer = document.getElementsByTagName\(\\"video\\"\)[0];
    } else if \(document.getElementById\(\\"contentPlayerFrame\\"\)\) {
      /* VUDU */ videoContainer = document.getElementById\(\\"contentPlayerFrame\\"\);
      videoContainer.style.zIndex = \\"1\\";
    } else {
      /* Others */ videoContainer = document.body.firstElementChild;
    }
    return videoContainer;
  }
  function maximizeAncestors\(element\) {
    var parentElement = element.parentElement;
    if \(
      parentElement.innerHeight !== w.innerWidth &&
      parentElement.style.height !== \\"100%\\"
    \) {
      parentElement.style.height = \\"100%\\";
    }
    if \(
      parentElement.innerWidth !== w.innerWidth &&
      parentElement.style.width !== \\"100%\\"
    \) {
      parentElement.style.width = \\"100%\\";
    }
    if \(parentElement.parentElement\) {
      maximizeAncestors\(parentElement\);
    }
  }
  function insertIframe\(\) {
    maximizeAncestors\(videoContainer\);
    const my_iframe = document.createElement\(\\"iframe\\"\);
    my_iframe.src = \\"//$IFRAME_SOURCE/\\";
    my_iframe.width = \\"61.8%\\";
    my_iframe.height = \\"38.2%\\";
    const inserted = videoContainer.parentElement.insertBefore\(
      my_iframe,
      videoContainer
    \);
    inserted.style.position = \\"absolute\\";
    inserted.style.border = \\"0 none\\";
    inserted.style.left = \\"19.1%\\";
    inserted.style.top = \\"50%\\";
    inserted.style.zIndex = \\"9\\";
    inserted.style.overflow = \\"hidden\\";
    inserted.style.overflowX = \\"hidden\\";
    inserted.style.overflowY = \\"hidden\\";
    inserted.style.pointerEvents = \\"none\\";
  }
  var videoContainer = findVideo\(\);
  insertIframe\(\);
}\)\(window\);"`.pipe(fs.createWriteStream("./bookmarklet.js"));
