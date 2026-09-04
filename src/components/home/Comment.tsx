import { useState } from "react";
import { Send, Trash2, Pencil } from "lucide-react";
import { useAddNewCommentMutation } from "../../hooks/useCreateNewCommentMutation";
import type { PostType } from "../../types/AllPostsTypes";
import { useAuthStore } from "../../store/authStore";
import DeleteCommentModal from "../profile/DeleteCommentModal";
import UpdateCommentModal from "../profile/UpdateCommentModal";
import Avatar from "../Ui/Avatar";
import { Link } from "react-router";
import { splitUsername } from "../../utils/splitUsername";

type CommentProps = {
  post: PostType;
};

export default function Comment({ post }: CommentProps) {
  const [text, setText] = useState("");

  const { user } = useAuthStore();
  const [isOpenDeleteCommentModal, setIsOpenDeleteCommentModal] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);

  const [isShowEditCommentModal, setIsShowEditCommentModal] = useState(false);
  const [selectedEditCommentId, setSelectedEditCommentId] = useState<string | null>(null);
  const [selectedEditCommentContent, setSelectedEditCommentContent] = useState<string>("");
  const { mutate: addNewCommentMutation } = useAddNewCommentMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.trim()) return;

    addNewCommentMutation({
      id: post.id,
      content: text.trim(),
    });

    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 pt-4 border-t  border-[#E5E5E5] dark:border-[#262626] "
    >
      {post.comments?.map((comment) => (
        <div key={comment.id} className="flex flex-col mb-7">
          <div className="flex items-center gap-5">
            <Avatar
              src={comment.author.image}
              width={40}
              height={40}
              alt={`${comment.author.name}'s profile`}
            />

            <div>
              <div className="flex justify-start items-center gap-5">
                <Link to={`/profile/${splitUsername(comment.author.email)}`} className="font-bold text-[#171717] dark:text-[#FAFAFA]">
                  {comment.author.name}
                </Link>

                <p className="text-[#737373] dark:text-[#A3A3A3] text-[14px] font-light">
                  @{comment.author.name.toLowerCase().replace(/\s+/g, "")}
                </p>

                <p className="text-[#737373] dark:text-[#A3A3A3] text-[14px] font-light hidden md:block">
                  . {new Date(comment.createdAt).toLocaleDateString()}
                </p>
                {user?.email && user.email === comment.author.email && (
                  <div className="ml-auto flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedEditCommentId(comment.id);
                        setSelectedEditCommentContent(comment.content);
                        setIsShowEditCommentModal(true);
                      }}
                      className="text-[#737373] hover:text-[#3B82F6] transition-colors"
                    >
                      <Pencil
                        size={18}
                        strokeWidth={1.8}
                        className="text-[#737373] transition-colors hover:text-[#3B82F6] dark:text-[#A3A3A3] dark:hover:text-[#3B82F6]"
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCommentId(comment.id);
                        setIsOpenDeleteCommentModal(true);
                      }}
                      className="text-[#737373] hover:text-red-500 transition-colors"
                    >
                      <Trash2
                        size={18}
                        strokeWidth={1.8}
                        className="text-[#737373] transition-colors hover:text-red-500 dark:text-[#A3A3A3] dark:hover:text-red-400"
                      />
                    </button>
                  </div>
                )}
              </div>

              <p className="mt-2 text-[#171717] dark:text-[#FAFAFA]">
                {comment.content}
              </p>
            </div>
          </div>
        </div>
      ))}

      <div className="flex items-start gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full">
          <Avatar src={user?.image} width={40} height={40} />
        </div>

        <div className="flex-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment..."
            rows={4}
            className="shadow-[0_1px_3px_rgba(0,0,0,0.08)] w-full resize-none rounded-lg border border-[#E5E5E5] bg-transparent p-3 
                        text-sm leading-5 text-[#171717] outline-none placeholder:text-[#737373] focus:border-[#3B82F6] 
                        dark:border-[#404040] dark:text-[#FAFAFA] dark:placeholder:text-[#A3A3A3] dark:focus:border-[#3B82F6]"
          />

          <div className="mt-3 flex justify-end">
            <button
              type="submit"
              disabled={!text.trim()}
              className=" flex h-9 min-w-25 items-center justify-center gap-2 rounded-md bg-[#262626] px-4 text-sm text-white transition 
                        hover:bg-[#171717] disabled:cursor-not-allowed disabled:bg-[#737373] disabled:text-[#404040]
                        dark:bg-white dark:text-black dark:hover:bg-[#E5E5E5] dark:disabled:bg-[#737373] 
                        dark:disabled:text-[#404040]"
            >
              <Send size={15} strokeWidth={1.8} />
              <span>Comment</span>
            </button>
          </div>
        </div>
      </div>
      
      <DeleteCommentModal
        isOpen={isOpenDeleteCommentModal}
        onClose={() => {
          setIsOpenDeleteCommentModal(false);
          setSelectedCommentId(null);
        }}
        postId={post.id}
        commentId={selectedCommentId}
      />
      {selectedEditCommentId && (
        <UpdateCommentModal
          isOpen={isShowEditCommentModal}
          onClose={() => {
            setIsShowEditCommentModal(false);
            setSelectedEditCommentId(null);
            setSelectedEditCommentContent("");
          }}
          postId={post.id}
          commentId={selectedEditCommentId}
          initialContent={selectedEditCommentContent}
        />
      )}
    </form>
  );
}
