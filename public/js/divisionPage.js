const urlObject = new URL(window.location.href);
const psid = urlObject.searchParams.get("psid");

window.extAsyncInit = function () {
  const isSupported = MessengerExtensions.isInExtension();
  // if (!isSupported) {
  //   window.location.replace(`${globalUrl}/redirect`);
  // }
};

document.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target instanceof HTMLButtonElement) {
    e.target.disabled = true;
    MessengerExtensions.requestCloseBrowser(
      function success() {
        const data = {
          psid: psid,
          index: e.target.id,
          text: e.target.textContent,
        };
        fetch(`${globalUrl}/selected-division`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then((response) => console.log(`message sent: ${response}`));
      },
      function error(err) {
        // an error occurred
        console.log(`error closing the webview ${err}`);
      }
    );
  }
});
