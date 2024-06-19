import { useState } from "react";
import { useParams } from "react-router-dom";

const BASE_URL = "http://localhost:8000";
function DisputeForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [dispute, setDispute] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { transactionID } = useParams();

  const clearMessages = () => {
    setTimeout(() => {
      setMessage("");
      setError("");
    }, 5000); // Messages will disappear after 5 seconds
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //FIXME - On other API, the URL should be BASE_URL/disputes/transactionID instead
    const url = `${BASE_URL}/disputes`;

    setIsLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, dispute, transactionID }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      await response.json();
      setMessage("Dispute submitted successfully!");
      setError("");
      setEmail(""); // Clear email input
      setDispute(""); // Clear dispute textarea
    } catch (error) {
      setError(`Failed to submit dispute: ${error.message}`);
      setMessage("");
    } finally {
      setIsLoading(false);
      clearMessages();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-xl mx-auto p-7">
        <div className="mb-8 space-y-3">
          <p className="text-xl font-semibold">Register Dispute</p>
          <p className="text-gray-500">
            Enter your email and dispute, we&apos;ll resolve it in no time.
          </p>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="space-y-3 ">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium " htmlFor="email">
                  Email
                </label>
                <input
                  className="flex w-full h-10 px-3 py-2 text-sm border rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="email"
                  placeholder="mail@example.com"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium ">
                  Your dispute
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="p-2.5 w-full text-sm  rounded-md border  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 "
                  placeholder="Your dispute..."
                  value={dispute}
                  onChange={(e) => setDispute(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>
            <button
              className="flex items-center justify-center w-full h-10 px-4 py-2 text-sm font-medium text-white transition-colors bg-black rounded-md ring-offset-background focus-visible:ring-ring whitespace-nowrap hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              type="submit"
            >
              {isLoading ? "loading..." : "Submit Dispute"}
            </button>
          </div>
        </form>

        {message && (
          <p className="p-4 mt-4 text-green-700 bg-green-100 rounded-md">
            {message}
          </p>
        )}
        {error && (
          <p className="p-4 mt-4 text-red-700 bg-red-100 rounded-md">{error}</p>
        )}
      </div>
    </div>
  );
}

export default DisputeForm;
