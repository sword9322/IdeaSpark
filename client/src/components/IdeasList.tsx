interface IdeasListProps {
  ideas: string[];
}

export default function IdeasList({ ideas }: IdeasListProps) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Generated Ideas:</h2>
      <ul className="space-y-4">
        {ideas.map((idea, index) => (
          <li key={index} className="flex">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-teal-500 flex items-center justify-center mr-3 mt-0.5">
              <span className="text-white text-sm font-medium">{index + 1}</span>
            </div>
            <p className="text-gray-700 text-lg">{idea}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
