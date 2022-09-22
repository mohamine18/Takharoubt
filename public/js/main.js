const psidElement = document.getElementById("psid");
const threadTypeElement = document.getElementById("threadType");
window.extAsyncInit = function () {
  MessengerExtensions.getContext(
    "1309656636532884",
    function success(thread_context) {
      psidElement.value = thread_context.psid;
      threadTypeElement.value = thread_context.thread_type;
    },
    function error(err) {
      // error
    }
  );
  console.log(text);
};
