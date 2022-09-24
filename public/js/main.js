const psidElement = document.getElementById("psid");
const closeBtn = document.getElementById("closeBtn");
const createBtn = document.getElementById("create");
const errorElement = document.getElementById("error");
const infoElement = document.getElementById("info");
const methodElement = document.getElementById("method");
const periodElement = document.getElementById("period");
const commentElement = document.getElementById("commentField");
const formElement = document.getElementById("formData");

const methods = ["manzil", "juz", "hizb"];
const periods = ["day", "week", "month"];

const globalUrl = window.location.protocol + "//" + window.location.host;

const urlObject = new URL(window.location.href);
const psid = urlObject.searchParams.get("psid");
const psidData = { psid: psid || 0 };
psidElement.value = psid;

window.extAsyncInit = function () {
  const isSupported = MessengerExtensions.isInExtension();
  // if (!isSupported) {
  //   window.location.replace(`${globalUrl}/redirect`);
  // }
};

closeBtn.addEventListener("click", () => {
  MessengerExtensions.requestCloseBrowser(
    function success() {
      fetch(`${globalUrl}/close-page`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(psidData),
      }).then((response) => console.log(`message sent: ${response}`));
    },
    function error(err) {
      // an error occurred
      console.log(`error closing the webview ${err}`);
    }
  );
});

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!methods.includes(methodElement.value)) {
    errorElement.style.display = "block";
    errorElement.textContent = "من فضلك قم بإختيار طريقة التقسيم";
  } else if (!periods.includes(periodElement.value)) {
    errorElement.style.display = "block";
    errorElement.textContent = "من فضلك قم بإختيار مدة الختمة";
  } else {
    MessengerExtensions.requestCloseBrowser(
      function success() {
        const formData = {
          psid: psidElement.value,
          method: methodElement.value,
          period: periodElement.value,
          comment: commentElement.value,
        };
        fetch(`${globalUrl}/create-a-room`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }).then((response) => console.log(`message sent: ${response}`));
      },
      function error(err) {
        // an error occurred
        // ! delete this after testing
        // e.currentTarget.submit();
        console.log(`error closing the webview ${err}`);
      }
    );
  }
});

methodElement.addEventListener("change", (e) => {
  e.preventDefault();
  infoElement.style.display = "block";
  switch (e.target.value) {
    case "manzil":
      infoElement.textContent = "ختمة لسبعة (7) اشخاص على الأكثر";
      break;
    case "juz":
      infoElement.textContent = "ختمة لثلاثين (30) شخص على الأكثر";
      break;
    case "hizb":
      infoElement.textContent = "ختمة لستين (60) شخص على الأكثر";
      break;
    default:
      infoElement.textContent = "";
      break;
  }
});
