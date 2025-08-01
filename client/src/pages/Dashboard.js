import { useEffect, useState } from "react";
import axios from "axios";
import Chatbot from "../components/Chatbot";

// Mood mapping with emojis
const moodOptions = {
  happy: "😄",
  neutral: "😐",
  sad: "😢",
  angry: "😡",
  relaxed: "😌",
};

export default function Dashboard() {
  const [journals, setJournals] = useState([]);
  const [streak, setStreak] = useState(0);
  const [selectedMood, setSelectedMood] = useState("");

  const calculateStreak = (entries) => {
    if (!entries.length) return 0;

    const sorted = [...entries].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    let count = 1;
    let prevDate = new Date(sorted[0].createdAt);

    for (let i = 1; i < sorted.length; i++) {
      const currentDate = new Date(sorted[i].createdAt);

      const diff =
        (prevDate.setHours(0, 0, 0, 0) - currentDate.setHours(0, 0, 0, 0)) /
        (1000 * 60 * 60 * 24);

      if (diff === 1) {
        count++;
        prevDate = currentDate;
      } else if (diff > 1) {
        break;
      }
    }

    return count;
  };

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:3000/api/journal/getjournals",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setJournals(res.data);
        setStreak(calculateStreak(res.data));
      } catch (err) {
        console.error("Error fetching journals:", err);
      }
    };

    fetchJournals();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-accent to-secondary py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary text-center mb-6">
          Your Journal Dashboard
        </h1>

        {/* Mood Selection */}
        <div className="flex justify-center gap-4 mb-6">
          {Object.entries(moodOptions).map(([mood, emoji]) => (
            <button
              key={mood}
              onClick={() => setSelectedMood(mood)}
              className={`text-3xl transition-transform ${
                selectedMood === mood ? "scale-125" : ""
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>

        {/* Stats Section */}
        <div className="flex justify-center gap-8 mb-10">
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 w-40 text-center">
            <p className="text-2xl font-bold text-primary">{journals.length}</p>
            <p className="text-gray-700 text-sm">Total Entries</p>
          </div>
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 w-40 text-center">
            <p className="text-2xl font-bold text-primary">{streak} days</p>
            <p className="text-gray-700 text-sm">Current Streak</p>
          </div>
        </div>

        {/* Journal Entries */}
        {journals.length === 0 ? (
          <p className="text-center text-gray-700 bg-white/70 rounded-lg shadow p-6">
            No journal entries yet. Start writing to see them here!
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {journals.map((journal) => (
              <div
                key={journal._id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow"
              >
                <div className="text-3xl mb-2">
                  {moodOptions[journal.mood] || "😐"} {journal.mood}
                </div>
                <p className="text-gray-800 mb-4">
                  {journal.entry || journal.content}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(journal.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Chatbot */}
      <Chatbot mood={selectedMood} moodEmoji={moodOptions[selectedMood]} />
    </div>
  );
}
