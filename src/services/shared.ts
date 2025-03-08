import { AxiosError } from "axios";

export interface FetchResponse<T> {
  data: T | null;
  error: string | null;
}

export const initialFetchState = {
  data: null,
  error: null,
};

export async function handleFetch<T>(
  fetchFn: () => Promise<T>
): Promise<FetchResponse<T>> {
  try {
    const data = await fetchFn();
    return {
      data,
      error: null,
    };
  } catch (err) {
    const error =
      err instanceof AxiosError
        ? err.response?.data?.message || err.message
        : "An error occurred";

    return {
      data: null,
      error,
    };
  }
}
