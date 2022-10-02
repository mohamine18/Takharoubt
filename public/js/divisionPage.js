const globalUrl = window.location.protocol + "//" + window.location.host;
const urlObject = new URL(window.location.href);
const psid = urlObject.searchParams.get("psid");
const roomCode = urlObject.searchParams.get("roomCode");
const platform = urlObject.searchParams.get("platform");

const socket = io();

const platforms = ["messenger", "viber", "telegram"];

document.addEventListener("DOMContentLoaded", () => {
  if (!psid || !roomCode || !platform || !platforms.includes(platform)) {
    window.location.replace(`${globalUrl}/redirect`);
  }
});

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

    const data = {
      psid: psid,
      platform: platform,
      index: e.target.id,
      divisionText: e.target.textContent,
      roomCode: roomCode,
    };
    document.body.innerHTML = "<div class='lds-dual-ring'></div>";
    fetch(`${globalUrl}/selected-division`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) {
        switch (platform) {
          case "messenger":
            window.location.replace(
              `${globalUrl}/success-creation?platform=messenger`
            );
            break;
          case "viber":
            window.location.replace(
              `${globalUrl}/success-creation?platform=viber`
            );
            break;
          case "telegram":
            window.location.replace(
              `${globalUrl}/success-creation?platform=telegram`
            );
            break;
          default:
            break;
        }
      } else {
        document.body.innerHTML =
          "<h3>خطأ في الخادم... يرجى إعادة المحاولة لاحقا</h3>";
        document.body.classList.add("container");
      }
    });
  }
});
