import { SearchUser } from "../user";

export interface SectionSearchProps {
  searchUser: string;
  isLoading: boolean;
  handleSearchUser: (value: string) => void;
  handleSubmitSearchUser: (value: string) => void;
}

export interface SectionSearchResultProps {
  searchUser: string;
  userData: SearchUser["items"] | null;
}
