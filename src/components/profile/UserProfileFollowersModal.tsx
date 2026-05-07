import Avatar from "../Ui/Avatar";
import avatar from "../../assets/avatar.png";
import { useGetFollowers } from "../../hooks/useGetFollowers";


interface UserProfileFollowersModalProps {
  isOpen: boolean;
  onClose: ()=> void;
  followers?: Array<{ followerId: string }>
}

function UserProfileFollowersModal({ isOpen, onClose, followers } : UserProfileFollowersModalProps) {

    
  const { data, isLoading } = useGetFollowers({ followers, enabled: isOpen });

  if (!isOpen) return null;
    

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#0f0f0f] w-150 rounded-xl p-6 max-h-[50vh] overflow-y-auto dark:border">

        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold">Followers</h2>
          <button onClick={onClose} className="hover:text-red-400 cursor-pointer">✕</button>
        </div>

        {isLoading && (
          <p className="text-center text-gray-400">Loading...</p>
        )}

        {!isLoading && data?.length === 0 && (
          <p className="text-center text-gray-400">No followers</p>
        )}

        <div className="flex flex-col gap-3 ">
          {data?.map((user , index) => (
            <div
              key={user?.id}
              className={`flex items-center justify-between  pb-2 ${index === data.length - 1 ? "" : "border-b"}`}
            >
              <div className="flex items-center gap-3">
                <Avatar src={avatar} width={30} height={30} />
                <div>
                  <p className="font-medium">{user?.name}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default UserProfileFollowersModal;
