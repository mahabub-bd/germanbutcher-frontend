'use client';
import { useState } from 'react';

const initialData = {
  firstName: 'Mahabub',
  lastName: 'Hossain',
  contactNumber: '01711852202',
  dateOfBirth: '1990-11-03',
  gender: 'Male',
  email: 'palashmahabub@gmail.com',
};

export default function AccountInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className=" space-y-8">
      {/* Account Information */}
      <div className=" p-6 shadow-[-1px_2px_8.5px_4px_rgba(0,0,0,0.06)] bg-white  rounded-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg md:text-2xl font-semibold">
            Account Information
          </h2>
          <button
            className="px-4 py-1 border rounded-md text-sm text-blue-600 hover:bg-blue-50"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

      {/* Account Security */}
      <div className="p-6 shadow-[-1px_2px_8.5px_4px_rgba(0,0,0,0.06)] bg-white  rounded-md">
        <h2 className="text-lg font-semibold mb-4">Account Security</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <p className="font-medium">{formData.email}</p>
            <button className="text-blue-600 text-sm mt-1 hover:underline">
              Change email address
            </button>
          </div>
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <p className="font-medium">********</p>
            <button className="text-blue-600 text-sm mt-1 hover:underline">
              Change password
            </button>
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
