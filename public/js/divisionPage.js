const globalUrl = window.location.protocol + "//" + window.location.host;
const urlObject = new URL(window.location.href);
const psid = urlObject.searchParams.get("psid");
const roomCode = urlObject.searchParams.get("roomCode");

const socket = io();

window.extAsyncInit = function () {
  const isSupported = MessengerExtensions.isInExtension();
  if (!isSupported) {
    window.location.replace(`${globalUrl}/redirect`);
  }
};

socket.on("selectedDivision", (index) => {
  const btnElement = document.getElementById(index);
  btnElement.disabled = true;
});

socket.emit("joinRoom", roomCode);

document.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target instanceof HTMLButtonElement) {
    e.target.disabled = true;

    socket.emit("selectedDivision", e.target.id, roomCode);

    // ! you should enter this fetch request inside success function in production
    const data = {
      psid: psid,
      index: e.target.id,
      divisionText: e.target.textContent,
      roomCode: roomCode,
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
