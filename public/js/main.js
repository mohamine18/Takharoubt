window.extAsyncInit = function () {
  let text = "";
  // the Messenger Extensions JS SDK is done loading
  text = text + `/ location of iframe: ${window.name}`;
  MessengerExtensions.getSupportedFeatures(
    function success(result) {
      let features = result.supported_features;
      text = text + `/ features: ${features}`;
    },
    function error(err) {
      // error retrieving supported features
      console.log("error:", err);
    }
  );
  MessengerExtensions.getContext(
    1309656636532884,
    function success(thread_context) {
      text = text + `/ thread_context: ${thread_context}`;
    },
    function error(err) {
      // error
    }
  );
  const err = (document.getElementById("error").textContent = text);
};
