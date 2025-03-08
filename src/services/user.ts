import octokit from "@/lib/octokit";
import { handleFetch } from "./shared";
import axios from "axios";
import { envs } from "@/constants/envs";

export const getUser = async (query: string) => {
  const response = await handleFetch(async () =>
    octokit.rest.search.users({
      q: query,
    })
  );
  return response;
};

export const getUserRepositories = async (username: string) => {
  const response = await handleFetch(async () =>
    axios.get(`${envs.GITHUB_API_URL}/users/${username}/repos`)
  );
  return response;
};
