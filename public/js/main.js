const psidElement = document.getElementById("psid");
const threadTypeElement = document.getElementById("threadType");
const errorElement = document.getElementById("errorText");
const isSupportedElement = document.getElementById("isSupported");

window.extAsyncInit = function () {
  const isSupported = MessengerExtensions.isInExtension();
  isSupportedElement.value = isSupported;
  MessengerExtensions.getContext(
    "1309656636532884",
    function success(result) {
      threadTypeElement.value = "entred";
      psidElement.value = result.psid;
      //   threadTypeElement.value = thread_context.thread_type;
    },
    function error(err) {
      // error
      errorElement.value = err;
    }
  );
  const close = () => {
    MessengerExtensions.requestCloseBrowser(
      function success() {
        // webview closed
      },
      function error(err) {
        // an error occurred
        console.log(err);
      }
    );
  };
};
