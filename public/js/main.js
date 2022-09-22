const psidElement = document.getElementById("psid");
const threadTypeElement = document.getElementById("threadType");
const errorElement = document.getElementById("errorText");
window.extAsyncInit = function () {
  MessengerExtensions.getContext(
    "1309656636532884",
    function success(thread_context) {
      threadTypeElement.value = "entred";
      psidElement.value = thread_context;
      //   threadTypeElement.value = thread_context.thread_type;
    },
    function error(err) {
      // error
      errorElement.value = err;
    }
  );
  console.log(text);
};
