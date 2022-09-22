window.extAsyncInit = function () {
  let text = "aloo";
  MessengerExtensions.getContext(
    "1309656636532884",
    function success(thread_context) {
      const psid = thread_context.thread_type;
      const threadType = thread_context.psid;
      text = text + `/ thread_context: ${psid} / ${threadType}`;
    },
    function error(err) {
      // error
      text = text + `/ thread_context err: ${err}`;
    }
  );
  console.log(text);
  document.getElementById("error").textContent = text;
};
