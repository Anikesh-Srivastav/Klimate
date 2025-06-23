import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";

interface SearchHistoryItem {
  id: string;
  query: string;
  lat: number;
  lon: number;
  name: string;
  country: string;
  state?: string;
  searchedAt: number;
}

export function useSearchHistory() {
  const [localHistory, setLocalHistory] = useLocalStorage<SearchHistoryItem[]>("search-history", []);
  const queryClient = useQueryClient();

  // Read history using useQuery
  const historyQuery = useQuery<SearchHistoryItem[]>({
    queryKey: ["search-history"],
    queryFn: async () => {
     
      return [...localHistory].sort((a, b) => b.searchedAt - a.searchedAt);
    },
    initialData: localHistory,
  });


  const addToHistory = useMutation({
    mutationFn: async (
      search: Omit<SearchHistoryItem, "id" | "searchedAt">
    ) => {
      const newSearch: SearchHistoryItem = {
        ...search,
        id: `${search.lat}-${search.lon}-${Date.now()}`,
        searchedAt: Date.now(),
      };

      const filtered = localHistory.filter(
        (item) => !(item.lat === search.lat && item.lon === search.lon)
      );

      const newHistory = [newSearch, ...filtered].slice(0, 10);

    
      setLocalHistory(newHistory);

   
      queryClient.setQueryData(["search-history"], newHistory);

      return newHistory;
    },
  });

  // Mutation to clear history
  const clearHistory = useMutation({
    mutationFn: async () => {
      setLocalHistory([]);
      queryClient.setQueryData(["search-history"], []);
      return [];
    },
  });

  return {
    history: historyQuery.data ?? [],
    addToHistory,
    clearHistory,
  };
}
