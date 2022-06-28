import { api } from "src/boot/axios";

export function doLogin(data) {
  return api({
    url: "/auth/login_admin",
    method: "POST",
    data
  })
}
