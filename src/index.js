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
      .then((data) => {
        localStorage.setItem("accessToken", data.access_token);
        authorize(fetchYandexData());
        console.log("Сообщение с токеном", data)
      })
      .catch((error) => console.log("Обработка ошибки", error));
  };
};

const authorize = ({
  default_avatar_id: defaultAvatarId,
  default_name: displayName,
}) => {
  const avatarHtml = `<div className="avatar" style="background-image:url('https://avatars.mds.yandex.net/get-yapic/${defaultAvatarId}/islands-middle')"></div>`;
  const nameHtml = `<div className="name">${displayName}</div>`;
  document.getElementById("auth").innerHTML = avatarHtml + nameHtml;
}

const fetchYandexData = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`https://login.yandex.ru/info?forma=json`, {
    headers: {
      Authorization: `OAuth ${accessToken}`,
    },
  });
  if (!response.ok) throw new Error("Ошибка при получении данных");
  console.log(await response.json());
  return await response.json();
}
