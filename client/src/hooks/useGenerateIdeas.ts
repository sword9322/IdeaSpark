import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { toast } from "@/hooks/use-toast";
import { GenerateIdeaRequest } from "@shared/schema";

export function useGenerateIdeas() {
  return useMutation({
    mutationFn: async (data: GenerateIdeaRequest) => {
      const res = await apiRequest("POST", "/api/ideas", data);
      return res.json();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate ideas",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/ideas"] });
    },
  });
}
