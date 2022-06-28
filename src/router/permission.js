import Cookies from "js-cookie";

const whiteList = ['/login'];
const tokenName = "api_token";

export function validateRoute(route, Router) {

  const token = Cookies.get(process.env.API_TOKEN_NAME)
  if (whiteList.includes(route.path)) {
    if (token)
      Router.push("/")
    return;
  }

  if (!token) {
    Router.push("/login");
  }
}
