// zogda na powiadomienia
function requestNotificationPermissionOnLoad() {
  if ("Notification" in window) {
    // Sprawdź, czy użytkownik już udzielił zgody na powiadomienia
    if (Notification.permission !== "granted") {
      // Jeśli użytkownik nie zezwolił na powiadomienia, poproś go o zgodę przy załadowaniu strony
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          console.log("Użytkownik wyraził zgodę na powiadomienia.");
        } else {
          console.log("Użytkownik odrzucił prośbę o zgodę na powiadomienia.");
        }
      });
    } else {
      console.log("Użytkownik już wyraził zgodę na powiadomienia.");
    }
  } else {
    console.log("Przeglądarka nie obsługuje powiadomień.");
  }
}

// Wywołaj funkcję przy załadowaniu strony
window.onload = requestNotificationPermissionOnLoad;

// informacja o przeriwie
function showBreakNotification() {
  const notificationTitle = "CZAS NA PRZERWĘ";
  const notificationOptions = {
    body: "Nadszedł czas na krótką przerwę.",
    icon: "./media/notification.png", // Ścieżka do ikony powiadomienia (możesz dostosować)
  };

  if (Notification.permission === "granted") {
    const notification = new Notification(
      notificationTitle,
      notificationOptions
    );
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        const notification = new Notification(
          notificationTitle,
          notificationOptions
        );
      }
    });
  }
}
// informacja o rozpoczęciu pracy
function showWorkkNotification() {
  const notificationTitle = "CZAS POPRACOWAĆ";
  const notificationOptions = {
    body: "Rozpoczynasz 25 minutową sesję pracy/nauki",
    icon: "./media/notification.png", // Ścieżka do ikony powiadomienia (możesz dostosować)
  };

  if (Notification.permission === "granted") {
    const notification = new Notification(
      notificationTitle,
      notificationOptions
    );
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        const notification = new Notification(
          notificationTitle,
          notificationOptions
        );
      }
    });
  }
}
// Timer interactions
const options = document.querySelectorAll(".option");
const breakTime = document.querySelector(".break");
const work = document.querySelector(".work");
const timer = document.getElementById("timer");
let isOnBreak = false;

breakTime.addEventListener("click", () => {
  console.log("break");
  timer.classList.add("break-time");
  isOnBreak = true;
});

options.forEach((option) => {
  option.addEventListener("click", () => {
    console.log("active");
    options.forEach((option) => {
      option.classList.remove("active");
    });
    option.classList.add("active");
    isOnBreak = false;
  });

  work.addEventListener("click", () => {
    timer.classList.remove("break-time");
  });
});

// Timer logic
const start = document.getElementById("start");
const min = document.getElementById("min");
const sec = document.getElementById("sec");
let totalSeconds = 25 * 60; // Tutaj zmieniam na 60 dla 1 minuty (do testów)

const updateCounter = () => {
  const minutesLeft = Math.floor(totalSeconds / 60);
  const secondsLeft = totalSeconds % 60;

  min.textContent = String(minutesLeft).padStart(2, "0");
  sec.textContent = String(secondsLeft).padStart(2, "0");
};

let countdownInterval;

const startPomodoro = () => {
  isOnBreak = false;
  totalSeconds = 25 * 60; // 25 minut w trybie pomodoro to 25 * 60
  timer.classList.remove("break-time");
  work.classList.add("active");
  breakTime.classList.remove("active");
  showWorkkNotification();
  updateCounter();

  countdownInterval = setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;
      updateCounter();
    } else {
      clearInterval(countdownInterval);
      // Po zakończeniu pomodoro, przełącz się na przerwę
      startBreak();
    }
  }, 1000);
};

const startBreak = () => {
  isOnBreak = true;
  totalSeconds = 5 * 60; // 5 minut przerwy to 5 * 60
  timer.classList.add("break-time");
  breakTime.classList.add("active");
  work.classList.remove("active");
  showBreakNotification();
  updateCounter();

  countdownInterval = setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;
      updateCounter();
    } else {
      clearInterval(countdownInterval);
      // Po zakończeniu przerwy, wróć do pomodoro
      startPomodoro();
    }
  }, 1000);
};

start.addEventListener("click", () => {
  if (!countdownInterval) {
    if (isOnBreak) {
      startBreak();
    } else {
      startPomodoro();
    }
  }
});

updateCounter(); // Aktualizacja zegara na początku

const resetButton = document.getElementById("reset");

resetButton.addEventListener("click", () => {
  // Odśwież stronę
  location.reload();
});
