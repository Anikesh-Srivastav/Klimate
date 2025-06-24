import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
  const [, setLocalStorage] = useLocalStorage<SearchHistoryItem[]>("search-history", []);
  const queryClient = useQueryClient();

  const historyQuery = useQuery<SearchHistoryItem[]>({
    queryKey: ["search-history"],
    queryFn: async () => {
      const raw = localStorage.getItem("search-history");
      const parsed = raw ? (JSON.parse(raw) as SearchHistoryItem[]) : [];
      return parsed.sort((a, b) => b.searchedAt - a.searchedAt);
    },
    initialData: [],
  });

  const addToHistory = useMutation({
    mutationFn: async (
      search: Omit<SearchHistoryItem, "id" | "searchedAt">
    ) => {
      const raw = localStorage.getItem("search-history");
      const prev: SearchHistoryItem[] = raw ? JSON.parse(raw) : [];

      const newSearch: SearchHistoryItem = {
        ...search,
        id: `${search.lat}-${search.lon}-${Date.now()}`,
        searchedAt: Date.now(),
      };

      const filtered = prev.filter(
        (item) => !(item.lat === search.lat && item.lon === search.lon)
      );

      const newHistory = [newSearch, ...filtered].slice(0, 10);


      setLocalStorage(newHistory);
 
      queryClient.setQueryData(["search-history"], newHistory);

      return newHistory;
    },
  });

  const clearHistory = useMutation({
    mutationFn: async () => {
      setLocalStorage([]);
      localStorage.removeItem("search-history");
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
