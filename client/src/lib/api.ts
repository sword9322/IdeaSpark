import { apiRequest } from "@/lib/queryClient";

// Get idea by ID
export async function getIdea(id: string) {
  const res = await apiRequest("GET", `/api/ideas/${id}`);
  return res.json();
}

// Generate new ideas
export async function generateIdeas(prompt: string, category: string) {
  const res = await apiRequest("POST", "/api/ideas", { prompt, category });
  return res.json();
}
