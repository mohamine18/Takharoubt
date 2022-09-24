const psidElement = document.getElementById("psid");
const closeBtn = document.getElementById("closeBtn");
const errorElement = document.getElementById("error");
const methodElement = document.getElementById("method");

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

methodElement.addEventListener("change", (e) => {
  e.preventDefault();
  switch (e.target.value) {
    case "manzil":
      errorElement.textContent = "ختمة لسبعة اشخاص على الأكثر";
      break;
    case "juz":
      errorElement.textContent = "ختمة لثلاثين شخص على الأكثر";
      break;
    case "hizb":
      errorElement.textContent = "ختمة لستين شخص على الأكثر";
      break;
    default:
      errorElement.textContent = "";
      break;
  }
});
