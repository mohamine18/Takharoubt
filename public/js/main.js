window.extAsyncInit = function () {
  const erre = document.getElementById("error");
  MessengerExtensions.getContext(
    "1309656636532884",
    function success(thread_context) {
      const psid = thread_context.thread_type;
      const threadType = thread_context.psid;
      erre.textContent = `/ thread_context: ${psid} / ${threadType}`;
    },
    function error(err) {
      // error
      erre.textContent = +`/ thread_context err: ${err}`;
    }
  );
  console.log(text);
};
