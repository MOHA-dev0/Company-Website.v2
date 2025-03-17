"use client";
import { useState, useEffect } from "react";
import { uploadImage, account } from "@/app/utils/appwrite";
import { db } from "@/app/utils/database";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CreateNewPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [preview, setPreview] = useState("");
  const router = useRouter();

  // router protection
  useEffect(() => {
    const user = account.get();

    user.then(
      (res) => {
        setUserInfo(res);
      },
      (error) => {
        router.push("/login");
      }
    );
  }, [router]);

  const handleImageChange = (file) => {
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    handleImageChange(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "";

      if (image) {
        const uploadResponse = await uploadImage(image);

        if (!uploadResponse || !uploadResponse.$id) {
          throw new Error("Image upload failed");
        }

        imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/67c473c5000b71ec23e0/files/${uploadResponse.$id}/view?project=67b9cb2500144405cbac&mode=admin`;
      } else {
        throw new Error("Image is required, please upload an image.");
      }

      if (!imageUrl) {
        throw new Error("Image URL is empty, upload failed.");
      }
      if (!description.trim()) {
        throw new Error(
          "Description cannot be empty, please provide a description."
        );
      }

      if (!description) {
        throw new Error("All fields (description) are required");
      }

      const response = await db.posts.create({
        title: title,
        description: description,
        image: imageUrl,
      });

      alert("Post published successfully!");
      router.push("/admin");
    } catch (error) {
      console.error("Failed to publish post:", error.message);
      alert("Failed to publish post: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-8 space-y-6 transition-all duration-300 hover:shadow-3xl"
      >
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Create New Post
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
          type="submit"
          className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-[1.01] shadow-lg"
        >
          Publish Post
        </Button>
      </form>
    </div>
  );
}
