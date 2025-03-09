import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../../pages/App";
import { toast } from "sonner";
import { mockRepoData, mockUserData } from "../mocks/services";

// Create mock functions first
const mockGetUser = jest.fn();
const mockGetUserRepositories = jest.fn();

// Mock the services
jest.mock("@/services/user", () => ({
  getUser: (...args: unknown[]) => mockGetUser(...args),
  getUserRepositories: (...args: unknown[]) => mockGetUserRepositories(...args),
}));

// Mock the toast
jest.mock("sonner", () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe("App Integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Set default mock implementations
    mockGetUser.mockResolvedValue({
      data: {
        data: {
          items: mockUserData,
        },
      },
      error: null,
    });

    mockGetUserRepositories.mockResolvedValue({
      data: mockRepoData,
      error: null,
    });
  });

  it("performs search and displays results", async () => {
    render(<App />);

    // Find and interact with search input
    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "malekeclive" } });

    // Click search button
    const searchButton = screen.getByText("Search Users");
    fireEvent.click(searchButton);

    // Wait for and verify results
    await waitFor(() => {
      expect(mockGetUser).toHaveBeenCalledWith("malekeclive");
    });
  });

  it("handles empty search gracefully", async () => {
    render(<App />);

    const searchButton = screen.getByText("Search Users");
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(mockGetUser).not.toHaveBeenCalled();
    });
  });

  it("handles API errors gracefully", async () => {
    // Mock error response for this test
    mockGetUser.mockResolvedValueOnce({
      error: "API Error",
      data: null,
    });

    render(<App />);

    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "error" } });

    const searchButton = screen.getByText("Search Users");
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(mockGetUser).toHaveBeenCalledWith("error");
      expect(toast.error).toHaveBeenCalledWith("API Error");
    });
  });
});
