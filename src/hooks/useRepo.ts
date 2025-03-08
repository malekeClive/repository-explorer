import { Repo } from "@/interface/user";
import { getUserRepositories } from "@/services/user";
import { useState } from "react";
import { toast } from "sonner";

const useRepo = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [repoData, setRepoData] = useState<Repo[] | null>(null);

  const handleFetchRepo = async (username: string) => {
    setIsLoading(true);
    const repositories = await getUserRepositories(username);
    if (repositories.error) {
      toast.error(repositories.error);
      return;
    }

    setRepoData(repositories.data?.data);
    setIsLoading(false);
  };

  return {
    // state
    isLoading,
    repoData,
    // function
    handleFetchRepo,
  };
};

export default useRepo;
