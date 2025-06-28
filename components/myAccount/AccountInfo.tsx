'use client';
import { useUser } from '@/contexts/user-context';
import { patchData } from '@/utils/api-utils';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function AccountInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const { user, loading, error, refresh } = useUser();

  const [formData, setFormData] = useState({
    firstName: '',
    contactNumber: '',
    email: '',
    password: '********',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user?.name || '',
        contactNumber: user?.mobileNumber || '',
        email: user?.email || '',
        password: '********',
      });
    }
  }, [user]);

  if (loading) return <p>Loading user...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Updated Profile Data:', formData);
    try {
      const updateData = new FormData();
      updateData.append('name', formData.firstName);
      updateData.append('mobileNumber', formData.contactNumber);
      updateData.append('email', formData.email);
      updateData.append('password', formData.password);
      const endpoint = `users/${user?.id}`;
      const response = await patchData(endpoint, updateData);
      if (response?.statusCode == 200) {
        setIsEditing(false);
        toast(response?.message);
      }
      refresh?.();
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        firstName: user?.name || '',
        contactNumber: user?.mobileNumber || '',
        email: user?.email || '',
        password: '********',
      });
    }
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 h-full">
      <div className="p-6 shadow-[-1px_2px_8.5px_4px_rgba(0,0,0,0.06)] bg-white rounded-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg md:text-2xl font-semibold">
            Account Information
          </h2>
          {isEditing ? (
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="px-4 py-2 border border-red-500 text-red-500 cursor-pointer rounded-md text-sm hover:scale-105 hover:shadow-sm transition-all duration-200"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 cursor-pointer py-2 bg-primaryColor text-white text-sm rounded-md hover:scale-105 hover:shadow-sm transition-all duration-200"
              >
                Update Profile
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="px-4 py-1 border rounded-md cursor-pointer text-sm text-whiteColor bg-primaryColor"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <InfoRow
            label="Name"
            name="firstName"
            value={formData.firstName}
            isEditing={isEditing}
            handleChange={handleChange}
          />

          <InfoRow
            label="Contact Number"
            name="contactNumber"
            value={formData.contactNumber}
            isEditing={isEditing}
            handleChange={handleChange}
          />

          <InfoRow
            label="Email"
            name="email"
            value={formData.email}
            isEditing={isEditing}
            handleChange={handleChange}
          />

          <div>
            <label className="text-sm text-gray-600">Password</label>
            {isEditing ? (
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
              />
            ) : (
              <p className="font-medium">********</p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

function InfoRow({
  label,
  name,
  value,
  isEditing,
  handleChange,
  type = 'text',
}) {
  return (
    <div>
      <label className="text-base font-semibold text-black">{label}</label>
      {isEditing ? (
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
        />
      ) : (
        <p className="font-medium text-base text-black/60 mt-1">{value}</p>
      )}
    </div>
  );
}
