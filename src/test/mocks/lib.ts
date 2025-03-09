// Mock for the entire octokit lib
export const mockOctokit = {
  rest: {
    search: {
      users: jest.fn(),
    },
    repos: {
      listForUser: jest.fn(),
    },
  },
};

export const mockUseRepo = jest.fn();

// Mock the Octokit constructor
export const Octokit = jest.fn().mockImplementation(() => mockOctokit);

// Mock the default export
export default mockOctokit;
