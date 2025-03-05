"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { db } from "@/app/utils/database";

export default function Cards() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await db.posts.list();
        setPosts(response.documents);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  return (
    <div className="flex flex-wrap gap-6 justify-start">
      {posts.length > 0 ? (
        posts.map((post) => (
          <Card key={post.$id} className="w-80 shadow-lg rounded-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-bold">{post.title}</CardTitle>
            </CardHeader>

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
          </Card>
        ))
      ) : (
        <p className="text-center col-span-3 text-gray-600">No posts found.</p>
      )}
    </div>
  );
}
