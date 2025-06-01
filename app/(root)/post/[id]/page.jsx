"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { db, Query } from "@/app/utils/database";
import { Button } from "@/components/ui/button";
import { account } from "@/app/utils/appwrite";
import Link from "next/link";
import { FiClock, FiUser, FiMessageSquare, FiArrowLeft } from "react-icons/fi";

const LOADING_LABEL = "📡 Loading article...";
const NOT_FOUND_LABEL = "⚠️ Article not found";
const COMMENT_LABEL = "Comments";
const SUBMIT_LABEL = "Post Comment";
const NOT_FOUND_COMMENTS_LABEL = "🤷‍♂️ No comments yet - be the first!";

export default function NewsDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [user, setUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await account.get();
        setUser(userData);
      } catch (error) {
        console.log("User not logged in");
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await db.posts.get(id);
        setPost(response);
        fetchComments(response.$id);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    }

    async function fetchComments(postId) {
      try {
        const response = await db.comments.list([
          Query.equal("postId", postId),
          Query.orderDesc("$createdAt"),
        ]);
        setComments(response.documents || []);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }

    fetchPost();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      alert("Please enter a comment before submitting.");
      return;
    }

    setIsSubmitting(true);
    try {
      const comment = await db.comments.create({
        postId: post.$id,
        userId: user.$id,
        userName: user.name || "Anonymous",
        userEmail: user.email,
        content: newComment,
      });

      setComments([comment, ...comments]);
      setNewComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="text-4xl"
        >
          🌐
        </motion.div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg"
        >
          <div className="text-6xl mb-6">📰</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {NOT_FOUND_LABEL}
          </h1>
          <Link href="/">
            <Button className="mt-6 rounded-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl transition-all">
              <FiArrowLeft className="mr-2" /> Back to News
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link href={`/profile/${user?.$id}`}>
            <Button
              variant="ghost"
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <FiArrowLeft className="mr-2" /> All News
            </Button>
          </Link>
        </motion.div>

        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
            <FiClock className="mr-2" />
            {new Date(post.$createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            {post.title}
          </h1>
          <div className="flex items-center justify-center space-x-4 text-gray-500">
            <div className="flex items-center">
              <FiUser className="mr-2" />
              <span>By {post.author || "News Team"}</span>
            </div>
            <div className="flex items-center">
              <FiMessageSquare className="mr-2" />
              <span>{comments.length} comments</span>
            </div>
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-auto max-h-[600px] object-cover"
          />
        </motion.div>

        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="prose prose-lg max-w-none bg-white/90 backdrop-blur-sm p-8 sm:p-10 rounded-2xl shadow-lg mb-16"
        >
          <div className="text-gray-700 leading-relaxed">
            {post.description}
          </div>
        </motion.article>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <FiMessageSquare className="mr-3 text-blue-500" />
            {COMMENT_LABEL} ({comments.length})
          </h2>

          {user ? (
            <form onSubmit={handleCommentSubmit} className="mb-12">
              <motion.div whileHover={{ scale: 1.01 }} className="mb-6">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none shadow-sm"
                  rows="5"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  className="rounded-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Posting..." : SUBMIT_LABEL}
                </Button>
              </motion.div>
            </form>
          ) : (
            <div className="bg-blue-50/50 p-6 rounded-xl mb-12 text-center">
              <p className="text-gray-700">
                Please{" "}
                <Link
                  href="/login"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  sign in
                </Link>{" "}
                to post a comment.
              </p>
            </div>
          )}

          <div className="space-y-6">
            <AnimatePresence>
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <motion.article
                    key={comment.$id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-3 rounded-full flex-shrink-0">
                        <FiUser className="text-blue-500 text-xl" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <h4 className="font-semibold text-gray-800">
                            {comment.userName}
                          </h4>
                          <span className="text-sm text-gray-500 mt-1 sm:mt-0">
                            {new Date(comment.$createdAt).toLocaleString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </span>
                        </div>
                        <p className="text-gray-700 mt-3">{comment.content}</p>
                      </div>
                    </div>
                  </motion.article>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12 bg-gray-50 rounded-xl"
                >
                  <div className="text-5xl mb-4">💬</div>
                  <p className="text-gray-600">{NOT_FOUND_COMMENTS_LABEL}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
