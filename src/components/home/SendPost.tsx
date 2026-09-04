import Avatar from "../Ui/Avatar";
import React, { useState } from "react";
import { Image, Send, X } from "lucide-react";
import { useAddNewPostMutation } from "../../hooks/useAddNewPostMutation";
import { useAuthStore } from "../../store/authStore";
import { useUploadProfileImage } from "../../hooks/useUploadProfileImage";
import type { createPostPayloadType } from "../../services/postServices";
import toast from "react-hot-toast";

export default function SendPost() {
  const [text, setText] = useState("");
  const { user , isAuthenticated } = useAuthStore();

  const { mutate: addNewPostMutation, isPending: isAddingPost } =
    useAddNewPostMutation();

  const { mutate: uploadImage, isPending: isUploadingImage } =
    useUploadProfileImage();

  const [postImage, setPostImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setPostImage(file);
    setPreview(URL.createObjectURL(file));

    // let the same file fire onChange again after it is removed
    e.target.value = "";
  }

  function removeImage() {
    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setPostImage(null);
    setPreview(null);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.trim()) return;

    if(!isAuthenticated){
      toast.error("you must be login to send post")
      return
    }

    const createPost = (image?: string) => {
      const postData: createPostPayloadType = {
        content: text.trim(),
      };

      if (image) {
        postData.image = image;
      }

      addNewPostMutation(postData, {
        onSuccess: () => {
          setText("");
          removeImage();
        },
      });
    };

    if (postImage) {
      uploadImage(postImage, {
        onSuccess: (data) => {
          createPost(data.file);
        },

        onError: () => {
          toast.error("Could not upload the image, please try again");
        },
      });

      return;
    }

    createPost();
  };

  const isSubmitting = isUploadingImage || isAddingPost;

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 rounded-2xl border border-[#E3E3E3] p-6 shadow-[0_2px_5px_rgba(0,0,0,0.08)] dark:border-[#3A3A3A] dark:bg-[#0A0A0A] dark:shadow-[0_2px_5px_rgba(0,0,0,0.25)]"
    >
      <div className="flex items-start gap-4.5">
        <div className="relative flex size-12.5 shrink-0 items-center justify-center overflow-hidden rounded-full">
          <Avatar src={user?.image} width={40} height={40} />
        </div>

        <div className="w-full">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's on your mind?"
            rows={1}
            className="mt-2 field-sizing-content w-full resize-none border-0 bg-transparent px-0 py-1 text-base leading-6 text-[#222] outline-none placeholder:text-[#858585] focus:ring-0 dark:text-white dark:placeholder:text-[#999]"
          />

          {preview && (
            <div className="relative mt-4 w-fit">
              <img
                src={preview}
                alt="Post preview"
                className="max-h-80 max-w-full rounded-xl object-cover"
              />

              <button
                type="button"
                onClick={removeImage}
                className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black"
              >
                <X size={18} />
              </button>
            </div>
          )}

          {postImage && !text.trim() && (
            <p className="mt-3 text-sm text-[#858585] dark:text-[#999]">
              Add a caption - a post can&apos;t be image-only.
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 h-px w-full bg-[#DEDEDE] dark:bg-[#3A3A3A]" />

      <div className="mt-5 flex items-center justify-between">
        <label
          htmlFor="postImage"
          className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#555] transition hover:bg-[#F3F3F3] dark:text-[#CCC] dark:hover:bg-[#1A1A1A]"
        >
          <Image size={20} />
          <span>Add image</span>
        </label>

        <input
          id="postImage"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />

        <button
          type="submit"
          disabled={!text.trim() || isSubmitting}
          className="flex h-10.5 min-w-25.5 items-center justify-center gap-2 rounded-[7px] bg-[#262626] text-base text-white shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-colors hover:bg-[#171717] disabled:cursor-not-allowed disabled:bg-[#737373] disabled:text-[#404040] dark:bg-white dark:text-black dark:hover:bg-[#E5E5E5] dark:disabled:bg-[#737373] dark:disabled:text-[#404040]"
        >
          <Send size={19} strokeWidth={1.8} />

          <span>
            {isUploadingImage
              ? "Uploading..."
              : isAddingPost
                ? "Posting..."
                : "Post"}
          </span>
        </button>
      </div>
    </form>
  );
}
