const link = document.getElementById("link");

const globalUrl = window.location.protocol + "//" + window.location.host;
const urlObject = new URL(window.location.href);
const platform = urlObject.searchParams.get("platform");

document.addEventListener("DOMContentLoaded", () => {
  switch (platform) {
    case "messenger":
      link.classList.add("messenger");
      link.textContent = "ماسنجر";
      link.href = "http://m.me/takharoubt";
      break;
    case "viber":
      link.classList.add("viber");
      link.textContent = "فايبر";
      link.href = "viber://pa?chatURI=takharoubt";
      break;
    case "telegram":
      link.classList.add("telegram");
      link.textContent = "تيليغرام";
      link.href = "";
      break;
    default:
      break;
  }
});
