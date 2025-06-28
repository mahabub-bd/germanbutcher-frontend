'use client';
import { useUser } from '@/contexts/user-context';
import { fetchProtectedData } from '@/utils/api-utils';
import { PencilLine } from 'lucide-react';
import { useEffect, useState } from 'react';
import AddressDialog from './AddressDialogForm';

const address = {
  address: '542, East Badda',
  area: 'Badda',
  city: 'Dhaka',
  division: 'Dhaka',
  id: 4,
  isDefault: true,
  type: 'shipping',
};

export default function AccountInfo() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading, error, refresh } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const fetchUser = async () => {
    try {
      const address = await fetchProtectedData(`addresses/user/1`);
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className=" mx-auto mt-4 sm:mt-0  space-y-6">
      {/* Account Information */}
      <div className="bg-white rounded-xl shadow-[-1px_2px_8.5px_4px_rgba(0,0,0,0.06)] p-4 lg:p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-headerColor ">
            Account Information
          </h2>
          <button
            className="px-4 py-2 border whitespace-nowrap rounded-md text-sm text-whiteColor bg-primaryColor"
            onClick={() => setIsOpen(true)}
          >
            Add Address
          </button>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className=" p-6 bg-white rounded-lg  border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-headerColor">
                Shipping Address
              </h2>
              <button
                type="button"
                className="px-3 py-1 text-sm font-medium text-white cursor-pointer bg-primaryColor rounded transition"
                onClick={() => setIsOpen(true)}
              >
                Edit
              </button>
            </div>

            <div className="text-gray-700 space-y-1">
              <p>
                <span className="font-semibold text-headerColor text-lg">
                  Address:
                </span>{' '}
                {address.address}
              </p>
              <p>
                <span className="font-semibold text-headerColor text-lg">
                  Area:
                </span>{' '}
                {address.area}
              </p>
              <p>
                <span className="font-semibold text-headerColor text-lg">
                  City:
                </span>{' '}
                {address.city}
              </p>
              <p>
                <span className="font-semibold text-headerColor text-lg">
                  Division:
                </span>{' '}
                {address.division}
              </p>
              <p>
                <span className="font-semibold text-headerColor text-lg">
                  Type:
                </span>{' '}
                <span className="capitalize">{address.type}</span>
              </p>
              {address.isDefault && (
                <p className="mt-2 inline-block px-2 py-0.5 text-sm font-semibold  text-green-800 bg-green-100 rounded">
                  Default Address
                </p>
              )}
            </div>
          </div>
          <div className="  p-6 bg-white rounded-lg  border border-gray-200">
            <div className="flex gap-3 items-center mb-4">
              <h2 className="text-lg font-semibold text-headerColor ">
                Billing Address
              </h2>
              <button
                type="button"
                className="px-3 py-1 text-sm font-medium  cursor-pointer text-primaryColor rounded transition"
                onClick={() => setIsOpen(true)}
              >
                <PencilLine className="text-xs" />
              </button>
            </div>

            <div className="text-gray-500 space-y-1">
              <p className="text-base">
                <span className="font-semibold text-headerColor text-lg ">
                  Address:{' '}
                </span>{' '}
                {address.address}
              </p>
              <p>
                <span className="font-semibold text-headerColor text-lg">
                  Area:
                </span>{' '}
                {address.area}
              </p>
              <p>
                <span className="font-semibold text-headerColor text-lg">
                  City:
                </span>{' '}
                {address.city}
              </p>
              <p>
                <span className="font-semibold text-headerColor text-lg">
                  Division:
                </span>{' '}
                {address.division}
              </p>
              <p>
                <span className="font-semibold text-headerColor text-lg">
                  Type:
                </span>{' '}
                <span className="capitalize">{address.type}</span>
              </p>
              {address.isDefault && (
                <p className="mt-2 inline-block px-2 py-0.5 text-sm font-semibold  text-green-800 bg-green-100 rounded">
                  Default Address
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      {isOpen && <AddressDialog open={isOpen} setOpen={setIsOpen} />}
    </div>
  );
}
