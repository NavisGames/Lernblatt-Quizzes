(() => {
  "use strict";

  const chapters = [...document.querySelectorAll("details.learn-section")];

  function openChapterFromHash() {
    const target = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
    const chapter = target?.closest("details.learn-section");
    if (chapter) {
      chapters.forEach((item) => { item.open = item === chapter; });
    }
  }

  chapters.forEach((chapter) => {
    chapter.addEventListener("toggle", () => {
      if (chapter.open) chapters.forEach((item) => {
        if (item !== chapter) item.open = false;
      });
    });
  });

  window.addEventListener("hashchange", openChapterFromHash);
  openChapterFromHash();
})();
