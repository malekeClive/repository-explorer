import { useState } from "react";
import { getUser } from "@/services/user";
import { SearchUser } from "@/interface/user";
import { toast } from "sonner";
import { LIMIT_USER } from "@/constants/common";
import {
  handleSearchUser,
  handleSubmitSearchUser,
} from "@/interface/hooks/useApp";

const useApp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchUser, setSearchUser] = useState<string>("");
  const [userData, setUserData] = useState<SearchUser["items"] | null>(null);

  const handleSearchUser: handleSearchUser = async (user: string) => {
    setSearchUser(user);
  };

  const handleSubmitSearchUser: handleSubmitSearchUser = async (
    user: string
  ) => {
    if (user === "") {
      setUserData(null);
      return;
    }

    setIsLoading(true);
    const userData = await getUser(user);
    if (userData.error) {
      toast.error(userData.error);
      return;
    }
    const filteredUserData = userData?.data?.data.items.slice(
      0,
      LIMIT_USER
    ) as SearchUser["items"];
    setUserData(filteredUserData);
    setIsLoading(false);
  };

  return {
    // State
    isLoading,
    searchUser,
    userData,
    // Handlers
    handleSearchUser,
    handleSubmitSearchUser,
  };
};

export default useApp;
