import { Repo, SearchUser } from "@/interface/user";

export const mockUserData = [
  {
    login: "testuser",
    id: 1,
    node_id: "MDQ6VXNlcjE=",
    avatar_url: "https://avatars.githubusercontent.com/u/1",
    gravatar_id: "",
    url: "https://api.github.com/users/testuser",
    html_url: "https://github.com/testuser",
    followers_url: "https://api.github.com/users/testuser/followers",
    following_url:
      "https://api.github.com/users/testuser/following{/other_user}",
    gists_url: "https://api.github.com/users/testuser/gists{/gist_id}",
    starred_url: "https://api.github.com/users/testuser/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/testuser/subscriptions",
    organizations_url: "https://api.github.com/users/testuser/orgs",
    repos_url: "https://api.github.com/users/testuser/repos",
    events_url: "https://api.github.com/users/testuser/events{/privacy}",
    received_events_url:
      "https://api.github.com/users/testuser/received_events",
    type: "User",
    user_view_type: "User",
    site_admin: false,
    score: 1.0,
  },
] as SearchUser["items"];

export const mockRepoData = [
  {
    id: 1,
    node_id: "R_kgDOG7Qk9A",
    name: "test-repo",
    full_name: "testuser/test-repo",
    private: false,
    owner: {
      login: "testuser",
      id: 1,
      node_id: "MDQ6VXNlcjE=",
      avatar_url: "https://avatars.githubusercontent.com/u/1",
      gravatar_id: "",
      url: "https://api.github.com/users/testuser",
      html_url: "https://github.com/testuser",
      followers_url: "https://api.github.com/users/testuser/followers",
      following_url:
        "https://api.github.com/users/testuser/following{/other_user}",
      gists_url: "https://api.github.com/users/testuser/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/testuser/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/testuser/subscriptions",
      organizations_url: "https://api.github.com/users/testuser/orgs",
      repos_url: "https://api.github.com/users/testuser/repos",
      events_url: "https://api.github.com/users/testuser/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/testuser/received_events",
      type: "User",
      user_view_type: "User",
      site_admin: false,
    },
    html_url: "https://github.com/testuser/test-repo",
    description: "Test repository",
    fork: false,
    url: "https://api.github.com/repos/testuser/test-repo",
    forks_url: "https://api.github.com/repos/testuser/test-repo/forks",
    keys_url: "https://api.github.com/repos/testuser/test-repo/keys{/key_id}",
    collaborators_url:
      "https://api.github.com/repos/testuser/test-repo/collaborators{/collaborator}",
    teams_url: "https://api.github.com/repos/testuser/test-repo/teams",
    hooks_url: "https://api.github.com/repos/testuser/test-repo/hooks",
    issue_events_url:
      "https://api.github.com/repos/testuser/test-repo/issues/events{/number}",
    events_url: "https://api.github.com/repos/testuser/test-repo/events",
    assignees_url:
      "https://api.github.com/repos/testuser/test-repo/assignees{/user}",
    branches_url:
      "https://api.github.com/repos/testuser/test-repo/branches{/branch}",
    tags_url: "https://api.github.com/repos/testuser/test-repo/tags",
    blobs_url:
      "https://api.github.com/repos/testuser/test-repo/git/blobs{/sha}",
    git_tags_url:
      "https://api.github.com/repos/testuser/test-repo/git/tags{/sha}",
    git_refs_url:
      "https://api.github.com/repos/testuser/test-repo/git/refs{/sha}",
    trees_url:
      "https://api.github.com/repos/testuser/test-repo/git/trees{/sha}",
    statuses_url:
      "https://api.github.com/repos/testuser/test-repo/statuses/{sha}",
    languages_url: "https://api.github.com/repos/testuser/test-repo/languages",
  },
] as Repo[];

export const mockServices = {
  getUser: jest
    .fn()
    .mockResolvedValue({ data: { data: mockUserData }, error: null }),
  getUserRepositories: jest
    .fn()
    .mockResolvedValue({ data: mockRepoData, error: null }),
};
