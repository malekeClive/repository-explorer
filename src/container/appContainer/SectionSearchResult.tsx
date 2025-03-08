import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRepo } from "@/hooks";
import { SectionSearchResultProps } from "@/interface/appContainer";
import { GitBranchIcon, Star } from "lucide-react";

export default function SectionSearchResult({
  searchUser,
  userData,
}: SectionSearchResultProps) {
  const { repoData, handleFetchRepo, isLoading } = useRepo();
  return (
    <>
      {searchUser && userData && (
        <p className="max-w-screen-sm mx-auto mt-10 text-muted-foreground">
          Result for {searchUser}
        </p>
      )}
      <div className="max-w-screen-sm mx-auto mt-10">
        {userData === null ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <p className="text-lg text-muted-foreground">Search GitHub Users</p>
            <p className="text-sm text-muted-foreground mt-1">
              Enter a username above to search for GitHub users
            </p>
          </div>
        ) : (
          <>
            {userData?.length > 0 ? (
              <Accordion
                type="single"
                collapsible
                onValueChange={(value) => {
                  if (value) {
                    console.log("value: ", value);
                    handleFetchRepo(value);
                  }
                }}
              >
                {userData?.map((user) => (
                  <AccordionItem key={user.id} value={user.login}>
                    <AccordionTrigger>
                      <div className="flex items-center gap-4">
                        <img
                          src={user.avatar_url}
                          alt={user.login}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex flex-col items-start">
                          <span className="text-lg font-semibold">{user.login}</span>
                          <a
                            href={user.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-muted-foreground hover:underline"
                          >
                            View Profile
                          </a>
                        </div>
                      </div>
                    </AccordionTrigger>
                    {isLoading ? (
                      <AccordionContent>
                        <div className="flex flex-col gap-4 p-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="h-4 w-32 bg-secondary animate-pulse rounded" />
                              <div className="h-6 w-16 bg-secondary animate-pulse rounded-full" />
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="h-4 w-12 bg-secondary animate-pulse rounded" />
                              <div className="h-4 w-12 bg-secondary animate-pulse rounded" />
                            </div>
                          </div>
                          <div className="h-4 w-3/4 bg-secondary animate-pulse rounded" />
                          <div className="flex gap-2">
                            <div className="h-6 w-16 bg-secondary animate-pulse rounded-full" />
                            <div className="h-6 w-16 bg-secondary animate-pulse rounded-full" />
                            <div className="h-6 w-16 bg-secondary animate-pulse rounded-full" />
                          </div>
                        </div>
                      </AccordionContent>
                    ) : repoData && repoData.length > 0 ? (
                      <>
                        {repoData?.map((repo) => (
                          <AccordionContent key={repo.id}>
                            <div className="p-4 rounded-lg border border-border/50 hover:border-border/80 transition-colors">
                              <div className="flex items-center justify-between mb-3">
                                <a
                                  href={repo.html_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary text-lg font-semibold underline"
                                >
                                  {repo.name}
                                </a>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Star size={16} />
                                    {repo.stargazers_count}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <GitBranchIcon size={16} />
                                    {repo.forks_count}
                                  </span>
                                </div>
                              </div>

                              {repo.description && (
                                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                  {repo.description}
                                </p>
                              )}

                              <div className="flex flex-wrap gap-2">
                                {repo.language && (
                                  <span className="text-xs px-2.5 py-1 bg-secondary/50 text-secondary-foreground rounded-full">
                                    {repo.language}
                                  </span>
                                )}
                                {repo.topics.map((topic) => (
                                  <span
                                    key={topic}
                                    className="text-xs px-2.5 py-1 bg-primary/10 text-primary rounded-full"
                                  >
                                    {topic}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </AccordionContent>
                        ))}
                      </>
                    ) : (
                      <AccordionContent>
                        <p className="text-muted-foreground">
                          There is no repository found
                        </p>
                      </AccordionContent>
                    )}
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <p className="text-lg text-muted-foreground">
                  No results found
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Try searching for a different username
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
