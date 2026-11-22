(() => {
  "use strict";

  const chapters = [...document.querySelectorAll("details.learn-section")];
  const toggleAllButton = document.querySelector("#toggleAllChapters");
  let multipleOpen = false;

  function updateToggleAllButton() {
    if (!toggleAllButton) return;
    toggleAllButton.textContent = chapters.length && chapters.every((chapter) => chapter.open)
      ? "Alle schließen"
      : "Alle öffnen";
  }

  function openChapterFromHash() {
    const target = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
    const chapter = target?.closest("details.learn-section");
    if (chapter) {
      chapter.open = true;
      if (!multipleOpen) {
        chapters.forEach((item) => {
          if (item !== chapter) item.open = false;
        });
      }
    }
    updateToggleAllButton();
  }

  chapters.forEach((chapter) => {
    chapter.querySelector("summary").addEventListener("click", () => {
      if (!multipleOpen && !chapter.open) {
        chapters.forEach((item) => {
          if (item !== chapter) item.open = false;
        });
      }
    });
    chapter.addEventListener("toggle", () => {
      updateToggleAllButton();
    });
  });

  toggleAllButton?.addEventListener("click", () => {
    const openAll = !chapters.every((chapter) => chapter.open);
    multipleOpen = openAll;
    chapters.forEach((chapter) => { chapter.open = openAll; });
    updateToggleAllButton();
  });

  updateToggleAllButton();
  window.addEventListener("hashchange", openChapterFromHash);
  openChapterFromHash();
})();
