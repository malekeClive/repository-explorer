import SectionSearch from "@/container/appContainer/SectionSearch";
import { render, screen, fireEvent } from "@testing-library/react";

describe("SectionSearch", () => {
  const mockProps = {
    searchUser: "",
    isLoading: false,
    handleSearchUser: jest.fn(),
    handleSubmitSearchUser: jest.fn(),
  };

  it("renders search input and button", () => {
    render(<SectionSearch {...mockProps} />);
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
    expect(screen.getByText("Search Users")).toBeInTheDocument();
  });

  it("calls handleSearchUser on input change", () => {
    render(<SectionSearch {...mockProps} />);
    fireEvent.change(screen.getByPlaceholderText("Search"), {
      target: { value: "test" },
    });
    expect(mockProps.handleSearchUser).toHaveBeenCalledWith("test");
  });

  it("calls handleSubmitSearchUser on button click", () => {
    render(<SectionSearch {...mockProps} />);
    fireEvent.click(screen.getByText("Search Users"));
    expect(mockProps.handleSubmitSearchUser).toHaveBeenCalled();
  });

  it("calls handleSubmitSearchUser on Enter key press", () => {
    render(<SectionSearch {...mockProps} />);
    const input = screen.getByPlaceholderText("Search");
    fireEvent.keyDown(input, { key: "Enter" });
    expect(mockProps.handleSubmitSearchUser).toHaveBeenCalled();
  });

  it("shows loading state", () => {
    render(<SectionSearch {...mockProps} isLoading={true} />);
    expect(screen.getByText("Searching...")).toBeInTheDocument();
  });
});
