import { useState } from "react";
import axios from "axios";

export default function Journal() {
  const [mood, setMood] = useState("");
  const [entry, setEntry] = useState("");

  const moods = ["😄", "😐", "😢", "😡", "😌"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Sending Data:", { mood, entry });

    try {
      const res = await axios.post(
        "http://localhost:3000/api/journal/createjournals",
        {
          content: `${mood} ${entry}`, // combine mood + entry
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Response:", res.data);
      alert("Journal saved!");
      setMood("");
      setEntry("");
    } catch (err) {
      console.error("Error saving journal:", err);
      alert("Error saving journal, check console.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary via-accent to-secondary p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-6 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-center text-primary mb-4">
          How are you feeling today?
        </h2>

        {/* Mood Selection */}
        <div className="flex justify-around mb-4">
          {moods.map((emoji) => (
            <button
              type="button"
              key={emoji}
              onClick={() => setMood(emoji)}
              className={`text-3xl transition transform hover:scale-125 ${
                mood === emoji ? "ring-2 ring-primary rounded-full p-1" : ""
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>

        {/* Journal Entry */}
        <textarea
          placeholder="Write your thoughts..."
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
          rows="4"
          required
        ></textarea>

        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Save Journal
        </button>
      </form>
    </div>
  );
}
