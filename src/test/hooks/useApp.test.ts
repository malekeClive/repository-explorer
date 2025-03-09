import { renderHook, act } from "@testing-library/react";
import { useApp } from "../../hooks";
import { toast } from "sonner";

// Create mock function first
const mockGetUser = jest.fn();

// Define types for the mock responses
interface UserItem {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

interface UserResponse {
  data: {
    data: {
      items: UserItem[];
    };
  } | null;
  error: string | null;
}

// Mock the services
jest.mock("@/services/user", () => ({
  getUser: (username: string) => mockGetUser(username),
}));

// Mock the toast
jest.mock("sonner", () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe("useApp hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Set default mock implementation
    mockGetUser.mockResolvedValue({
      data: {
        data: {
          items: [
            {
              login: "testuser",
              id: 1,
              avatar_url: "https://avatars.githubusercontent.com/u/1",
              html_url: "https://github.com/testuser",
            },
          ],
        },
      },
      error: null,
    } as UserResponse);
  });

  it("initializes with default values", () => {
    const { result } = renderHook(() => useApp());

    expect(result.current.searchUser).toBe("");
    expect(result.current.userData).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it("updates searchUser state when handleSearchUser is called", () => {
    const { result } = renderHook(() => useApp());

    act(() => {
      result.current.handleSearchUser("testuser");
    });

    expect(result.current.searchUser).toBe("testuser");
  });

  it("fetches user data when handleSubmitSearchUser is called", async () => {
    const { result } = renderHook(() => useApp());

    await act(async () => {
      await result.current.handleSubmitSearchUser("testuser");
    });

    expect(mockGetUser).toHaveBeenCalledWith("testuser");
    expect(result.current.userData).toEqual([
      {
        login: "testuser",
        id: 1,
        avatar_url: "https://avatars.githubusercontent.com/u/1",
        html_url: "https://github.com/testuser",
      },
    ]);
    expect(result.current.isLoading).toBe(false);
  });

  it("handles empty search input", async () => {
    const { result } = renderHook(() => useApp());

    await act(async () => {
      await result.current.handleSubmitSearchUser("");
    });

    expect(mockGetUser).not.toHaveBeenCalled();
    expect(result.current.userData).toBeNull();
  });

  it("handles API errors", async () => {
    // Mock error response for this test
    mockGetUser.mockResolvedValueOnce({
      error: "API Error",
      data: null,
    } as UserResponse);

    const { result } = renderHook(() => useApp());

    await act(async () => {
      await result.current.handleSubmitSearchUser("error");
    });

    expect(toast.error).toHaveBeenCalledWith("API Error");
  });
});
