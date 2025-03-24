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
      .then(async (data) => {
        const result = await fetchYandexData(data.access_token);
        localStorage.setItem("accessToken", data.access_token);
        authorize(result);
        console.log("Сообщение с токеном", data)
      })
      .catch((error) => console.log("Обработка ошибки", error));
  };
};

const authorize = async ({
  default_avatar_id: defaultAvatarId,
  display_name: displayName,
}) => {
  const avatarHtml = `<div className="avatar" style="background-image:url('https://avatars.yandex.net/get-yapic/${defaultAvatarId}/islands-middle')"></div>`;
  console.log(defaultAvatarId)
  const nameHtml = `<div className="name">${displayName}</div>`;
  console.log(avatarHtml)
  document.getElementById("auth").innerHTML = `${avatarHtml}${nameHtml}`;
}

const fetchYandexData = async (access_token) => {
  if (!localStorage.getItem("accessToken")) {
    console.log('no token in fetch')
  }
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`https://login.yandex.ru/info?format=json`, {
    headers: {
      Authorization: `OAuth ${access_token}`,
    },
  });
  const data = await response.json();
  console.log('user data', data)
  return data;
}
