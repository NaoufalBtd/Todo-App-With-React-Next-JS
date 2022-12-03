import { NextApiResponse } from "next";
import axios from "axios";

export const handleResponse = <T>(res: NextApiResponse, data: T) =>
  res.status(200).json({ payload: data, isError: false });

export const handleError = (
  res: NextApiResponse,
  err: IAPIError,
  statusCode?: number
) => res.status(statusCode || 500).json({ error: err, isError: true });

interface IAPIError {
  msg?: string;
  data?: any;
}

export const fetcher = (url: string) =>
  axios.get(url, { withCredentials: true }).then((res) => res.data);
export const poster = (option) => (url: string) =>
  axios.post(url, option).then((res) => res.data);
