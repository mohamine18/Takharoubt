const psidElement = document.getElementById("psid");
const closeBtn = document.getElementById("closeBtn");

const globalUrl = window.location.protocol + "//" + window.location.host;

const urlObject = new URL(window.location.href);
const psid = urlObject.searchParams.get("psid");
const psidData = { psid: psid || 0 };
psidElement.value = psid;

window.extAsyncInit = function () {
  //   const isSupported = MessengerExtensions.isInExtension();
  //   if (!isSupported) {
  //     //! page to tell user that this function is not supported outside the messenger
  //     window.location.replace("https://takharoubt-app-aa6ev.ondigitalocean.app/");
  //   }
};

closeBtn.addEventListener("click", () => {
  fetch(`${globalUrl}/close-page`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(psidData),
  }).then((response) => {
    if (response.ok) {
      MessengerExtensions.requestCloseBrowser(
        function success() {
          // success code
        },
        function error(err) {
          // an error occurred
          console.log(err);
        }
      );
    }
  });
});
