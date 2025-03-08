import { Octokit } from "octokit";
import { envs } from "../constants/envs";

const octokit = new Octokit({
  auth: envs.GITHUB_TOKEN,
});

export default octokit;
