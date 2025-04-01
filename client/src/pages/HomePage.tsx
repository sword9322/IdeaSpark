import { useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import PromptForm from "@/components/PromptForm";
import { useGenerateIdeas } from "@/hooks/useGenerateIdeas";

export default function HomePage() {
  const [, setLocation] = useLocation();
  const { mutate, isPending } = useGenerateIdeas();

  const handleGenerateIdeas = (prompt: string, category: string) => {
    mutate(
      { prompt, category: category as "Business" | "Story" | "App" | "Product" | "Marketing" | "Social Media" | "Education" | "Technology" | "Food" | "Travel" },
      {
        onSuccess: (data) => {
          setLocation(`/results/${data.id}`);
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto max-w-[600px] px-4 py-8">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <PromptForm
              onSubmit={handleGenerateIdeas}
              isLoading={isPending}
            />
          </div>
          <Banner />
        </div>
      </main>
      <Footer />
    </div>
  );
}
