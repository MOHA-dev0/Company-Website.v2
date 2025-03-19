"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/app/utils/database";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { account } from "@/app/utils/appwrite";

const LODING_LABEL = "Loading...";
const NOT_FOUND_LABEL = "Post not found.";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = account.get();

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await db.posts.get(id);
        setPost(response);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-600">{LODING_LABEL}</p>;
  }

  if (!post) {
    return <p className="text-center text-gray-600">{NOT_FOUND_LABEL}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-center text-gray-500 text-sm">
          Created at:{" "}
          {new Date(post.$createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h1>
        <h2 className="text-5xl font-extrabold text-gray-900 mb-8 text-center">
          {post.title}
        </h2>

        <div className="mb-8">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-auto rounded-lg shadow-2xl object-cover"
          />
        </div>

        <div className="prose prose-lg text-gray-700 max-w-none">
          <p>{post.description}</p>
        </div>

        <div className="mt-12 text-center">
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300">
              Back to Posts
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
