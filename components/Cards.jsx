"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { db } from "@/app/utils/database";
import { account, ID, teams } from "@/app/utils/appwrite";
import Link from "next/link";

const EDIT_LABEL = "✏️ Edit";
const NOT_FOUND_LABEL = "📭 No posts found";
const NOT_FOUND_DESCRIPTION =
  "It seems like there are no stories available at the moment. Please check back later!";

const LOADING_LABEL = "🌀 Loading Stories...";
const READ_MORE = "Explore →";

export default function PremiumNewsCards() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [featuredPost, setFeaturedPost] = useState(null);
  const cardsRef = useRef([]);

  // 3D Tilt Effect
  const onMouseMove = (e, index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    card.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
    card.style.boxShadow = `${-x * 2}px ${y * 2}px 30px rgba(0,0,0,0.1)`;
  };

  const onMouseLeave = (index) => {
    const card = cardsRef.current[index];
    if (card) {
      card.style.transform = "rotateY(0deg) rotateX(0deg)";
      card.style.boxShadow = "0 10px 30px -5px rgba(0,0,0,0.1)";
    }
  };

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await db.posts.list();
        const sortedPosts = [...response.documents].sort(
          (a, b) => new Date(b.$createdAt) - new Date(a.$createdAt)
        );
        setPosts(sortedPosts);
        setFeaturedPost(sortedPosts[0]);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  useEffect(() => {
    async function checkAdmin() {
      try {
        const user = await account.get();
        const userTeams = await teams.list();
        setIsAdmin(userTeams.teams.some((team) => team.name === "admins"));
      } catch (error) {
        console.error("Error checking admin status:", error);
      }
    }
    checkAdmin();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="text-5xl"
        >
          🌈
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(159,122,234,0.1)_0,_transparent_70%)]"></div>
        </div>

        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-20 group perspective-1000"
          >
            <Link href={`/post/${featuredPost.$id}`}>
              <div
                ref={(el) => (cardsRef.current[0] = el)}
                onMouseMove={(e) => onMouseMove(e, 0)}
                onMouseLeave={() => onMouseLeave(0)}
                className="relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-500 ease-out border border-white/30 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-lg"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="absolute inset-0 rounded-3xl p-[2px]">
                  <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,#e2cbff_0%,#393bb2_50%,#e2cbff_100%)] opacity-30 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                </div>

                <div className="relative z-10 h-full">
                  <div className="absolute inset-0">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  </div>

                  <div className="relative z-20 p-8 md:p-12 lg:p-16 h-[600px] flex flex-col justify-end">
                    <div className="max-w-2xl">
                      <span className="inline-block px-4 py-2 mb-4 text-sm font-bold tracking-wider text-white bg-gradient-to-r from-purple-600 to-pink-500 rounded-full shadow-lg">
                        ✨ Featured Story
                      </span>
                      <CardTitle className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-xl">
                        {featuredPost.title}
                      </CardTitle>
                      <CardDescription className="text-xl text-gray-200 mb-8 line-clamp-3 drop-shadow-lg">
                        {featuredPost.description}
                      </CardDescription>
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          className="text-white hover:bg-white/20 border-2 border-white/30 hover:border-white/50 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
                        >
                          {READ_MORE}
                        </Button>
                        {isAdmin && (
                          <Link href={`/posts/${featuredPost.$id}`}>
                            <Button
                              variant="outline"
                              className="bg-white/20 text-white hover:bg-white/30 px-6 py-3 rounded-full border-2 border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-105"
                            >
                              {EDIT_LABEL}
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* News Grid */}
        {posts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {posts
              .filter((post) => post.$id !== featuredPost?.$id)
              .map((post, index) => (
                <motion.div
                  key={post.$id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="group relative perspective-1000"
                >
                  <Card
                    ref={(el) => (cardsRef.current[index + 1] = el)}
                    onMouseMove={(e) => onMouseMove(e, index + 1)}
                    onMouseLeave={() => onMouseLeave(index + 1)}
                    className="h-full flex flex-col overflow-hidden bg-white/80 backdrop-blur-sm border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 ease-out group-hover:-translate-y-3 rounded-2xl"
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <Link href={`/post/${post.$id}`}>
                      <CardHeader className="p-0 relative overflow-hidden h-60">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        <div className="absolute top-4 right-4">
                          <span className="inline-flex items-center px-3 py-1 text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-md">
                            New
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6 flex-grow">
                        <CardTitle className="text-2xl font-bold mb-3 text-gray-800 line-clamp-2">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="text-gray-600 line-clamp-3 mb-6">
                          {post.description}
                        </CardDescription>
                      </CardContent>
                      <div className="px-6 pb-6 flex justify-between items-center">
                        <motion.button
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="group flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                        >
                          Read More
                          <motion.span
                            animate={{ x: [0, 3, 0] }}
                            transition={{
                              repeat: Infinity,
                              duration: 1.5,
                              ease: "easeInOut",
                            }}
                            className="inline-block group-hover:translate-x-1 transition-transform"
                          >
                            →
                          </motion.span>
                        </motion.button>
                        {isAdmin && (
                          <Link href={`/posts/${post.$id}`}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-500 hover:text-gray-900 rounded-full p-2 hover:bg-gray-100 transition-all"
                            >
                              ✏️
                            </Button>
                          </Link>
                        )}
                      </div>
                    </Link>
                  </Card>
                </motion.div>
              ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center py-24"
          >
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-7xl mb-6 inline-block"
            >
              🌌
            </motion.div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              {NOT_FOUND_LABEL}
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {NOT_FOUND_DESCRIPTION}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
