import { useState } from 'react';

interface EditProfileModalPropsTypes {
    isOpen : boolean;
    onClose : ()=> void
}

const EditProfileModal = ({ isOpen, onClose } : EditProfileModalPropsTypes) => {

    const [formData, setFormData] = useState({
    name: '',
    bio: '',
    location: '',
    website: ''
  });

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e : React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Sending to Backend:", formData);
    onClose(); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-mist-900 w-full max-w-md p-6 rounded-2xl shadow-xl text-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Edit Profile</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 " autoComplete="false">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-white mb-2 ">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="Your name...."
            />
          </div>

          {/* Bio Input */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Email</label>
            <input
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="Your email...."
            />
          </div>

          {/* Location Input */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="San Francisco, CA"
            />
          </div>

          {/* Website Input */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Website</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="https://yourwebsite.com"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm cursor-pointer font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm cursor-pointer font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
