import { render, screen } from "@testing-library/react";
import SectionSearchResult from "@/container/appContainer/SectionSearchResult";
import { mockRepoData, mockUserData } from "../mocks/services";
import { mockOctokit } from "../mocks/lib";

jest.mock("@/constants/envs", () => ({
  envs: {
    VITE_GITHUB_TOKEN: "test-token",
    VITE_GITHUB_API_URL: "https://api.github.com",
  },
}));

jest.mock("@/lib/octokit", () => ({
  Octokit: jest.fn().mockImplementation(() => mockOctokit),
}));

describe("SectionSearchResult", () => {
  const mockHandleFetchRepo = jest.fn();
  const mockUseRepo = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock octokit responses
    mockOctokit.rest.repos.listForUser.mockResolvedValue({
      data: mockRepoData,
    });
    // Default mock implementation - not loading, no repos
    mockUseRepo.mockImplementation(() => ({
      repoData: null,
      handleFetchRepo: mockHandleFetchRepo,
      isLoading: false,
    }));
  });

  it("renders initial search prompt when userData is null", () => {
    render(<SectionSearchResult searchUser="" userData={null} />);

    expect(screen.getByText("Search GitHub Users")).toBeInTheDocument();
    expect(
      screen.getByText("Enter a username above to search for GitHub users")
    ).toBeInTheDocument();
  });

  it("renders 'no results found' when userData is empty array", () => {
    render(<SectionSearchResult searchUser="nonexistent" userData={[]} />);

    expect(screen.getByText("No results found")).toBeInTheDocument();
    expect(
      screen.getByText("Try searching for a different username")
    ).toBeInTheDocument();
  });

  it("renders user list when userData is provided", () => {
    render(
      <SectionSearchResult searchUser="testuser" userData={mockUserData} />
    );

    expect(screen.getByText("Result for testuser")).toBeInTheDocument();
    expect(screen.getByText("testuser")).toBeInTheDocument();
    expect(screen.getAllByText("View Profile")).toHaveLength(1);
  });
});
