(() => {
  "use strict";

  // Temml 0.14.0 is bundled locally so formulas also work without a network connection.
  function renderMath(element) {
    temml.renderMathInElement(element, {
      throwOnError: true,
      wrap: "tex",
      errorCallback(message, error) {
        console.error("Mathematische Formel konnte nicht dargestellt werden:", message, error);
      }
    });
  }

  window.renderMath = renderMath;
  document.addEventListener("DOMContentLoaded", () => {
    const content = document.querySelector(".learn-content");
    if (content) renderMath(content);
  });
})();
