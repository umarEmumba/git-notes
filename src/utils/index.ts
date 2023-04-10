import axios from "axios";

type headersType = {
    method: string;
    headers: {
      [key: string]: any;
    };
  };

export const callApi = async (
    apiRoute: string,
    body: string | null,
    headers: headersType,
  ) => {
    try {
      if (headers?.method === "POST")
        return await axios.post(apiRoute, body, headers);
      if (headers?.method === "PUT")
        return await axios.put(apiRoute, body, headers);
      if (headers?.method === "GET")
        return await axios.get(apiRoute, headers);
      return await axios.delete(apiRoute, headers);
    } catch (err) {
      console.error(`Error: ${err}`);
      throw err;
    }
  };

  export const goToRoute = (url: string, param?: string | number) => {
    let pageUrl = url;
    if (param) pageUrl = `${url}/${param}`;
    return pageUrl;
  };

  export const dateToDuration = (date: string): string => {
    let timeString = "";
    let totalMilliSeconds: number =
      new Date().getTime() - new Date(date).getTime();
    let timeAgo = Math.floor(totalMilliSeconds / 86400000);
    if (timeAgo > 0) return (timeString += `${timeAgo} days ago`);
    timeAgo = Math.floor(totalMilliSeconds / (60 * 60 * 1000));
    if (timeAgo > 0) return (timeString += `${timeAgo} hours ago`);
    timeAgo = Math.floor(totalMilliSeconds / (60 * 1000));
    return (timeString += `${timeAgo} minutes ago`);
  };