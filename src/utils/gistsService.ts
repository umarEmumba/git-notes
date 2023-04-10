import axios from "axios";
import { callApi } from ".";
import { apiBaseUrl, gistsApiUrl, gistsPerPage } from "../constants";

 const getGists = async (pageNumber : number, accessToken : string = '') => {
    try {
      const resp = await callApi(
        `${gistsApiUrl}?per_page=${gistsPerPage}&page=${pageNumber}`, null,
        {
          method: "GET",
          headers: {
            ...accessToken && {  Authorization: `token ${accessToken}` }
          }
        }
      );
      return resp?.data;
    } catch (err) {
     throw err;
    }
  };

  const starredGists = async (pageNumber : number, accessToken : string = '') => {
    try {
      const resp = await callApi(`${apiBaseUrl}starred?per_page=${gistsPerPage}&page=${pageNumber}`,null, {
      method: "GET",
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });
    return resp?.data;
    } catch (err) {
      throw err;
    }
  };

  export const gistsFunctions = {
    getGists,
    starredGists
  };

export const starAGist = async (gist_id: string, accessToken : string) => {
    try {
      let resp = await callApi(
        `${apiBaseUrl}${gist_id}/star`,
        null,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            accept: "application/vnd.github+json"
          },
        }
      );
      return resp;
      } catch (err) {
      console.log("API ERROR", err);
    }
  };

  export const unStarAGist = async (gist_id: string, accessToken : string) => {
    try {
      let resp = await callApi(
        `${apiBaseUrl}${gist_id}/star`,
        null,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            accept: "application/vnd.github+json"
          },
        }
      );
      return resp;
      } catch (err) {
      console.log("API ERROR", err);
    }
  };
  
  export const forkAGist = async (gist_id: string, accessToken : string) => {
    try {
      let response = await callApi(
        `${apiBaseUrl}${gist_id}/forks`,
        null,
        {
          method: "POST",
          headers: {
            Authorization: `token ${accessToken}`,
          },
        }
      );
  
      return response;
    } catch (err) {
      console.log("API ERROR", err);
    }
  };
  
  export const editGist = async (gist_id: string, accessToken : string) => {
    try {
      let response = await callApi(
        `${apiBaseUrl}${gist_id}`,
        null,
        {
          method: "POST",
          headers: {
            Authorization: `token ${accessToken}`,
          },
        }
      );
  
      return response;
    } catch (err) {
      console.log("API ERROR", err);
    }
  };
  
  export const removeGist = async (gist_id: string, accessToken : string | undefined) => {
    try {
      let response = await axios.delete(
        `${apiBaseUrl}${gist_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `token ${accessToken}`,
          },
        }
      );
      if (response.status === 204) return gist_id;
      else throw(new Error ("something went wrong"))
    } catch (err) {
      console.log("API ERROR", err);
    }
  };