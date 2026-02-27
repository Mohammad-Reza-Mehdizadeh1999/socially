import avatar from "../../assets/avatar.png";
import { useState, useEffect } from "react";
import { Heart, MessageCircle, Send, Trash2 } from "lucide-react";
import Avatar from "../Ui/Avatar";
import type { Post } from "../../types/allPosts";
import { createNewPostRequest } from "../../services/postServices";
import toast from "react-hot-toast";

const AllPosts = () => {
  const [posts] = useState<Post[]>(() => {
    return [
      {
        id: "cmlz4ff1v00erqr0kiobmdz2s",
        authorId: "p0ITHdTH8wYDH3LUX6C2eBO6XIhRmPtU",
        content: "سلام سلااااااام همگی سلام",
        createdAt: "2026-02-23T11:56:33.139Z",
        updatedAt: "2026-02-23T11:56:33.139Z",
        author: {
          name: "behtash",
          email: "behtash@gmail.com",
          image: null,
        },
        likes: [
          {
            userId: "c5P2W5dP75NR5btZoQ9H4if9VMLIPVjE",
          },
          {
            userId: "XursuXfi0IMwN0oEVnuuBJhavR1LbvoE",
          },
        ],
        comments: [
          {
            id: "cmlz4gg5400exqr0kzxiwl34h",
            content: "علیک سلام",
            createdAt: "2026-02-23T11:57:21.209Z",
            author: {
              name: "mohammad reza",
              email: "morez.mehdizadeh1999@gmail.com",
              image: null,
            },
          },
        ],
        _count: {
          likes: 2,
          comments: 1,
        },
      },
      {
        id: "cmlthk8fg00atqr0kmzhv904n",
        authorId: "0cBLLdV3XuK1cCWjUAWOBDMCLJA1KyBO",
        content: "Tired....",
        createdAt: "2026-02-19T13:17:35.788Z",
        updatedAt: "2026-02-19T13:17:35.788Z",
        author: {
          name: "Anna",
          email: "anahiita.sllp2000@gmail.com",
          image: null,
        },
        likes: [
          {
            userId: "v61cBlS4e9PwwBIwkULmpt4dzh8DaHd8",
          },
          {
            userId: "etDfDfErfPSJvNQy8PggtSXxbcBL3IJY",
          },
          {
            userId: "BNAvyEDPIUsoKju1wb252I5kHsUv5Cs9",
          },
          {
            userId: "c5P2W5dP75NR5btZoQ9H4if9VMLIPVjE",
          },
          {
            userId: "XursuXfi0IMwN0oEVnuuBJhavR1LbvoE",
          },
          {
            userId: "DYjwSQqMKCyhCxpqQvPc0ouMpEU8zneZ",
          },
        ],
        comments: [
          {
            id: "cmlurzxbj00b5qr0khyn7v5id",
            content: "Whyyyyyyyyyy !?",
            createdAt: "2026-02-20T10:57:30.224Z",
            author: {
              name: "amir",
              email: "amir@gmail.com",
              image: null,
            },
          },
          {
            id: "cmlv90xzv00bdqr0ke5gn2teo",
            content:
              "Every moment, something new!!\r\nI didn’t know I could reply to comments.\r\nThanks!",
            createdAt: "2026-02-20T18:54:11.227Z",
            author: {
              name: "Anna",
              email: "anahiita.sllp2000@gmail.com",
              image: null,
            },
          },
        ],
        _count: {
          likes: 6,
          comments: 2,
        },
      },
      {
        id: "cmlphgo9l005jqr0k1haz0hwg",
        authorId: "UFag4tahxnT5Cb7YrJwCNwqSXzn01AL9",
        content: "سلام بای",
        createdAt: "2026-02-16T18:03:44.985Z",
        updatedAt: "2026-02-16T18:03:44.985Z",
        author: {
          name: "naghi",
          email: "naghi@gmail.com",
          image: null,
        },
        likes: [
          {
            userId: "0cBLLdV3XuK1cCWjUAWOBDMCLJA1KyBO",
          },
          {
            userId: "FqitbO2SMFcbRG7ot7T4b4UBPIKgSm5p",
          },
          {
            userId: "c5P2W5dP75NR5btZoQ9H4if9VMLIPVjE",
          },
        ],
        comments: [
          {
            id: "cmlphh42o005pqr0kggj4f667",
            content: "hahahaha",
            createdAt: "2026-02-16T18:04:05.472Z",
            author: {
              name: "Anna",
              email: "anahiita.sllp2000@gmail.com",
              image: null,
            },
          },
        ],
        _count: {
          likes: 3,
          comments: 1,
        },
      },
    ];
  });

  const [newPostText, setNewPostText] = useState("");
  const [openCommentPostId, setOpenCommentPostId] = useState<string | null>(
    null,
  );
  const [commentInput, setcommentInput] = useState<string>();


  const getRelativeTime = (dateString: string) => {
    const now = new Date();
    const created = new Date(dateString);
    const secTime = Math.floor((now.getTime() - created.getTime()) / 1000);

    if (secTime < 60) return "less than a minute ago";
    if (secTime < 3600) return `${Math.floor(secTime / 60)} minutes ago`;
    if (secTime < 86400) return `${Math.floor(secTime / 3600)} hours ago`;
    return `${Math.floor(secTime / 86400)} days ago`;
  };


  const handleDeletePost = (postId: string) => {
    console.log(postId);
    
  };


  useEffect(() => {

    //fetch all posts in here

  }, []);


  async function handleCreatePost(){

    const payload = {
      content : newPostText
    }
    try {
      await createNewPostRequest(payload)
      toast.success("post created successfully")
      setNewPostText("")

    } catch (error) {
      console.error(error)
      toast.error("create new post failed. Please try again")
    }
  }


  async function handleAddComment(postId : string){
    console.log(postId);

  }


  async function handleToggleLike(postId : string){
    console.log(postId);
    
  }

  return (
    <section>
      <div className="m-6 mx-auto p-6 w-186 shadow-sm dark:bg-primary-light rounded-xl border border-border-light dark:border-border-dark">

        <div className="flex items-start gap-x-3 pb-3 border-b border-b-border-light dark:border-b-border-dark">
          <Avatar src={avatar} height={30} width={30}></Avatar>
          <textarea
            value={newPostText}
            onChange={(e) => setNewPostText(e.target.value)}
            className="resize-none w-full min-h-16 focus:outline-none placeholder:text-sm dark:placeholder:text-secondary-dark dark:text-white"
            placeholder="Whats on your mind?"
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            onClick={handleCreatePost}
            disabled={!newPostText.trim()}
            className="inline-flex items-center justify-center gap-x-2 py-1 px-2 mt-4 rounded-md cursor-pointer transition-colors text-white dark:text-black bg-black dark:hover:bg-white/80 hover:bg-black/80 dark:bg-white"
          >
            <Send className="size-4.5" />
            <span>Post</span>
          </button>
        </div>
      </div>

      {posts.map((post) => {

        const isOpen = openCommentPostId === post.id;

        return (
          <div
            key={post.id}
            className="m-6 mx-auto p-6 w-186 shadow-sm dark:bg-primary-light rounded-xl border border-border-light dark:border-border-dark"
          >
            <div className="flex flex-col justify-center relative">
              <div className="flex items-start gap-3">
                <Avatar src={avatar} height={30} width={30}></Avatar>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-medium dark:text-white">
                      {post.author.name}
                    </span>
                    <span className="text-sm leading-5 text-secondery-light dark:text-secondary-dark">
                      {post.author.email}
                    </span>
                    <span className="text-sm leading-5 text-secondery-light dark:text-secondary-dark">
                      {getRelativeTime(post.createdAt)}
                    </span>
                  </div>
                  <span className="dark:text-white">{post.content}</span>
                </div>
              </div>

              <div className="flex items-center gap-x-4 mt-6 mb-4">
                <button
                  onClick={() => handleToggleLike(post.id)}
                  className={`inline-flex items-center gap-2 dark:hover:bg-border-dark py-1 px-3 hover:bg-gray-100 rounded-md cursor-pointer transition-colors text-secondery-light dark:text-secondary-dark`}
                >
                  <Heart
                    size={20}
                    className={"text-secondery-light dark:text-secondary-dark"}
                  />
                  <span className="">
                    {post._count.likes}
                  </span>
                </button>
                <button
                  onClick={() => setOpenCommentPostId(isOpen ? null : post.id)}
                  className={`inline-flex items-center gap-2 text-secondery-light dark:hover:bg-border-dark dark:text-secondary-dark py-1 px-3 hover:bg-gray-100 rounded-md cursor-pointer transition-colors ${isOpen ? "text-blue-500" : ""}`}
                >
                  <MessageCircle
                    size={18}
                    className={isOpen ? "fill-blue-500 text-blue-500" : ""}
                  />
                  <span className={isOpen ? "text-blue-500" : ""}>
                    {post._count.comments}
                  </span>
                </button>
              </div>

              <button
                onClick={() => handleDeletePost(post.id)}
                className="absolute right-2 top-2 p-2 hover:bg-border-light dark:hover:bg-border-dark rounded-md cursor-pointer transition-colors"
              >
                <Trash2 className="size-4 text-secondery-light dark:text-secondary-dark hover:text-red-500" />
              </button>
            </div>

            {isOpen && (
              <div>
                {post.comments.map((comment) => (
                  <div className="flex items-start gap-3 border-t border-t-border-light dark:border-t-border-dark py-7">
                    <Avatar src={avatar} height={30} width={30}></Avatar>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-medium dark:text-white">
                          {comment.author.name}
                        </span>
                        <span className="text-sm leading-5 text-secondery-light dark:text-secondary-dark">
                          {comment.author.email}
                        </span>
                        <span className="text-sm leading-5 text-secondery-light dark:text-secondary-dark">
                          {getRelativeTime(comment.createdAt)}
                        </span>
                      </div>
                      <span className="dark:text-white">{comment.content}</span>
                    </div>
                  </div>
                ))}

                <div className="flex items-start gap-x-4">
                  <Avatar src={avatar} height={30} width={30}></Avatar>
                  <textarea
                    value={commentInput}
                    onChange={(e) =>setcommentInput(e.target.value)}
                    className="resize-none w-full min-h-16 px-3 py-2 rounded-xl placeholder:text-sm dark:placeholder:text-secondary-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-400 focus:transition-all border border-border-light dark:border-secondary- dark:bg-border-dark"
                    placeholder="Write a comment..."
                  >

                  </textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => handleAddComment(post.id)}
                    type="submit"
                    className="inline-flex items-center justify-center gap-x-2 py-1 px-2 mt-4 rounded-md cursor-pointer transition-colors text-white dark:text-black bg-black dark:bg-white dark:hover:bg-white/80 hover:bg-black/80"
                  >
                    <Send className="size-4.5" />
                    <span>comment</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default AllPosts;
