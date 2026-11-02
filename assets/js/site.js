// Screenshot lightbox. Without JS, each thumbnail simply links to the full image.
(function () {
  "use strict";
  var dialog = document.querySelector(".lightbox");
  var links = Array.prototype.slice.call(document.querySelectorAll(".gallery a"));
  if (!dialog || !links.length || typeof dialog.showModal !== "function") return;

  var img = dialog.querySelector("img");
  var caption = dialog.querySelector("figcaption");
  var index = 0;

  function show(i) {
    index = (i + links.length) % links.length;
    var link = links[index];
    img.src = link.getAttribute("href");
    img.alt = link.querySelector("img").alt;
    caption.textContent = link.getAttribute("data-caption") || "";
  }

  links.forEach(function (link, i) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      show(i);
      dialog.showModal();
    });
  });

  dialog.querySelector(".lb-prev").addEventListener("click", function () { show(index - 1); });
  dialog.querySelector(".lb-next").addEventListener("click", function () { show(index + 1); });
  dialog.querySelector(".lb-close").addEventListener("click", function () { dialog.close(); });

  // Click on the dark backdrop (the dialog itself, not the image or buttons) closes it.
  dialog.addEventListener("click", function (e) {
    if (e.target === dialog) dialog.close();
  });

  dialog.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") { e.preventDefault(); show(index - 1); }
    else if (e.key === "ArrowRight") { e.preventDefault(); show(index + 1); }
  });

  dialog.addEventListener("close", function () {
    var link = links[index];
    if (link) link.focus();
  });
})();
