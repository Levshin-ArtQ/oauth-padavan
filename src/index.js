window.onload = () => {
  document.getElementById("button").onclick = () => {
    window.YaAuthSuggest.init(
      {
        client_id: "51ea177b9654430f84b347c87bcbddcc",
        response_type: "token",
        redirect_uri: "https://oauth-padavan.vercel.app/token.html",
      },
      "https://oauth-padavan.vercel.app/",
      {
        view: "button",
        parentId: "buttonContainer",
        buttonSize: "m",
        buttonView: "main",
        buttonTheme: "dark",
        buttonBorderRadius: "16",
        buttonIcon: "ya",
      }
    )
      .then(({ handler }) => handler())
      .then((data) => console.log("Сообщение с токеном", data))
      .catch((error) => console.log("Обработка ошибки", error));
  };
};
