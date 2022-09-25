const globalUrl = window.location.protocol + "//" + window.location.host;
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
    // ! you should enter this fetch request inside success function in production
    const data = {
      psid: psid,
      index: e.target.id,
      divisionText: e.target.textContent,
    };
    fetch(`${globalUrl}/selected-division`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => console.log(`message sent: ${response}`));
    MessengerExtensions.requestCloseBrowser(
      function success() {},
      function error(err) {
        // an error occurred
        console.log(`error closing the webview ${err}`);
      }
    );
  }
});
