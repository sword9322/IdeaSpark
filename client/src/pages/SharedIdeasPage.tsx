import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import IdeasList from "@/components/IdeasList";
import SharingOptions from "@/components/SharingOptions";
import { Skeleton } from "@/components/ui/skeleton";

export default function SharedIdeasPage() {
  const { id } = useParams();
  const [, setLocation] = useLocation();

  const { data, isLoading, error } = useQuery({
    queryKey: [`/api/ideas/${id}`],
  });

  const handleCreateNew = () => {
    setLocation("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto max-w-[600px] px-4 py-8">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="mb-6 pb-4 border-b border-gray-100">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2 mt-2" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto max-w-[600px] px-4 py-8">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-lg font-medium text-red-500">Error loading ideas</h2>
              <p className="text-gray-600 mt-2">We couldn't find the requested ideas. They may have been deleted or the link is incorrect.</p>
              <button 
                className="mt-4 text-teal-500 hover:text-teal-700 font-medium"
                onClick={handleCreateNew}
              >
                ← Create Your Own Ideas
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto max-w-[600px] px-4 py-8">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="mb-6 pb-4 border-b border-gray-100">
              <h2 className="text-lg font-medium text-gray-800 mb-1">Shared ideas:</h2>
              <p className="text-gray-600">
                <span>{data.prompt}</span>
                <span className="text-gray-500"> ({data.category})</span>
              </p>
            </div>
            
            <IdeasList ideas={data.ideas} />
            
            <SharingOptions id={id} />
          </div>
          
          <div className="flex flex-col space-y-4">
            <button 
              className="text-teal-500 hover:text-teal-700 font-medium"
              onClick={handleCreateNew}
            >
              ← Create Your Own Ideas
            </button>
            
            <Banner />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
