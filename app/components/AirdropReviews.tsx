"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Review {
  id: string;
  airdropId: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

interface Props {
  airdropId: string;
  airdropName: string;
}

export default function AirdropReviews({ airdropId, airdropName }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");

  // Load reviews from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("airdropReviews");
    if (stored) {
      const allReviews: Review[] = JSON.parse(stored);
      const filtered = allReviews.filter((r) => r.airdropId === airdropId);
      setReviews(filtered);
    }
  }, [airdropId]);

  const submitReview = () => {
    if (!name.trim() || !rating || !comment.trim()) {
      alert("❌ Please fill all fields and select rating");
      return;
    }

    const newReview: Review = {
      id: Date.now().toString(),
      airdropId,
      name: name.trim(),
      rating,
      comment: comment.trim(),
      date: new Date().toISOString(),
      helpful: 0,
    };

    // Save to localStorage
    const stored = localStorage.getItem("airdropReviews");
    const allReviews: Review[] = stored ? JSON.parse(stored) : [];
    const updated = [newReview, ...allReviews];
    localStorage.setItem("airdropReviews", JSON.stringify(updated));

    setReviews([newReview, ...reviews]);
    setName("");
    setRating(0);
    setComment("");
    setShowForm(false);
  };

  const markHelpful = (reviewId: string) => {
    const stored = localStorage.getItem("airdropReviews");
    if (!stored) return;

    const allReviews: Review[] = JSON.parse(stored);
    const updated = allReviews.map((r) =>
      r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r
    );
    localStorage.setItem("airdropReviews", JSON.stringify(updated));

    const filtered = updated.filter((r) => r.airdropId === airdropId);
    setReviews(filtered);
  };

  // Calculate average rating
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  // Rating distribution
  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    percent:
      reviews.length > 0
        ? (reviews.filter((r) => r.rating === star).length / reviews.length) * 100
        : 0,
  }));

  return (
    <div className="mt-8 bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        ⭐ <span className="rainbow-text">User Reviews</span>
      </h2>

      {/* Rating Summary */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Average Rating */}
        <div className="text-center">
          <div className="text-6xl font-bold text-yellow-400 mb-2">
            {avgRating.toFixed(1)}
          </div>
          <div className="flex justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`text-2xl ${
                  star <= Math.round(avgRating) ? "text-yellow-400" : "text-gray-600"
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <p className="text-gray-400 text-sm">
            Based on {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
          </p>
        </div>

        {/* Rating Bars */}
        <div className="space-y-2">
          {distribution.map((d) => (
            <div key={d.star} className="flex items-center gap-3 text-sm">
              <span className="text-yellow-400 w-8">{d.star}★</span>
              <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${d.percent}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
                />
              </div>
              <span className="text-gray-400 w-10 text-right">{d.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Add Review Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-6 py-3 rounded-xl transition mb-6"
      >
        {showForm ? "❌ Cancel" : "✍️ Write a Review"}
      </button>

      {/* Review Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 overflow-hidden"
          >
            <div className="bg-gray-800/50 rounded-xl p-5 space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className={`text-4xl transition ${
                        star <= (hoveredRating || rating)
                          ? "text-yellow-400 scale-110"
                          : "text-gray-600"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Your Review</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={`Share your experience with ${airdropName}...`}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <button
                onClick={submitReview}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition"
              >
                🚀 Submit Review
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="text-center py-10 bg-gray-800/30 rounded-xl">
          <p className="text-gray-400 mb-2">No reviews yet</p>
          <p className="text-sm text-gray-500">Be the first to review!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-purple-500/50 transition"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold">
                    {review.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold">{review.name}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(review.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-lg ${
                        star <= review.rating ? "text-yellow-400" : "text-gray-600"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-gray-300 mb-3">{review.comment}</p>
              <button
                onClick={() => markHelpful(review.id)}
                className="text-xs text-gray-400 hover:text-purple-400 transition flex items-center gap-1"
              >
                👍 Helpful ({review.helpful})
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}