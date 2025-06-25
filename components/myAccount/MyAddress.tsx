'use client';
import { getUser } from '@/actions/auth';
import { useEffect, useState } from 'react';

const initialData = {
  firstName: 'Mahabub',
  lastName: 'Hossain',
  contactNumber: '01711852202',
  dateOfBirth: '1990-11-03',
  gender: 'Male',
  email: 'palashmahabub@gmail.com',
  presentAddress: '123/A, Dhaka',
  permanentAddress: 'Village Road, Barisal',
};

export default function AccountInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const fetchUser = async () => {
    try {
      const user = await getUser();
      console.log('==============', user);
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      {/* Account Information */}
      <div className="bg-white rounded-xl shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Account Information</h2>
          <button
            className="px-4 py-1 border rounded-md text-sm text-blue-600 hover:bg-blue-50"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoRow
            label="First Name"
            name="firstName"
            value={formData.firstName}
            isEditing={isEditing}
            handleChange={handleChange}
          />
          <InfoRow
            label="Last Name"
            name="lastName"
            value={formData.lastName}
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
            label="Date of Birth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            isEditing={isEditing}
            handleChange={handleChange}
            type="date"
          />
          <InfoRow
            label="Gender"
            name="gender"
            value={formData.gender}
            isEditing={isEditing}
            handleChange={handleChange}
          />
        </div>
      </div>

      {/* Address Section */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Address</h2>
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="font-medium text-gray-700 mb-2">Present Address</h3>
            {isEditing ? (
              <textarea
                name="presentAddress"
                value={formData.presentAddress}
                onChange={handleChange}
                rows={3}
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
            ) : (
              <p className="text-sm text-gray-800">{formData.presentAddress}</p>
            )}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="font-medium text-gray-700 mb-2">
              Permanent Address
            </h3>
            {isEditing ? (
              <textarea
                name="permanentAddress"
                value={formData.permanentAddress}
                onChange={handleChange}
                rows={3}
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
            ) : (
              <p className="text-sm text-gray-800">
                {formData.permanentAddress}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
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
      <label className="text-sm text-gray-600">{label}</label>
      {isEditing ? (
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
        />
      ) : (
        <p className="font-medium mt-1">{value}</p>
      )}
    </div>
  );
}
