export default function Footer() {
  return (
    <footer className="bg-white py-6 mt-auto">
      <div className="container mx-auto max-w-[600px] px-4">
        <div className="text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} IdeaSpark. All rights reserved.</p>
          <p className="mt-1">Powered by AI - <span className="text-teal-500">No ads, 100% free</span></p>
        </div>
      </div>
    </footer>
  );
}
