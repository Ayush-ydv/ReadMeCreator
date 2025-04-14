// ReadMe Creator Pro - Main App

"use client";

import { useState } from "react";

export default function ReadMeCreator() {
  const [formData, setFormData] = useState<Record<string, string>>({
    title: "",
    description: "",
    installation: "",
    usage: "",
    technologies: "",
    license: "MIT",
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setFormData({
      title: "",
      description: "",
      installation: "",
      usage: "",
      technologies: "",
      license: "MIT",
    });
  };

  const generateMarkdown = () => {
    return `# ${formData.title}

${formData.description}

## Installation

\`\`\`
${formData.installation}
\`\`\`

## Usage

\`\`\`
${formData.usage}
\`\`\`

## Technologies Used

${formData.technologies}

## License

${formData.license} License`;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto animate-fade-in">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-600 animate-slide-in">ReadMe Creator Pro 🚀</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-white shadow-md rounded-lg p-6 animate-fade-in-up">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">🛠️ Customize Your README</h2>
          <div className="grid gap-4">
            {Object.keys(formData).map((key) => (
              <div key={key}>
                <label className="block font-semibold capitalize mb-1 text-gray-700">
                  {key.replace(/([A-Z])/g, " $1")}
                </label>
                <textarea
                  name={key}
                  rows={key === "description" ? 4 : 2}
                  value={formData[key]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Preview Section */}
        <div className="bg-gray-100 shadow-inner rounded-lg p-6 overflow-auto animate-fade-in-up">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">📄 Generated README.md</h2>
          <pre className="p-4 bg-white rounded text-sm text-gray-900 whitespace-pre-wrap border border-gray-300">
            {generateMarkdown()}
          </pre>

          <div className="flex flex-wrap gap-4 mt-4">
            <button
              onClick={() => {
                navigator.clipboard.writeText(generateMarkdown());
                alert("Copied to clipboard!");
              }}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-300"
            >
              Copy to Clipboard
            </button>

            <button
              onClick={() => {
                const markdown = generateMarkdown();
                const blob = new Blob([markdown], { type: "text/markdown" });
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = "README.md";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
              }}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-300"
            >
              Download README.md
            </button>

            <button
              onClick={handleReset}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300"
            >
              Reset Fields
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Tailwind animations (add these to your global CSS or Tailwind config if needed)
// .animate-fade-in { @apply opacity-0 animate-fade-in-fwd; }
// .animate-slide-in { @apply translate-y-6 opacity-0 animate-slide-in-up; }
// .animate-fade-in-up { @apply opacity-0 animate-fade-in-up-fwd; }