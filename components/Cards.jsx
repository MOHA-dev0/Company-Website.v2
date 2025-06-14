"use client";
<<<<<<< HEAD
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
=======
import { useEffect, useState } from "react";
>>>>>>> Admin-Recive-Message#5
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { db } from "@/app/utils/database";
<<<<<<< HEAD
import { account, teams } from "@/app/utils/appwrite";
import Link from "next/link";
import SearchBar from "./userpage/SearchBar";

const EDIT_LABEL = "✏️ Edit";
const NOT_FOUND_LABEL = "📭 No posts found";
const NOT_FOUND_DESCRIPTION =
  "It seems like there are no Posts available at the moment. Please check back later!";

const LOADING_LABEL = "🌀 Loading Posts...";
const READ_MORE = "Explore →";

export default function PremiumNewsCards() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState([]);
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
=======
import { account, ID, teams } from "@/app/utils/appwrite";
import Link from "next/link";

const EDIT_LABEL = "Edit";
const NOT_FOUND_LABEL = "No posts found.";
const LODING_LABEL = "Loading...";

export default function Cards() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
>>>>>>> Admin-Recive-Message#5

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await db.posts.list();
<<<<<<< HEAD
        const sortedPosts = [...response.documents].sort(
          (a, b) => new Date(b.$createdAt) - new Date(a.$createdAt)
        );
        setPosts(sortedPosts);
        setFilteredPosts(sortedPosts);
        setFeaturedPost(sortedPosts[0]);
=======
        setPosts(response.documents);
>>>>>>> Admin-Recive-Message#5
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }
<<<<<<< HEAD
=======

>>>>>>> Admin-Recive-Message#5
    fetchPosts();
  }, []);

  useEffect(() => {
    async function checkAdmin() {
      try {
        const user = await account.get();
        const userTeams = await teams.list();
<<<<<<< HEAD
        setIsAdmin(userTeams.teams.some((team) => team.name === "admins"));
=======

        if (userTeams.teams.some((team) => team.name === "admins")) {
          setIsAdmin(true);
        }
>>>>>>> Admin-Recive-Message#5
      } catch (error) {
        console.error("Error checking admin status:", error);
      }
    }
<<<<<<< HEAD
=======

>>>>>>> Admin-Recive-Message#5
    checkAdmin();
  }, []);

  if (loading) {
<<<<<<< HEAD
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="text-5xl"
        >
          🌐
        </motion.div>
      </div>
    );
  }
  let CheckIsAdmin;
  if (isAdmin) {
    CheckIsAdmin = `?admin=true`;
  } else {
    CheckIsAdmin = "";
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(159,122,234,0.1)_0,_transparent_70%)]"></div>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-20 group"
            onMouseMove={(e) => {
              const card = e.currentTarget;
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              const rotateY = ((x - centerX) / centerX) * 5; // Reduced rotation amount
              const rotateX = ((centerY - y) / centerY) * 5; // Reduced rotation amount

              card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "perspective(1000px) rotateX(0) rotateY(0)";
            }}
          >
            <div className="relative overflow-hidden rounded-3xl shadow-xl border border-white/30 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-lg">
              {/* Image with subtle zoom effect */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-20 p-8 md:p-12 lg:p-16 h-[500px] flex flex-col justify-end">
                <div className="max-w-2xl">
                  <span className="inline-block px-4 py-2 mb-4 text-sm font-bold tracking-wider text-white bg-gradient-to-r from-purple-600 to-pink-500 rounded-full shadow">
                    ✨ Featured Story
                  </span>
                  <CardTitle className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                    {featuredPost.title}
                  </CardTitle>
                  <CardDescription className="text-lg text-gray-200 mb-6 line-clamp-3">
                    {featuredPost.description}
                  </CardDescription>

                  <div className="flex items-center space-x-3">
                    <Link href={`/post/${featuredPost.$id}${CheckIsAdmin}`}>
                      <Button
                        variant="ghost"
                        className="text-white hover:bg-white/20 border border-white/30 hover:border-white/50 px-5 py-2 rounded-full transition-colors"
                      >
                        {READ_MORE}
                      </Button>
                    </Link>

                    {isAdmin && (
                      <Link href={`/posts/${featuredPost.$id}`}>
                        <Button
                          variant="outline"
                          className="bg-white/20 text-white hover:bg-white/30 px-5 py-2 rounded-full border border-white/30 hover:border-white/50 transition-colors"
                        >
                          {EDIT_LABEL}
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* News Grid */}
        <SearchBar posts={posts} onSearchResults={setFilteredPosts} />

        {filteredPosts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPosts
              .filter((post) => post.$id !== featuredPost?.$id)
              .map((post, index) => (
                <motion.div
                  key={post.$id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="group relative perspective-1000"
                  ref={(el) => (cardsRef.current[index + 1] = el)}
                  onMouseMove={(e) => onMouseMove(e, index + 1)}
                  onMouseLeave={() => onMouseLeave(index + 1)}
                >
                  <Card
                    className="h-full flex flex-col overflow-hidden bg-white/80 backdrop-blur-sm border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 ease-out group-hover:-translate-y-3 rounded-2xl"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <CardHeader className="p-0 relative overflow-hidden h-60">
                      <Link
                        href={`/post/${post.$id}${CheckIsAdmin}`}
                        legacyBehavior
                      >
                        <a className="block w-full h-full">
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
                        </a>
                      </Link>
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
                      <Link
                        href={`/post/${post.$id}${CheckIsAdmin}`}
                        legacyBehavior
                      >
                        <a className="group flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition-colors">
                          <motion.span
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            Read More
                          </motion.span>
                          <motion.span
                            whileHover={{ x: 10 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            →
                          </motion.span>
                        </a>
                      </Link>

                      {isAdmin && (
                        <Link href={`/posts/${post.$id}`} legacyBehavior>
                          <a>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-gray-700"
                            >
                              {EDIT_LABEL}
                            </Button>
                          </a>
                        </Link>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[300px] text-gray-500 text-center">
            <p className="text-2xl mb-3">{NOT_FOUND_LABEL}</p>
            <p>{NOT_FOUND_DESCRIPTION}</p>
          </div>
        )}
      </div>
=======
    return <p className="text-center text-gray-600">{LODING_LABEL}</p>;
  }

  return (
    <div className="flex flex-wrap gap-4 justify-start">
      {posts.length > 0 ? (
        posts.map((post) => (
          <Card key={post.$id} className="w-80 shadow-lg rounded-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-bold">{post.title}</CardTitle>
            </CardHeader>
            <Link href={`/post/${post.$id}`}>
              <CardContent className="flex justify-center">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-40 h-40 object-cover rounded-lg"
                />
              </CardContent>

              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  {post.description}
                </CardDescription>
              </CardContent>
            </Link>
            {isAdmin && (
              <CardContent>
                <Button>
                  <Link href={`/posts/${post.$id}`}>{EDIT_LABEL}</Link>
                </Button>
              </CardContent>
            )}
          </Card>
        ))
      ) : (
        <p className="text-center col-span-3 text-gray-600">
          {NOT_FOUND_LABEL}
        </p>
      )}
>>>>>>> Admin-Recive-Message#5
    </div>
  );
}
