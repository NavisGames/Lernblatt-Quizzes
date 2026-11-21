(() => {
  "use strict";

  const MAX_DURATION_SECONDS = 90 * 60;
  const SECONDS_PER_QUESTION = 2 * 60;
  const STUDY_PROGRESS_STORAGE_KEY = "fg43-quiz-study-progress-v1";
  const DIFFICULTY_RANK = { leicht: 0, mittel: 1, schwer: 2, knobel: 3 };

  // Fachgymnasium-Klausurmaßstab, Stand September 2019: Mindestpunktzahlen je Notenpunkt.
  const gradeTableSource = `
100|95 90 85 80 75 70 65 60 55 50 45 40 33 27 20
50|48 45 43 40 38 35 33 30 28 25 23 20 17 14 10
49|47 45 42 40 37 35 32 30 27 25 23 20 17 14 10
48|46 44 41 39 36 34 32 29 27 24 22 20 16 13 10
47|45 43 40 38 36 33 31 29 26 24 22 19 16 13 10
46|44 42 40 37 35 33 30 28 26 23 21 19 16 13 10
45|43 41 39 36 34 32 30 27 25 23 21 18 15 13 9
44|42 40 38 36 33 31 29 27 25 22 20 18 15 12 9
43|41 39 37 35 33 31 28 26 24 22 20 18 15 12 9
42|40 38 36 34 32 30 28 26 24 21 19 17 14 12 9
41|39 37 35 33 31 29 27 25 23 21 19 17 14 12 9
40|38 36 34 32 30 28 26 24 22 20 18 16 14 11 8
39|38 36 34 32 30 28 26 24 22 20 18 16 13 11 8
38|37 35 33 31 29 27 25 23 21 19 18 16 13 11 8
37|36 34 32 30 28 26 25 23 21 19 17 15 13 10 8
36|35 33 31 29 27 26 24 22 20 18 17 15 12 10 8
35|34 32 30 28 27 25 23 21 20 18 16 14 12 10 7
34|33 31 29 28 26 24 23 21 19 17 16 14 12 10 7
33|32 30 29 27 25 24 22 20 19 17 15 14 11 9 7
32|31 29 28 26 24 23 21 20 18 16 15 13 11 9 7
31|30 28 27 25 24 22 21 19 18 16 14 13 11 9 7
30|29 27 26 24 23 21 20 18 17 15 14 12 10 9 6
29|28 27 25 24 22 21 19 18 16 15 14 12 10 8 6
28|27 26 24 23 21 20 19 17 16 14 13 12 10 8 6
27|26 25 23 22 21 19 18 17 15 14 13 11 9 8 6
26|25 24 23 21 20 19 17 16 15 13 12 11 9 8 6
25|24 23 22 20 19 18 17 15 14 13 12 10 9 7 5
24|23 22 21 20 18 17 16 15 14 12 11 10 8 7 5
23|22 21 20 19 18 17 15 14 13 12 11 10 8 7 5
22|21 20 19 18 17 16 15 14 13 11 10 9 8 6 5
21|20 19 18 17 16 15 14 13 12 11 10 9 7 6 5
20|19 18 17 16 15 14 13 12 11 10 9 8 7 6 4
19|19 18 17 16 15 14 13 12 11 10 9 8 7 6 4
18|18 17 16 15 14 13 12 11 10 9 9 8 6 5 4
17|17 16 15 14 13 12 12 11 10 9 8 7 6 5 4
16|16 15 14 13 12 12 11 10 9 8 8 7 6 5 4
15|15 14 13 12 12 11 10 9 9 8 7 6 5 5 3
14|14 13 12 12 11 10 10 9 8 7 7 6 5 4 3
13|13 12 12 11 10 10 9 8 8 7 6 6 5 4 3
12|12 11 11 10 9 9 8 8 7 6 6 5 4 4 3
11|11 11 10 10 9 9 8 8 7 7 6 5 5 4 3
10|10 10 9 9 8 8 7 7 6 6 5 5 4 4
`.trim();

  const GRADE_THRESHOLDS = new Map(
    gradeTableSource.split("\n").map((line) => {
      const [maximum, values] = line.split("|");
      const thresholds = values.split(/\s+/).map(Number);
      if (thresholds.length !== (maximum === "10" ? 14 : 15)) {
        throw new Error(`Notenpunktematrix für ${maximum} enthält eine unerwartete Anzahl von Werten.`);
      }
      return [Number(maximum), thresholds];
    })
  );

  const gradeDescriptions = {
    15: ["1+", "sehr gut"], 14: ["1", "sehr gut"], 13: ["1−", "sehr gut"],
    12: ["2+", "gut"], 11: ["2", "gut"], 10: ["2−", "gut"],
    9: ["3+", "befriedigend"], 8: ["3", "befriedigend"], 7: ["3−", "befriedigend"],
    6: ["4+", "ausreichend"], 5: ["4", "ausreichend"], 4: ["4−", "ausreichend"],
    3: ["5+", "mangelhaft"], 2: ["5", "mangelhaft"], 1: ["5−", "mangelhaft"],
    0: ["6", "ungenügend"]
  };

  const categoryLearnAnchors = {
    basics: "grundlagen",
    media: "medien",
    ethernet: "ethernet",
    ip: "ip",
    routing: "routing"
  };

  const subjects = {
    mathe: {
      title: "Analysis 1",
      eyebrow: "Mathematik · 12. Klasse · 1. Semester",
      categories: window.MATHE_CATEGORIES,
      topics: window.MATHE_QUESTION_TOPICS,
      questionPool: window.MATHE_QUESTION_POOL,
      learnPage: "Mathematik-quiz-app/lernseite.html",
      categoryLearnAnchors: {
        aenderung: "aenderung",
        funktionen: "funktionen",
        ableitung: "ableitung",
        kurven: "kurven",
        anwendung: "anwendung",
        folgen: "folgen"
      }
    },
    stochastik: {
      title: "Stochastik",
      eyebrow: "Mathematik · 12. Klasse · 2. Semester",
      categories: window.STOCHASTIK_CATEGORIES,
      topics: window.STOCHASTIK_QUESTION_TOPICS,
      questionPool: window.STOCHASTIK_QUESTION_POOL,
      learnPage: "Stochastik-quiz-app/lernseite.html",
      categoryLearnAnchors: Object.fromEntries(
        window.STOCHASTIK_CATEGORIES.map((category) => [category.id, category.id])
      )
    },
    informatik: {
      title: "Informatik",
      eyebrow: "Informatik · 13. Klasse · 1. Semester",
      categories: window.INFORMATIK_CATEGORIES,
      topics: window.INFORMATIK_QUESTION_TOPICS,
      questionPool: window.INFORMATIK_QUESTION_POOL,
      learnPage: "Informatik-quiz-app/lernseite.html",
      categoryLearnAnchors
    },
    dvt: {
      title: "DVT",
      eyebrow: "DVT · 13. Klasse · 1. Semester",
      categories: window.DVT_CATEGORIES,
      topics: window.DVT_QUESTION_TOPICS,
      questionPool: window.DVT_QUESTION_POOL,
      learnPage: "DVT-quiz-app/lernseite.html",
      categoryLearnAnchors: {
        architecture: "architektur",
        memory: "architektur",
        registers: "cpu",
        encoding: "befehle",
        commands: "befehle",
        directives: "befehle",
        cycle: "zyklus",
        ports: "hardware",
        banking: "hardware",
        branching: "verzweigungen",
        "code-analysis": "codeanalyse",
        loops: "laufzeit",
        algorithms: "laufzeit",
        flags: "arithmetik",
        comparisons: "arithmetik",
        logic: "arithmetik",
        numbers: "zahlen",
        notation: "zahlen"
      }
    }
  };

  const elements = {
    hubView: document.querySelector("#hubView"),
    startView: document.querySelector("#startView"),
    quizView: document.querySelector("#quizView"),
    resultView: document.querySelector("#resultView"),
    startForm: document.querySelector("#startForm"),
    durationBadge: document.querySelector("#durationBadge"),
    categoryGrid: document.querySelector("#categoryGrid"),
    topicShortcuts: document.querySelector("#topicShortcuts"),
    selectAllCategories: document.querySelector("#selectAllCategories"),
    clearCategories: document.querySelector("#clearCategories"),
    countSelect: document.querySelector("#countSelect"),
    difficultyMode: document.querySelector("#difficultyMode"),
    quizMode: document.querySelector("#quizMode"),
    setupNoteText: document.querySelector("#setupNoteText"),
    quizTopicLabel: document.querySelector("#quizTopicLabel"),
    currentNumber: document.querySelector("#currentNumber"),
    totalNumber: document.querySelector("#totalNumber"),
    timerCard: document.querySelector("#timerCard"),
    timerDisplay: document.querySelector("#timerDisplay"),
    progressBar: document.querySelector("#progressBar"),
    questionGrid: document.querySelector("#questionGrid"),
    answeredCount: document.querySelector("#answeredCount"),
    footerProgress: document.querySelector("#footerProgress"),
    questionCategory: document.querySelector("#questionCategory"),
    questionType: document.querySelector("#questionType"),
    questionDifficulty: document.querySelector("#questionDifficulty"),
    questionPoints: document.querySelector("#questionPoints"),
    questionPrompt: document.querySelector("#questionPrompt"),
    questionCode: document.querySelector("#questionCode"),
    questionTools: document.querySelector("#questionTools"),
    questionContent: document.querySelector("#questionContent"),
    flashcardControls: document.querySelector("#flashcardControls"),
    flashcardRevealButton: document.querySelector("#flashcardRevealButton"),
    flashcardRating: document.querySelector("#flashcardRating"),
    keyboardHint: document.querySelector("#keyboardHint"),
    tipButton: document.querySelector("#tipButton"),
    tipPanel: document.querySelector("#tipPanel"),
    unsureButton: document.querySelector("#unsureButton"),
    instantFeedback: document.querySelector("#instantFeedback"),
    prevButton: document.querySelector("#prevButton"),
    nextButton: document.querySelector("#nextButton"),
    submitButton: document.querySelector("#submitButton"),
    resultTitle: document.querySelector("#resultTitle"),
    resultSubtitle: document.querySelector("#resultSubtitle"),
    gradePoints: document.querySelector("#gradePoints"),
    primaryScoreLabel: document.querySelector("#primaryScoreLabel"),
    gradeName: document.querySelector("#gradeName"),
    scoreValue: document.querySelector("#scoreValue"),
    percentValue: document.querySelector("#percentValue"),
    correctValue: document.querySelector("#correctValue"),
    answerMetricLabel: document.querySelector("#answerMetricLabel"),
    unsureValue: document.querySelector("#unsureValue"),
    unsureCorrectValue: document.querySelector("#unsureCorrectValue"),
    uncertainMetricLabel: document.querySelector("#uncertainMetricLabel"),
    progressStorageWarning: document.querySelector("#progressStorageWarning"),
    resultTime: document.querySelector("#resultTime"),
    restartButton: document.querySelector("#restartButton"),
    repeatWrongButton: document.querySelector("#repeatWrongButton"),
    repeatLuckyButton: document.querySelector("#repeatLuckyButton"),
    toggleReviewButton: document.querySelector("#toggleReviewButton"),
    reviewSection: document.querySelector("#reviewSection"),
    reviewList: document.querySelector("#reviewList"),
    uncertainSection: document.querySelector("#uncertainSection"),
    uncertainReviewList: document.querySelector("#uncertainReviewList"),
    categoryResults: document.querySelector("#categoryResults"),
    submitDialog: document.querySelector("#submitDialog"),
    submitDialogText: document.querySelector("#submitDialogText"),
    cancelSubmitButton: document.querySelector("#cancelSubmitButton"),
    confirmSubmitButton: document.querySelector("#confirmSubmitButton"),
    subjectEyebrow: document.querySelector("#subjectEyebrow"),
    subjectTitle: document.querySelector("#subjectTitle"),
    learnGuideLink: document.querySelector("#learnGuideLink"),
    backToHubButton: document.querySelector("#backToHubButton")
  };

  let activeSubject = null;
  let activeSubjectId = null;
  let quizQuestions = [];
  let answers = new Map();
  let flashcardRatings = new Map();
  let revealedFlashcards = new Set();
  let unsureQuestions = new Set();
  let currentIndex = 0;
  let durationSeconds = MAX_DURATION_SECONDS;
  let startedAt = 0;
  let endTime = 0;
  let timerInterval = null;
  let submittedAt = 0;
  let submittedByTimer = false;

  function isFlashcardMode() {
    return elements.quizMode.value === "flashcards";
  }

  function emptySubjectProgress() {
    return {
      overall: { attempts: 0, correct: 0 },
      categories: {}
    };
  }

  function isProgressRecord(record) {
    return record
      && Number.isSafeInteger(record.attempts)
      && record.attempts >= 0
      && Number.isSafeInteger(record.correct)
      && record.correct >= 0
      && record.correct <= record.attempts;
  }

  function loadStudyProgress() {
    let stored;
    try {
      stored = window.localStorage.getItem(STUDY_PROGRESS_STORAGE_KEY);
    } catch (error) {
      throw new Error(`Lokaler Lernfortschritt konnte nicht gelesen werden: ${error.message}`);
    }
    if (!stored) return { version: 1, subjects: {} };

    let progress;
    try {
      progress = JSON.parse(stored);
    } catch (error) {
      throw new Error(`Gespeicherter Lernfortschritt ist ungültig: ${error.message}`);
    }
    if (!progress || progress.version !== 1 || !progress.subjects
      || typeof progress.subjects !== "object" || Array.isArray(progress.subjects)) {
      throw new Error("Gespeicherter Lernfortschritt hat ein unbekanntes Format.");
    }

    for (const subjectProgress of Object.values(progress.subjects)) {
      if (!subjectProgress
        || !isProgressRecord(subjectProgress.overall)
        || !subjectProgress.categories || typeof subjectProgress.categories !== "object" || Array.isArray(subjectProgress.categories)
        || !Object.values(subjectProgress.categories).every(isProgressRecord)) {
        throw new Error("Gespeicherter Lernfortschritt enthält ungültige Werte.");
      }
    }
    return progress;
  }

  function subjectProgressFrom(progress) {
    return progress.subjects[activeSubjectId] || emptySubjectProgress();
  }

  function incrementProgressRecord(records, key, correct) {
    const record = records[key] || { attempts: 0, correct: 0 };
    record.attempts++;
    if (correct) record.correct++;
    records[key] = record;
  }

  function incrementOverallProgress(record, correct) {
    record.attempts++;
    if (correct) record.correct++;
  }

  function recordStudyProgress() {
    const progress = loadStudyProgress();
    const subjectProgress = progress.subjects[activeSubjectId] || emptySubjectProgress();
    for (const question of quizQuestions) {
      if (!hasAnswer(question)) continue;
      const correct = isCorrect(question);
      incrementOverallProgress(subjectProgress.overall, correct);
      incrementProgressRecord(subjectProgress.categories, question.category, correct);
    }
    progress.subjects[activeSubjectId] = subjectProgress;
    try {
      window.localStorage.setItem(STUDY_PROGRESS_STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      throw new Error(`Lernfortschritt konnte nicht gespeichert werden: ${error.message}`);
    }
  }

  function shuffle(items) {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function selectedCategories() {
    return new Set([...elements.categoryGrid.querySelectorAll("input:checked")].map((input) => input.value));
  }

  function populateCategories() {
    elements.categoryGrid.replaceChildren();
    for (const category of activeSubject.categories) {
      const label = document.createElement("label");
      label.className = "category-chip";
      const input = document.createElement("input");
      input.type = "checkbox";
      input.value = category.id;
      input.checked = true;
      input.addEventListener("change", updateCountOptions);
      const text = document.createElement("span");
      text.textContent = category.label;
      label.append(input, text);
      elements.categoryGrid.append(label);
    }
    renderTopicShortcuts();
    updateCountOptions();
  }

  function renderTopicShortcuts() {
    elements.topicShortcuts.replaceChildren();
    const addShortcut = (id, label) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "topic-chip";
      button.dataset.category = id;
      button.textContent = label;
      button.setAttribute("aria-pressed", "true");
      button.addEventListener("click", () => {
        const inputs = [...elements.categoryGrid.querySelectorAll("input[type='checkbox']")];
        for (const input of inputs) {
          input.checked = id === "all" || input.value === id;
        }
        updateCountOptions();
        elements.startForm.scrollIntoView({ behavior: "smooth", block: "center" });
      });
      elements.topicShortcuts.append(button);
    };

    addShortcut("all", "Alle Themen");
    for (const category of activeSubject.categories) {
      addShortcut(category.id, category.label);
    }
  }

  function syncTopicShortcuts(categories) {
    for (const button of elements.topicShortcuts.querySelectorAll(".topic-chip")) {
      const selected =       button.dataset.category === "all"
        ? categories.size === activeSubject.categories.length
        : categories.has(button.dataset.category);
      button.setAttribute("aria-pressed", String(selected));
    }
  }

  function eligibleQuestions(categories) {
    const mode = elements.difficultyMode.value;
    return activeSubject.questionPool.filter((question) => {
      if (!categories.has(question.category)) return false;
      if (mode === "warmup") return question.difficulty === "leicht" || question.difficulty === "mittel";
      if (mode === "hardKnobel") return question.difficulty === "schwer" || question.difficulty === "knobel";
      return true;
    });
  }

  function updateCountOptions() {
    const categories = selectedCategories();
    const eligibleCount = eligibleQuestions(categories).length;
    const previousCount = Number(elements.countSelect.value) || 25;
    const mode = elements.quizMode.value;
    const choices = [90, 75, 60, 50, 40, 30, 25, 20, 15, 10].filter((count) => count <= eligibleCount);
    if (eligibleCount > 0 && !choices.includes(eligibleCount)) choices.unshift(eligibleCount);

    let adaptiveStorageError = "";
    if (mode === "adaptive") {
      try {
        loadStudyProgress();
      } catch (error) {
        console.error("Adaptiver Modus kann den Lernfortschritt nicht lesen.", error);
        adaptiveStorageError = "Der adaptive Modus benötigt lesbaren lokalen Lernfortschritt. Prüfe den Browserspeicher oder lösche den Quiz-Fortschritt.";
      }
    }

    elements.countSelect.replaceChildren();
    for (const count of choices) {
      const option = document.createElement("option");
      option.value = String(count);
      const duration = durationSecondsForMode(count, mode);
      option.textContent = duration
        ? `${count} Aufgaben · ${Math.ceil(duration / 60)} min`
        : `${count} Aufgaben · ohne Zeitlimit`;
      elements.countSelect.append(option);
    }
    elements.countSelect.disabled = eligibleCount === 0;
    elements.startForm.querySelector("button[type='submit']").disabled = eligibleCount === 0 || Boolean(adaptiveStorageError);
    elements.durationBadge.textContent = mode === "flashcards"
      ? "ohne Zeitlimit"
      : mode === "strict" ? "90 min" : "max. 90 min";
    if (choices.length) {
      elements.countSelect.value = String(choices.includes(previousCount) ? previousCount : choices[0]);
    }
    const modeDescriptions = {
      exam: "2 min pro Aufgabe, maximal 90 min · Feedback am Ende.",
      learning: "2 min pro Aufgabe, maximal 90 min · Sofort-Feedback.",
      flashcards: "Ohne Zeitlimit · Lösung aufdecken und selbst einschätzen.",
      adaptive: "2 min pro Aufgabe, maximal 90 min · Sofort-Feedback, Schwächen zuerst, Schwierigkeit steigt schrittweise; Lernfortschritt bleibt lokal gespeichert.",
      strict: "Feste Gesamtzeit von 90 min · keine Tipps, Feedback erst nach Abgabe."
    };
    elements.setupNoteText.textContent = adaptiveStorageError || (eligibleCount
      ? `${categories.size} Kategorien ausgewählt · ${eligibleCount} Aufgaben im Pool. ${modeDescriptions[mode]}`
      : categories.size
        ? "Für diese Kombination aus Kategorien und Schwierigkeitsgrad sind keine Aufgaben vorhanden."
        : "Wähle mindestens eine Kategorie aus, um ein Quiz zu starten.");
    syncTopicShortcuts(categories);
  }

  function durationSecondsForQuestionCount(count) {
    return Math.min(MAX_DURATION_SECONDS, Math.ceil(count * SECONDS_PER_QUESTION));
  }

  function durationSecondsForMode(count, mode = elements.quizMode.value) {
    if (mode === "flashcards") return 0;
    if (mode === "strict") return MAX_DURATION_SECONDS;
    return durationSecondsForQuestionCount(count);
  }

  function chooseQuestions(categories, requestedCount) {
    const eligible = eligibleQuestions(categories);
    const count = Math.min(requestedCount, eligible.length);
    const selected = [];
    const selectedIds = new Set();
    const addQuestion = (question) => {
      if (question && selected.length < count && !selectedIds.has(question.id)) {
        selected.push(question);
        selectedIds.add(question.id);
      }
    };
    const challenging = ["challenging", "hardKnobel"].includes(elements.difficultyMode.value);
    const weightedShuffle = (questions) => shuffle(questions).sort((a, b) => {
      const aWeight = DIFFICULTY_RANK[a.difficulty] + (a.code ? 1 : 0);
      const bWeight = DIFFICULTY_RANK[b.difficulty] + (b.code ? 1 : 0);
      return challenging ? bWeight - aWeight : aWeight - bWeight;
    });

    for (const difficulty of Object.keys(DIFFICULTY_RANK)) {
      const candidate = weightedShuffle(eligible.filter((question) => question.difficulty === difficulty))[0];
      addQuestion(candidate);
    }

    const categoriesInPool = [...new Set(eligible.map((question) => question.category))];
    for (const category of shuffle(categoriesInPool)) {
      const candidate = weightedShuffle(eligible.filter((question) => question.category === category))[0];
      addQuestion(candidate);
    }

    const remaining = weightedShuffle(eligible.filter((question) => !selectedIds.has(question.id)));
    selected.push(...remaining.slice(0, count - selected.length));
    return shuffle(selected);
  }

  function chooseAdaptiveQuestions(categories, requestedCount, progress) {
    const remaining = eligibleQuestions(categories);
    const count = Math.min(requestedCount, remaining.length);
    const subjectProgress = subjectProgressFrom(progress);
    const overallAccuracy = subjectProgress.overall.attempts
      ? subjectProgress.overall.correct / subjectProgress.overall.attempts
      : 0;
    const availableRanks = remaining.map((question) => DIFFICULTY_RANK[question.difficulty]);
    const minRank = Math.min(...availableRanks);
    const maxRank = Math.max(...availableRanks);
    const startingRank = overallAccuracy >= 0.85 ? 2 : overallAccuracy >= 0.65 ? 1 : 0;
    const selected = [];

    while (selected.length < count) {
      const targetRank = Math.max(minRank, Math.min(maxRank, startingRank + Math.floor(selected.length / 5)));
      const weights = remaining.map((question) => {
        const categoryProgress = subjectProgress.categories[question.category];
        const accuracy = categoryProgress
          ? (categoryProgress.correct + 1) / (categoryProgress.attempts + 2)
          : 0.5;
        const topicWeight = 0.6 + (1 - accuracy) * 1.8;
        const difficultyDistance = Math.abs(DIFFICULTY_RANK[question.difficulty] - targetRank);
        return topicWeight / (1 + difficultyDistance * 0.75);
      });
      const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
      let selection = Math.random() * totalWeight;
      let selectedIndex = weights.length - 1;
      for (let index = 0; index < weights.length; index++) {
        selection -= weights[index];
        if (selection < 0) {
          selectedIndex = index;
          break;
        }
      }
      selected.push(remaining.splice(selectedIndex, 1)[0]);
    }
    return selected;
  }
  function mixQuestionOptions(question) {
    if (question.type === "cloze") return question;

    const optionOrder = shuffle(question.options.map((_, index) => index));
    const correct = question.type === "multiple"
      ? optionOrder.reduce((indices, originalIndex, displayIndex) => {
        if (question.correct.includes(originalIndex)) indices.push(displayIndex);
        return indices;
      }, [])
      : optionOrder.indexOf(question.correct);

    return {
      ...question,
      options: optionOrder.map((index) => question.options[index]),
      correct
    };
  }

  function beginQuiz(questions, title) {
    quizQuestions = questions.map(mixQuestionOptions);
    if (quizQuestions.length === 0) return;

    answers = new Map();
    flashcardRatings = new Map();
    revealedFlashcards = new Set();
    unsureQuestions = new Set();
    currentIndex = 0;
    submittedAt = 0;
    submittedByTimer = false;
    durationSeconds = durationSecondsForMode(quizQuestions.length);
    startedAt = Date.now();
    endTime = durationSeconds ? startedAt + durationSeconds * 1000 : 0;
    elements.quizTopicLabel.textContent = title;
    elements.totalNumber.textContent = String(quizQuestions.length);
    elements.resultView.hidden = true;
    elements.startView.hidden = true;
    elements.quizView.hidden = false;
    elements.timerCard.hidden = durationSeconds === 0;
    elements.timerDisplay.textContent = durationSeconds ? formatDuration(durationSeconds).replace(" min", "") : "--:--";
    elements.timerCard.classList.remove("is-low");

    renderQuestionGrid();
    renderQuestion();
    updateProgress();
    window.clearInterval(timerInterval);
    timerInterval = null;
    if (durationSeconds) {
      updateTimer();
      timerInterval = window.setInterval(updateTimer, 250);
    }
  }

  function selectSubject(subjectId) {
    activeSubjectId = subjectId;
    activeSubject = subjects[subjectId];
    document.body.classList.remove("theme-informatik", "theme-dvt", "theme-mathe", "theme-stochastik");
    document.body.classList.add(`theme-${subjectId}`);
    elements.subjectEyebrow.textContent = activeSubject.eyebrow;
    elements.subjectTitle.textContent = `${activeSubject.title}-Quiz einrichten`;
    elements.learnGuideLink.href = activeSubject.learnPage;
    elements.learnGuideLink.hidden = false;
    elements.backToHubButton.hidden = false;
    elements.hubView.hidden = true;
    elements.startView.hidden = false;
    elements.quizView.hidden = true;
    elements.resultView.hidden = true;
    populateCategories();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetToHub() {
    window.clearInterval(timerInterval);
    timerInterval = null;
    if (elements.submitDialog.open) elements.submitDialog.close();
    quizQuestions = [];
    answers = new Map();
    flashcardRatings = new Map();
    revealedFlashcards = new Set();
    unsureQuestions = new Set();
    currentIndex = 0;
    durationSeconds = MAX_DURATION_SECONDS;
    startedAt = 0;
    endTime = 0;
    submittedAt = 0;
    submittedByTimer = false;
    elements.timerDisplay.textContent = "90:00";
    elements.timerCard.classList.remove("is-low");
    elements.progressBar.style.width = "0%";
    elements.categoryGrid.replaceChildren();
    elements.topicShortcuts.replaceChildren();
    document.body.classList.remove("theme-informatik", "theme-dvt", "theme-mathe", "theme-stochastik");
    activeSubject = null;
    activeSubjectId = null;
    elements.timerCard.hidden = false;
    elements.learnGuideLink.hidden = true;
    elements.backToHubButton.hidden = true;
    elements.hubView.hidden = false;
    elements.startView.hidden = true;
    elements.quizView.hidden = true;
    elements.resultView.hidden = true;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function startQuiz(event) {
    event.preventDefault();
    const categories = selectedCategories();
    const requestedCount = Number(elements.countSelect.value);
    if (categories.size === 0) {
      window.alert("Wähle mindestens eine Kategorie aus.");
      return;
    }
    let questions;
    if (elements.quizMode.value === "adaptive") {
      try {
        questions = chooseAdaptiveQuestions(categories, requestedCount, loadStudyProgress());
      } catch (error) {
        console.error("Adaptiver Modus kann nicht gestartet werden.", error);
        elements.setupNoteText.textContent = "Der adaptive Modus kann den lokalen Lernfortschritt nicht lesen. Prüfe den Browserspeicher oder lösche den Quiz-Fortschritt.";
        return;
      }
    } else {
      questions = chooseQuestions(categories, requestedCount);
    }
    if (questions.length === 0) {
      window.alert("Für diesen Themenbereich sind keine Aufgaben vorhanden.");
      return;
    }

    const titles = {
      exam: "Klausurmodus · Feedback am Ende",
      learning: "Lernmodus · Sofort-Feedback",
      flashcards: "Karteikartenmodus · Selbsteinschätzung",
      adaptive: "Adaptiver Lernmodus · Schwächen zuerst",
      strict: "Strenge Prüfungssimulation · 90 min"
    };
    const title = titles[elements.quizMode.value];
    beginQuiz(questions, title);
  }

  function startRepeatQuiz(kind) {
    const retryQuestions = quizQuestions.filter((question) => {
      if (kind === "wrong") return hasAttempt(question) && !isCorrect(question);
      return unsureQuestions.has(question.id) && isCorrect(question);
    });
    if (!retryQuestions.length) return;
    const title = kind === "wrong"
      ? "Wiederholung · falsch beantwortet"
      : "Wiederholung · unsicher, aber richtig";
    beginQuiz(retryQuestions, title);
  }

  function currentQuestion() {
    return quizQuestions[currentIndex];
  }

  function hasAnswer(question) {
    if (isFlashcardMode()) return flashcardRatings.has(question.id);
    const answer = answers.get(question.id);
    if (question.type === "single") return Number.isInteger(answer);
    if (question.type === "multiple") return Array.isArray(answer) && answer.length > 0;
    return Array.isArray(answer) && answer.length === question.blanks.length && answer.every(Boolean);
  }

  function hasAttempt(question) {
    if (isFlashcardMode()) return flashcardRatings.has(question.id);
    const answer = answers.get(question.id);
    if (question.type === "single") return Number.isInteger(answer);
    if (question.type === "multiple") return Array.isArray(answer) && answer.length > 0;
    return Array.isArray(answer) && answer.some(Boolean);
  }

  function renderQuestionGrid() {
    elements.questionGrid.replaceChildren();
    quizQuestions.forEach((question, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "question-nav-button";
      button.textContent = String(index + 1);
      button.setAttribute("aria-label", `Zu Aufgabe ${index + 1} wechseln`);
      button.addEventListener("click", () => {
        currentIndex = index;
        renderQuestion();
      });
      elements.questionGrid.append(button);
    });
    updateQuestionGrid();
  }

  function renderQuestion() {
    const question = currentQuestion();
    if (!question) return;
    const flashcardMode = isFlashcardMode();
    const strictMode = elements.quizMode.value === "strict";

    elements.currentNumber.textContent = String(currentIndex + 1);
    const category = activeSubject.categories.find((entry) => entry.id === question.category);
    elements.questionCategory.textContent = category ? category.label : question.category;
    elements.questionType.textContent = {
      single: "Einfachauswahl",
      multiple: "Mehrfachauswahl",
      cloze: "Lückentext · Auswahl"
    }[question.type];
    elements.questionDifficulty.textContent = {
      leicht: "Leicht",
      mittel: "Mittel",
      schwer: "Schwer",
      knobel: "Knobel / Klausurniveau"
    }[question.difficulty];
    elements.questionDifficulty.dataset.level = question.difficulty;
    elements.questionPoints.textContent = `${question.points} ${question.points === 1 ? "Punkt" : "Punkte"}`;
    elements.questionPrompt.textContent = question.type === "cloze"
      ? flashcardMode ? question.prompt.replace(/{{\d+}}/g, "_____") : "Ergänze die Lücken."
      : question.prompt;
    elements.questionContent.replaceChildren();
    elements.tipPanel.textContent = question.tip;
    elements.tipPanel.hidden = true;
    elements.tipButton.setAttribute("aria-expanded", "false");
    elements.tipButton.textContent = "Tipp anzeigen";
    elements.unsureButton.setAttribute("aria-pressed", String(unsureQuestions.has(question.id)));
    elements.unsureButton.classList.toggle("is-marked", unsureQuestions.has(question.id));
    elements.unsureButton.textContent = unsureQuestions.has(question.id)
      ? "◆ Unsicher markiert"
      : "◇ Unsicher / später prüfen";
    elements.instantFeedback.hidden = true;
    elements.instantFeedback.replaceChildren();
    elements.questionTools.hidden = flashcardMode;
    elements.tipButton.hidden = strictMode;
    elements.unsureButton.hidden = flashcardMode;
    elements.flashcardControls.hidden = !flashcardMode;
    elements.keyboardHint.hidden = flashcardMode;
    elements.keyboardHint.textContent = strictMode
      ? "Tastatur: 1–7 Antwort wählen/umschalten · ←/→ oder P/N zurück/weiter · Pos1/Ende zur ersten/letzten Aufgabe · U unsicher markieren · Strg/⌘+Enter öffnet den Abgabe-Dialog · Tipps sind deaktiviert"
      : "Tastatur: 1–7 Antwort wählen/umschalten · ←/→ oder P/N zurück/weiter · Pos1/Ende zur ersten/letzten Aufgabe · T Tipp · U unsicher markieren · Esc Tipp schließen · Strg/⌘+Enter öffnet den Abgabe-Dialog (ohne Eingabefeld-Fokus)";
    const revealed = flashcardMode && revealedFlashcards.has(question.id);
    elements.flashcardRevealButton.hidden = revealed;
    elements.flashcardRating.hidden = !revealed;
    for (const button of elements.flashcardRating.querySelectorAll("[data-flashcard-rating]")) {
      button.setAttribute("aria-pressed", String(flashcardRatings.get(question.id) === button.dataset.flashcardRating));
    }

    if (question.code) {
      elements.questionCode.hidden = false;
      elements.questionCode.querySelector("code").textContent = question.code;
    } else {
      elements.questionCode.hidden = true;
      elements.questionCode.querySelector("code").textContent = "";
    }

    if (flashcardMode) {
      if (revealed) renderFlashcardAnswer(question);
    } else if (question.type === "cloze") {
      renderCloze(question);
    } else {
      renderChoiceQuestion(question);
    }

    elements.prevButton.disabled = currentIndex === 0;
    elements.nextButton.textContent = currentIndex === quizQuestions.length - 1 ? "Zur Auswertung →" : "Weiter →";
    updateQuestionGrid();
    updateProgress();
    renderInstantFeedback();
  }

  function renderFlashcardAnswer(question) {
    const answer = document.createElement("div");
    answer.className = "flashcard-answer";
    const heading = document.createElement("strong");
    heading.textContent = "Lösung";
    const answerText = document.createElement("p");
    answerText.textContent = correctAnswerText(question);
    const explanation = document.createElement("p");
    explanation.textContent = question.explanation;
    answer.append(heading, answerText, explanation);
    if (question.trap) {
      const trap = document.createElement("p");
      trap.textContent = `Typische Falle: ${question.trap}`;
      answer.append(trap);
    }
    elements.questionContent.append(answer);
  }

  function renderChoiceQuestion(question) {
    const savedAnswer = answers.get(question.id);
    const inputType = question.type === "single" ? "radio" : "checkbox";
    const helper = document.createElement("p");
    helper.className = "choice-helper";
    helper.textContent = question.type === "multiple"
      ? "Wähle alle zutreffenden Antworten aus."
      : "Wähle genau eine Antwort aus.";
    elements.questionContent.append(helper);

    question.options.forEach((option, index) => {
      const label = document.createElement("label");
      label.className = "answer-option";
      const input = document.createElement("input");
      input.type = inputType;
      input.name = `answer-${question.id}`;
      input.value = String(index);
      if (question.type === "single") {
        input.checked = savedAnswer === index;
      } else {
        input.checked = Array.isArray(savedAnswer) && savedAnswer.includes(index);
      }

      input.addEventListener("change", () => {
        if (question.type === "single") {
          answers.set(question.id, index);
        } else {
          const selected = new Set(answers.get(question.id) || []);
          if (input.checked) selected.add(index);
          else selected.delete(index);
          answers.set(question.id, [...selected].sort((a, b) => a - b));
        }
        updateProgress();
        renderInstantFeedback();
      });

      const letter = document.createElement("span");
      letter.className = "option-letter";
      letter.textContent = String.fromCharCode(65 + index);
      const text = document.createElement("span");
      text.className = "option-text";
      text.textContent = option;
      label.append(input, letter, text);
      elements.questionContent.append(label);
    });
  }

  function renderCloze(question) {
    const saved = answers.get(question.id) || [];
    const line = document.createElement("div");
    line.className = "cloze-line";
    const parts = question.prompt.split(/{{(\d+)}}/g);
    parts.forEach((part, index) => {
      if (index % 2 === 0) {
        line.append(document.createTextNode(part));
        return;
      }
      const blankIndex = Number(part);
      const select = document.createElement("select");
      select.className = "cloze-select";
      select.setAttribute("aria-label", `Lücke ${blankIndex + 1}`);
      const placeholder = document.createElement("option");
      placeholder.value = "";
      placeholder.textContent = "Auswählen";
      select.append(placeholder);
      for (const value of question.blanks[blankIndex].options) {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        select.append(option);
      }
      select.value = saved[blankIndex] || "";
      select.addEventListener("change", () => {
        const current = [...(answers.get(question.id) || Array(question.blanks.length).fill(""))];
        current[blankIndex] = select.value;
        answers.set(question.id, current);
        updateProgress();
        renderInstantFeedback();
      });
      line.append(select);
    });
    elements.questionContent.append(line);
  }

  function updateQuestionGrid() {
    [...elements.questionGrid.children].forEach((button, index) => {
      const question = quizQuestions[index];
      button.classList.toggle("is-current", index === currentIndex);
      button.classList.toggle("is-answered", hasAnswer(question));
      button.classList.toggle("is-uncertain", unsureQuestions.has(question.id));
      button.setAttribute("aria-current", index === currentIndex ? "step" : "false");
    });
  }

  function updateProgress() {
    const answered = quizQuestions.filter(hasAnswer).length;
    const total = quizQuestions.length;
    elements.answeredCount.textContent = `${answered} beantwortet`;
    elements.footerProgress.textContent = `${answered} von ${total} beantwortet`;
    elements.progressBar.style.width = `${total ? (answered / total) * 100 : 0}%`;
    updateQuestionGrid();
  }

  function updateTimer() {
    if (!durationSeconds) return;
    const seconds = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
    const minutes = Math.floor(seconds / 60);
    const remainder = seconds % 60;
    elements.timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
    elements.timerCard.classList.toggle("is-low", seconds <= 5 * 60);
    if (seconds === 0) submitQuiz(true);
  }

  function isCorrect(question) {
    if (isFlashcardMode()) return flashcardRatings.get(question.id) === "known";
    const answer = answers.get(question.id);
    if (question.type === "single") return answer === question.correct;
    if (question.type === "multiple") {
      if (!Array.isArray(answer)) return false;
      const actual = [...answer].sort((a, b) => a - b);
      const expected = [...question.correct].sort((a, b) => a - b);
      return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
    }
    return Array.isArray(answer)
      && answer.length === question.blanks.length
      && answer.every((value, index) => value === question.blanks[index].correct);
  }

  function renderInstantFeedback() {
    const question = currentQuestion();
    const learningMode = ["learning", "adaptive"].includes(elements.quizMode.value);
    if (!learningMode || !question || !hasAnswer(question)) {
      elements.instantFeedback.hidden = true;
      return;
    }

    const correct = isCorrect(question);
    elements.instantFeedback.className = `instant-feedback ${correct ? "is-correct" : "is-wrong"}`;
    const heading = document.createElement("strong");
    heading.textContent = correct ? "Richtig" : "Noch nicht richtig";
    const explanation = document.createElement("p");
    explanation.textContent = question.explanation;
    const trap = document.createElement("p");
    trap.textContent = `Typische Falle: ${question.trap}`;
    elements.instantFeedback.replaceChildren(heading, explanation, trap);
    elements.instantFeedback.hidden = false;
  }

  function thresholdsForMaximum(maximum) {
    const keys = [...GRADE_THRESHOLDS.keys()].sort((a, b) => a - b);
    if (GRADE_THRESHOLDS.has(maximum)) return GRADE_THRESHOLDS.get(maximum);

    if (maximum < keys[0]) {
      return null;
    }
    if (maximum > keys[keys.length - 1]) {
      return GRADE_THRESHOLDS.get(keys[keys.length - 1]).map((threshold) =>
        Math.ceil((threshold / keys[keys.length - 1]) * maximum)
      );
    }

    const lower = keys.filter((key) => key < maximum).pop();
    const upper = keys.find((key) => key > maximum);
    const lowRow = GRADE_THRESHOLDS.get(lower);
    const highRow = GRADE_THRESHOLDS.get(upper);
    const ratio = (maximum - lower) / (upper - lower);
    // Interpolated thresholds are minimum whole-point scores, so round them up.
    return lowRow.map((value, index) => Math.ceil(value + (highRow[index] - value) * ratio));
  }

  function calculateGrade(score, maximum) {
    const thresholds = thresholdsForMaximum(maximum);
    if (!thresholds) return null;
    for (let index = 0; index < thresholds.length; index++) {
      if (score >= thresholds[index]) return 15 - index;
    }
    return thresholds.length === 15 ? 0 : null;
  }

  function submitQuiz(byTimer = false) {
    if (elements.quizView.hidden) return;
    submittedByTimer = byTimer || (durationSeconds > 0 && Date.now() >= endTime);
    if (elements.submitDialog.open) elements.submitDialog.close();
    submittedAt = Date.now();
    window.clearInterval(timerInterval);
    showResults();
  }

  function openSubmitDialog() {
    const unanswered = quizQuestions.filter((question) => !hasAnswer(question)).length;
    elements.submitDialogText.textContent = unanswered
      ? `Du hast noch ${unanswered} ${unanswered === 1 ? "Aufgabe" : "Aufgaben"} unbeantwortet. Möchtest du trotzdem abgeben?`
      : "Deine Antworten werden jetzt ausgewertet.";
    elements.submitDialog.showModal();
  }

  function showResults() {
    const flashcardMode = isFlashcardMode();
    const correctCount = quizQuestions.filter(isCorrect).length;
    const maximum = quizQuestions.reduce((sum, question) => sum + question.points, 0);
    const score = quizQuestions.reduce((sum, question) =>
      sum + (isCorrect(question) ? question.points : 0), 0);
    const percentage = maximum ? (score / maximum) * 100 : 0;
    const grade = calculateGrade(score, maximum);
    const gradeDescription = grade === null ? null : gradeDescriptions[grade];
    const unansweredCount = quizQuestions.filter((question) => !hasAnswer(question)).length;
    const unsureCount = unsureQuestions.size;
    const unsureCorrectCount = quizQuestions.filter((question) =>
      unsureQuestions.has(question.id) && isCorrect(question)
    ).length;
    const elapsedSeconds = durationSeconds
      ? Math.min(durationSeconds, Math.max(0, Math.floor((submittedAt - startedAt) / 1000)))
      : 0;
    const wrongCount = quizQuestions.filter((question) => hasAttempt(question) && !isCorrect(question)).length;
    const unsureCorrectCountForRetry = quizQuestions.filter((question) =>
      unsureQuestions.has(question.id) && isCorrect(question)
    ).length;

    elements.progressStorageWarning.hidden = true;
    elements.progressStorageWarning.textContent = "";
    try {
      recordStudyProgress();
    } catch (error) {
      console.error("Quiz-Lernfortschritt konnte nicht gespeichert werden.", error);
      elements.progressStorageWarning.textContent = "Der Lernfortschritt konnte nicht lokal gespeichert werden. Der adaptive Modus kann deine Ergebnisse daher nicht für spätere Quizze berücksichtigen.";
      elements.progressStorageWarning.hidden = false;
    }

    elements.quizView.hidden = true;
    elements.resultView.hidden = false;
    elements.resultTitle.textContent = submittedByTimer
      ? "Zeit abgelaufen"
      : flashcardMode ? "Karteikartenrunde abgeschlossen" : "Quiz abgeschlossen";
    elements.resultSubtitle.textContent = flashcardMode
      ? "Deine Gewusst-/Noch-üben-Markierungen bilden die Selbsteinschätzung dieser Runde."
      : submittedByTimer
        ? "Die verfügbare Bearbeitungszeit ist abgelaufen. Deine Antworten wurden automatisch ausgewertet."
        : "Deine Antworten wurden automatisch ausgewertet.";
    elements.primaryScoreLabel.textContent = flashcardMode ? "Gewusst" : "Notenpunkte";
    elements.gradePoints.textContent = flashcardMode ? String(correctCount) : grade === null ? "–" : String(grade);
    elements.gradeName.textContent = flashcardMode
      ? `${correctCount} von ${quizQuestions.length} Karten`
      : gradeDescription
        ? `${gradeDescription[0]} · ${gradeDescription[1]}${GRADE_THRESHOLDS.has(maximum) ? "" : " · näherungsweise"}`
        : "Notenmaßstab für diese Punktzahl nicht vollständig";
    elements.scoreValue.textContent = flashcardMode
      ? `${correctCount} / ${quizQuestions.length}`
      : `${Number(score.toFixed(2))} / ${maximum}`;
    elements.percentValue.textContent = flashcardMode
      ? "selbst eingeschätzt"
      : `${percentage.toFixed(1).replace(".", ",")} %`;
    elements.answerMetricLabel.textContent = flashcardMode ? "Noch üben" : "Richtige Antworten";
    elements.correctValue.textContent = flashcardMode
      ? String(wrongCount)
      : `${correctCount} / ${quizQuestions.length}`;
    elements.uncertainMetricLabel.textContent = flashcardMode ? "Noch zu bewerten" : "Unsicher markiert";
    elements.unsureValue.textContent = flashcardMode ? String(unansweredCount) : String(unsureCount);
    elements.unsureCorrectValue.textContent = flashcardMode
      ? `${unansweredCount} nicht bewertet`
      : `${unsureCorrectCount} davon richtig · mögliche Glückstreffer`;
    elements.resultTime.textContent = flashcardMode
      ? "Ohne Zeitlimit"
      : submittedByTimer
        ? `Zeitlimit erreicht · ${formatDuration(durationSeconds)}`
        : `Bearbeitungszeit: ${formatDuration(elapsedSeconds)}`;
    elements.repeatWrongButton.disabled = wrongCount === 0;
    elements.repeatWrongButton.textContent = wrongCount
      ? `Falsche Antworten wiederholen (${wrongCount})`
      : "Keine falschen Antworten";
    elements.repeatLuckyButton.disabled = unsureCorrectCountForRetry === 0;
    elements.repeatLuckyButton.textContent = unsureCorrectCountForRetry
      ? `Unsichere richtige Antworten wiederholen (${unsureCorrectCountForRetry})`
      : "Keine unsicheren richtigen Antworten";
    renderCategoryResults();
    renderReview();
    elements.reviewSection.hidden = true;
    elements.toggleReviewButton.textContent = "Lösungen ansehen";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderCategoryResults() {
    const scores = new Map();
    for (const question of quizQuestions) {
      if (isFlashcardMode() && !hasAnswer(question)) continue;
      const current = scores.get(question.category) || {
        correct: 0,
        total: 0,
        earnedPoints: 0,
        maxPoints: 0
      };
      current.total++;
      current.maxPoints += question.points;
      if (isCorrect(question)) {
        current.correct++;
        current.earnedPoints += question.points;
      }
      scores.set(question.category, current);
    }

    elements.categoryResults.replaceChildren();
    const formatPoints = (points) => points.toLocaleString("de-DE", { maximumFractionDigits: 2 });
    for (const category of activeSubject.categories) {
      const score = scores.get(category.id);
      if (!score) continue;

      const percentage = Math.round((score.correct / score.total) * 100);
      const row = document.createElement("article");
      row.className = "category-result";
      const header = document.createElement("div");
      header.className = "category-result-header";
      const link = document.createElement("a");
      const anchor = activeSubject.categoryLearnAnchors[category.id] || "architektur";
      link.href = `${activeSubject.learnPage}#${anchor}`;
      link.textContent = category.label;
      const value = document.createElement("span");
      value.textContent = `${score.correct}/${score.total} Aufgaben · ${percentage}% · ${formatPoints(score.earnedPoints)}/${formatPoints(score.maxPoints)} Punkte`;
      const meter = document.createElement("div");
      meter.className = "category-result-meter";
      meter.setAttribute("role", "meter");
      meter.setAttribute("aria-label", `Trefferquote ${category.label}`);
      meter.setAttribute("aria-valuemin", "0");
      meter.setAttribute("aria-valuemax", "100");
      meter.setAttribute("aria-valuenow", String(percentage));
      const fill = document.createElement("span");
      fill.style.width = `${percentage}%`;
      meter.append(fill);
      header.append(link, value);
      row.append(header, meter);
      elements.categoryResults.append(row);
    }
  }

  function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainder = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")} min`;
  }

  function formatAnswer(question, answer) {
    if (isFlashcardMode()) {
      const rating = flashcardRatings.get(question.id);
      return rating === "known"
        ? "Selbsteinschätzung: Gewusst"
        : rating === "review" ? "Selbsteinschätzung: Noch üben" : "Nicht bewertet";
    }
    if (question.type === "single") {
      return Number.isInteger(answer) ? question.options[answer] : "Keine Antwort";
    }
    if (question.type === "multiple") {
      return Array.isArray(answer) && answer.length
        ? answer.map((index) => question.options[index]).join("; ")
        : "Keine Antwort";
    }
    return Array.isArray(answer) && answer.some(Boolean)
      ? answer.map((value, index) => `${index + 1}: ${value || "leer"}`).join(" · ")
      : "Keine Antwort";
  }

  function correctAnswerText(question) {
    if (question.type === "single") return question.options[question.correct];
    if (question.type === "multiple") return question.correct.map((index) => question.options[index]).join("; ");
    return question.blanks.map((blank, index) => `${index + 1}: ${blank.correct}`).join(" · ");
  }

  function renderReview() {
    elements.reviewList.replaceChildren();
    elements.uncertainReviewList.replaceChildren();
    const uncertainQuestions = quizQuestions.filter((question) => unsureQuestions.has(question.id));
    elements.uncertainSection.hidden = uncertainQuestions.length === 0;
    quizQuestions.forEach((question, index) => {
      const correct = isCorrect(question);
      const card = document.createElement("article");
      card.className = `review-card ${correct ? "is-correct" : "is-wrong"}`;
      if (unsureQuestions.has(question.id)) card.classList.add("is-uncertain");
      const title = document.createElement("h3");
      title.textContent = `${index + 1}. ${question.prompt.replace(/{{\d+}}/g, "_____")}`;
      const status = document.createElement("div");
      status.className = "review-status";
      if (isFlashcardMode()) {
        const rating = flashcardRatings.get(question.id);
        status.textContent = rating === "known"
          ? "Selbsteinschätzung: Gewusst"
          : rating === "review" ? "Selbsteinschätzung: Noch üben" : "Nicht bewertet";
      } else {
        status.textContent = correct
          ? `Richtig · ${question.points} ${question.points === 1 ? "Punkt" : "Punkte"}`
          : "Nicht richtig · 0 Punkte";
      }
      if (unsureQuestions.has(question.id)) status.textContent += " · unsicher markiert";
      card.append(title, status);
      if (question.code) {
        const code = document.createElement("pre");
        code.className = "review-code";
        code.textContent = question.code;
        card.append(code);
      }
      const userAnswer = document.createElement("p");
      userAnswer.className = "review-answer";
      userAnswer.textContent = `Deine Antwort: ${formatAnswer(question, answers.get(question.id))}`;
      const expected = document.createElement("p");
      expected.className = "review-answer";
      expected.textContent = `Richtig: ${correctAnswerText(question)}`;
      const explanation = document.createElement("p");
      explanation.className = "review-explanation";
      explanation.textContent = question.explanation;
      card.append(userAnswer, expected, explanation);
      elements.reviewList.append(card.cloneNode(true));
      if (unsureQuestions.has(question.id)) elements.uncertainReviewList.append(card);
    });
  }

  elements.startForm.addEventListener("submit", startQuiz);
  document.querySelectorAll("[data-subject]").forEach((button) => {
    button.addEventListener("click", () => selectSubject(button.dataset.subject));
  });
  document.querySelectorAll("[data-back-to-hub]").forEach((button) => {
    button.addEventListener("click", resetToHub);
  });
  elements.backToHubButton.addEventListener("click", resetToHub);
  elements.difficultyMode.addEventListener("change", updateCountOptions);
  elements.quizMode.addEventListener("change", updateCountOptions);
  elements.selectAllCategories.addEventListener("click", () => {
    elements.categoryGrid.querySelectorAll("input[type='checkbox']").forEach((input) => { input.checked = true; });
    updateCountOptions();
  });
  elements.clearCategories.addEventListener("click", () => {
    elements.categoryGrid.querySelectorAll("input[type='checkbox']").forEach((input) => { input.checked = false; });
    updateCountOptions();
  });
  elements.tipButton.addEventListener("click", () => {
    elements.tipPanel.hidden = !elements.tipPanel.hidden;
    elements.tipButton.setAttribute("aria-expanded", String(!elements.tipPanel.hidden));
    elements.tipButton.textContent = elements.tipPanel.hidden ? "Tipp anzeigen" : "Tipp ausblenden";
  });
  elements.flashcardRevealButton.addEventListener("click", () => {
    const question = currentQuestion();
    if (!question) return;
    revealedFlashcards.add(question.id);
    renderQuestion();
  });
  elements.flashcardRating.addEventListener("click", (event) => {
    const button = event.target instanceof Element
      ? event.target.closest("[data-flashcard-rating]")
      : null;
    const question = currentQuestion();
    if (!button || !question || !revealedFlashcards.has(question.id)) return;
    flashcardRatings.set(question.id, button.dataset.flashcardRating);
    renderQuestion();
  });
  elements.unsureButton.addEventListener("click", () => {
    const question = currentQuestion();
    if (!question) return;
    if (unsureQuestions.has(question.id)) unsureQuestions.delete(question.id);
    else unsureQuestions.add(question.id);
    renderQuestion();
  });
  elements.prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      renderQuestion();
    }
  });
  elements.nextButton.addEventListener("click", () => {
    if (currentIndex < quizQuestions.length - 1) {
      currentIndex++;
      renderQuestion();
    } else {
      const unanswered = quizQuestions.filter((question) => !hasAnswer(question)).length;
      if (unanswered) {
        const firstUnanswered = quizQuestions.findIndex((question) => !hasAnswer(question));
        if (window.confirm(`${unanswered} Aufgabe(n) sind noch unbeantwortet. Zur ersten offenen Aufgabe wechseln?`)) {
          currentIndex = firstUnanswered;
          renderQuestion();
        }
      } else {
        elements.submitButton.focus();
      }
    }
  });
  elements.submitButton.addEventListener("click", openSubmitDialog);
  elements.cancelSubmitButton.addEventListener("click", () => elements.submitDialog.close());
  elements.confirmSubmitButton.addEventListener("click", (event) => {
    event.preventDefault();
    elements.submitDialog.close();
    submitQuiz(false);
  });
  elements.restartButton.addEventListener("click", () => {
    elements.resultView.hidden = true;
    elements.startView.hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  elements.repeatWrongButton.addEventListener("click", () => startRepeatQuiz("wrong"));
  elements.repeatLuckyButton.addEventListener("click", () => startRepeatQuiz("lucky"));
  elements.toggleReviewButton.addEventListener("click", () => {
    elements.reviewSection.hidden = !elements.reviewSection.hidden;
    elements.toggleReviewButton.textContent = elements.reviewSection.hidden ? "Lösungen ansehen" : "Lösungen ausblenden";
    if (!elements.reviewSection.hidden) elements.reviewSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.addEventListener("keydown", (event) => {
    if (elements.quizView.hidden || event.altKey || event.isComposing) return;
    if (elements.submitDialog.open || event.key === "Tab") return;
    const targetIsEditable = event.target instanceof Element
      && event.target.closest("input, textarea, select, [contenteditable]");
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey) && !event.shiftKey && !targetIsEditable) {
      event.preventDefault();
      openSubmitDialog();
      return;
    }
    if (event.ctrlKey || event.metaKey || targetIsEditable) return;

    const key = event.key.toLowerCase();
    if (/^[1-7]$/.test(event.key) && ["single", "multiple"].includes(currentQuestion()?.type)) {
      const option = elements.questionContent.querySelectorAll("input[type='radio'], input[type='checkbox']")[Number(event.key) - 1];
      if (option) {
        event.preventDefault();
        const checked = option.type === "radio" || !option.checked;
        if (option.checked !== checked) {
          option.checked = checked;
          option.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }
    } else if (event.key === "ArrowLeft" || key === "p") {
      event.preventDefault();
      elements.prevButton.click();
    } else if (event.key === "ArrowRight" || key === "n") {
      event.preventDefault();
      elements.nextButton.click();
    } else if (key === "home" || key === "end") {
      event.preventDefault();
      currentIndex = key === "home" ? 0 : quizQuestions.length - 1;
      renderQuestion();
    } else if (key === "t" && elements.quizMode.value !== "strict" && !isFlashcardMode()) {
      event.preventDefault();
      elements.tipButton.click();
    } else if (key === "u" && !isFlashcardMode()) {
      event.preventDefault();
      elements.unsureButton.click();
    } else if (event.key === "Escape" && !elements.tipPanel.hidden && !elements.tipButton.hidden) {
      event.preventDefault();
      elements.tipButton.click();
    }
  });

  for (const [subjectId, subject] of Object.entries(subjects)) {
    const stats = document.querySelector(`[data-subject-stats="${subjectId}"]`);
    stats.textContent = `${subject.questionPool.length} Fragen · ${subject.topics.length} Themenbereiche`;
  }
})();
