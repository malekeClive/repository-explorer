import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SectionSearchProps } from "@/interface/appContainer";
import { Loader } from "lucide-react";

export default function SectionSearch({
  searchUser,
  isLoading,
  handleSearchUser,
  handleSubmitSearchUser,
}: SectionSearchProps) {
  return (
    <div className="flex flex-col gap-4 max-w-screen-sm mx-5 md:mx-auto mt-10">
      <Input
        placeholder="Search"
        value={searchUser}
        onChange={(e) => handleSearchUser(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmitSearchUser(searchUser);
          }
        }}
      />
      <Button
        disabled={isLoading}
        onClick={() => handleSubmitSearchUser(searchUser)}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Loader className="w-4 h-4 animate-spin" />
            Searching...
          </span>
        ) : (
          "Search Users"
        )}
      </Button>
    </div>
  );
}
