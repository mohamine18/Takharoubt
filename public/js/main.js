const psidElement = document.getElementById("psid");
const closeBtn = document.getElementById("closeBtn");

window.extAsyncInit = function () {
  //   const isSupported = MessengerExtensions.isInExtension();
  //   if (!isSupported) {
  //     //! page to tell user that this function is not supported outside the messenger
  //     window.location.replace("https://takharoubt-app-aa6ev.ondigitalocean.app/");
  //   }
};

const url = window.location.href;
const urlObject = new URL(url);
const psid = urlObject.searchParams.get("psid");
psidElement.value = psid;

closeBtn.addEventListener("click", () => {
  MessengerExtensions.requestCloseBrowser(
    function success() {
      // webview closed
    },
    function error(err) {
      // an error occurred
      console.log(err);
    }
  );
});
