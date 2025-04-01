import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface PromptFormProps {
  onSubmit: (prompt: string, category: string) => void;
  isLoading: boolean;
}

export default function PromptForm({ onSubmit, isLoading }: PromptFormProps) {
  const [prompt, setPrompt] = useState("");
  const [category, setCategory] = useState("Business");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt, category);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="prompt" className="text-gray-700 font-medium">
          What would you like ideas for?
        </Label>
        <Input
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          maxLength={100}
          placeholder="E.g., sustainable fashion, space travel, or healthy meal delivery"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          disabled={isLoading}
          required
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>Be specific for better results</span>
          <span>{prompt.length}/100</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category" className="block text-gray-700 font-medium">
          Category
        </Label>
        <Select
          value={category}
          onValueChange={setCategory}
          disabled={isLoading}
        >
          <SelectTrigger id="category" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent className="max-h-60">
            <SelectItem value="Business">Business</SelectItem>
            <SelectItem value="Story">Story</SelectItem>
            <SelectItem value="App">App</SelectItem>
            <SelectItem value="Product">Product</SelectItem>
            <SelectItem value="Marketing">Marketing</SelectItem>
            <SelectItem value="Social Media">Social Media</SelectItem>
            <SelectItem value="Education">Education</SelectItem>
            <SelectItem value="Technology">Technology</SelectItem>
            <SelectItem value="Food">Food</SelectItem>
            <SelectItem value="Travel">Travel</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        className="w-full h-12 bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        disabled={isLoading || !prompt.trim()}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          "Spark Ideas"
        )}
      </Button>
    </form>
  );
}
