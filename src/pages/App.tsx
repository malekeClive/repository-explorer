import "./App.css";
import SectionSearch from "../container/appContainer/SectionSearch";
import SectionSearchResult from "../container/appContainer/SectionSearchResult";
import { useApp } from "@/hooks";

function App() {
  const {
    searchUser,
    userData,
    isLoading,
    handleSearchUser,
    handleSubmitSearchUser,
  } = useApp();

  return (
    <>
      <h1 className="text-4xl font-bold text-center mt-10">Github Search</h1>
      <SectionSearch
        searchUser={searchUser}
        isLoading={isLoading}
        handleSearchUser={handleSearchUser}
        handleSubmitSearchUser={handleSubmitSearchUser}
      />
      <SectionSearchResult searchUser={searchUser} userData={userData} />
    </>
  );
}

export default App;
