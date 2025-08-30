import { kyInstance } from "./ky";
import { TProduct } from '../../modules/enter-page/table/types/t-product'

export function debounce(
  URL: string,
  data?: any | any[],
  method: "get" | "post" | "patch" | "delete" | "put" = "get",
  delay = 2000
) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return () => {
    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      let request;

      if (method === "get" || method === "delete") {
        request = kyInstance[method](URL);
      } else {
        request = kyInstance[method](URL, { json: data });
      }

      request
        .json<TProduct>()
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    }, delay);
  };
}
