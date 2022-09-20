const image_url =
  "https://images.unsplash.com/photo-1587617425953-9075d28b8c46?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80";

exports.genericTemplate = (listOfButtons) => {
  const buttons = listOfButtons.map((list) => {
    return {
      type: list.type,
      title: list.title,
      payload: list.payload,
    };
  });
  return {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Is this the right picture?",
            subtitle: "Tap a button to answer.",
            image_url: image_url,
            buttons: buttons,
          },
        ],
      },
    },
  };
};
