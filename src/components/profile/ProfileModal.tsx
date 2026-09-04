import Button from "../Ui/Button";
import { X } from "lucide-react";
import { useState } from "react";
import { useUpdateUserProfile } from "../../hooks/useUpdateUserProfile";
import { useAuthStore } from "../../store/authStore";
import { useUploadProfileImage } from "../../hooks/useUploadProfileImage";
import Avatar from "../Ui/Avatar";
import toast from "react-hot-toast";

type ProfileModalProp = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  prevName: string;
  prevBio: string;
  prevLocation: string;
  prevWebsite: string;
};

const ProfileModal = ({
  setIsModalOpen,
  prevName,
  prevBio,
  prevLocation,
  prevWebsite,
}: ProfileModalProp) => {
  const { user } = useAuthStore();

  const [name, setName] = useState(prevName);
  const [bio, setBio] = useState(prevBio);
  const [location, setLocation] = useState(prevLocation);
  const [website, setWebsite] = useState(prevWebsite);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(user?.image ?? null);

  const { mutate, isPending } = useUpdateUserProfile();

  const { mutate: uploadImage, isPending: isUploadingImage } =
    useUploadProfileImage();

  function handleCancel() {
    setIsModalOpen(false);
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    setProfileImage(file);

    setPreview((prev) => {
      if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);

      return URL.createObjectURL(file);
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (profileImage) {
      uploadImage(profileImage, {
        onSuccess: (data) => {
          mutate({
            id: user!.id,
            name,
            bio,
            location,
            website,
            image: data.file,
          });

          setIsModalOpen(false);
          toast.success("profile updated successfully")
        },
      });

      return;
    }

    mutate({
      id: user!.id,
      name,
      bio,
      location,
      website,
      image: user!.image,
    });

    setIsModalOpen(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="w-137.5 rounded-lg bg-white p-6 dark:border dark:border-[#262626] dark:bg-[#0A0A0A]">
        <div className="flex w-full flex-col rounded-2xl bg-white p-3 dark:bg-[#0A0A0A]">
          <div className="flex justify-end">
            <X
              onClick={handleCancel}
              className="h-4 w-4 cursor-pointer dark:text-white"
            />
          </div>

          <div className="mb-3 flex flex-col items-start">
            <h2 className="text-lg dark:text-white">Edit Profile</h2>

            <p className="text-[14px] text-[#737373]">
              Make changes to your profile here. Click save when you're done.
            </p>
          </div>

          <div className="mb-3">
            <label
              htmlFor="profileImage"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Profile Picture
            </label>

            <div className="mb-3 flex items-center gap-3">
              <Avatar
                src={preview}
                width={64}
                height={64}
                alt="Profile preview"
              />

              <input
                id="profileImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full cursor-pointer rounded-lg border border-gray-200 text-sm text-gray-900
                  file:mr-4 file:cursor-pointer file:border-0 file:bg-[#181818]
                  file:px-4 file:py-2 file:text-sm file:font-medium file:text-white
                  dark:border-[#737373] dark:text-white
                  dark:file:bg-white dark:file:text-black"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-1">
            <label htmlFor="name" className="dark:text-white">
              Name
            </label>

            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 dark:border-[#737373] dark:text-white"
              type="text"
              placeholder="Enter your name"
            />

            <label htmlFor="bio" className="mt-1 dark:text-white">
              Bio
            </label>

            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Enter your bio"
              className="h-16 w-full resize-none rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200 dark:border-[#737373] dark:text-white"
            />

            <label
              htmlFor="location"
              className="mt-1 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Location
            </label>

            <input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              placeholder="Enter your location"
              className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 dark:border-[#737373] dark:text-white"
            />

            <label
              htmlFor="website"
              className="mt-1 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Website
            </label>

            <input
              id="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              type="text"
              placeholder="Enter your website"
              className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 dark:border-[#737373] dark:text-white"
            />

            <div className="mt-3 flex justify-end gap-2">
              <Button
                type="button"
                onClick={handleCancel}
                className="h-9 rounded-lg border border-gray-200 bg-white px-4 text-center text-sm font-medium text-gray-900 shadow-sm transition hover:bg-black hover:text-white dark:bg-[#181818] dark:text-white dark:hover:bg-gray-50 dark:hover:text-black"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isPending || isUploadingImage}
                className="h-9 rounded-lg bg-[#181818] px-4 text-center text-sm font-medium text-white transition hover:border hover:border-gray-200 hover:bg-white hover:text-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white"
              >
                {isUploadingImage
                  ? "Uploading..."
                  : isPending
                    ? "Saving..."
                    : "Save changes"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
