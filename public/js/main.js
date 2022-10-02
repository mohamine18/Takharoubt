const closeBtn = document.getElementById("closeBtn");
const errorElement = document.getElementById("error");
const infoElement = document.getElementById("info");
const methodElement = document.getElementById("method");
const periodElement = document.getElementById("period");
const commentElement = document.getElementById("commentField");
const formElement = document.getElementById("formData");

const methods = ["manzil", "juz", "hizb"];
const periods = ["day", "week", "month"];
const platforms = ["messenger", "viber", "telegram"];

const globalUrl = window.location.protocol + "//" + window.location.host;

const urlObject = new URL(window.location.href);
const psid = urlObject.searchParams.get("psid");
const platform = urlObject.searchParams.get("platform");

document.addEventListener("DOMContentLoaded", () => {
  if (!psid || !platform || !platforms.includes(platform)) {
    window.location.replace(`${globalUrl}/redirect`);
  }
});

closeBtn.addEventListener("click", () => {
  switch (platform) {
    case "messenger":
      window.location.replace(
        `${globalUrl}/success-creation?platform=messenger`
      );
      break;
    case "viber":
      window.location.replace(`${globalUrl}/success-creation?platform=viber`);
      break;
    case "telegram":
      window.location.replace(
        `${globalUrl}/success-creation?platform=telegram`
      );
      break;
    default:
      break;
  }
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
    const formData = {
      psid: psid,
      platform: platform,
      method: methodElement.value,
      period: periodElement.value,
      comment: commentElement.value,
    };

    document.body.innerHTML = "<div class='lds-dual-ring'></div>";

    fetch(`${globalUrl}/create-a-room`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
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
          "<h2>خطأ في الخادم... يرجى إعادة المحاولة لاحقا</h2>";
        document.body.classList.add("container");
      }
    });
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
