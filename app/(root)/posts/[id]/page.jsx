"use client";
import { useEffect, useState } from "react";
import { uploadImage } from "@/app/utils/appwrite";
import { db } from "@/app/utils/database";
import { Button } from "@/components/ui/button";
import { useRouter, useParams } from "next/navigation";

export default function page() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const router = useRouter();
  const params = useParams();

  async function handleFileInput(e) {
    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  }
  useEffect(() => {
    if (!params || !params.id) return;
    db.posts.get(params.id).then((post) => {
      setTitle(post.title);
      setDescription(post.description);
      setPreview(post.image);
    });
  }, []);

  async function handleUpdate() {
    try {
      await db.posts.update(params.id, { title, description });

      if (image) {
        const uploadedImage = await uploadImage(image);
        await db.posts.update(params.id, { image: uploadedImage });
      }
      alert("Post Updated Successfully");
      router.push(`/admin`);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  }
  async function HandelDelete() {
    try {
      await db.posts.delete(params.id);
      alert("Post Deleted Successfully");
      router.push(`/admin`);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-8 space-y-6 transition-all duration-300 hover:shadow-3xl">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Edit Post
        </h1>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="Enter post title..."
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Media</label>
          <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-xl cursor-pointer transition-colors duration-200">
            <input
              type="file"
              onChange={handleFileInput}
              className="hidden"
              id="image-upload"
              accept="image/*"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer w-full h-full"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-fill rounded-lg"
                />
              ) : (
                <div className="text-center p-4 w-full h-full flex items-center justify-center">
                  <p className="text-gray-500 text-sm">
                    Click to upload an image
                  </p>
                  <p className="text-gray-400 text-xs mt-2">
                    PNG, JPG up to 10MB
                  </p>
                </div>
              )}
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="Write your post content..."
            required
          />
        </div>

        <Button
          onClick={handleUpdate}
          className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-[1.01] shadow-lg"
        >
          Update
        </Button>
        <Button
          onClick={HandelDelete}
          className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-[1.01] shadow-lg"
        >
          Delete
        </Button>
      </form>
    </div>
  );
}
