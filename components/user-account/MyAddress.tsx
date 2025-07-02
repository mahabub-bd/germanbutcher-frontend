"use client";

import { Address } from "@/utils/types";
import { Home, MapPin, PencilLine, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import AddressDialog from "./AddressDialogForm";

interface MyAddressProps {
  addresses: Address[];
  userId: string;
}

export default function MyAddress({ addresses, userId }: MyAddressProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");

  const shippingAddress =
    addresses?.find((addr) => addr.type === "shipping" && addr.isDefault) ||
    addresses?.find((addr) => addr.type === "shipping");

  const billingAddress =
    addresses?.find((addr) => addr.type === "billing" && addr.isDefault) ||
    addresses?.find((addr) => addr.type === "billing");

  const handleAddAddress = () => {
    setEditingAddress(null);
    setDialogMode("add");
    setIsOpen(true);
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setDialogMode("edit");
    setIsOpen(true);
  };

  const AddressCard = ({
    address,
    title,
    icon: Icon,
  }: {
    address: Address | undefined;
    title: string;
    icon: React.ElementType;
  }) => {
    if (!address) {
      return (
        <div className="p-6 bg-white rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Icon className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            </div>
          </div>
          <div className="text-center py-8">
            <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 mb-4">
              No {title.toLowerCase()} added yet
            </p>
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              onClick={handleAddAddress}
            >
              Add {title}
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="p-6 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Icon className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          </div>
          <button
            type="button"
            className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors flex items-center gap-1"
            onClick={() => handleEditAddress(address)}
          >
            <PencilLine className="w-4 h-4" />
            Edit
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <span className="font-medium text-gray-700 min-w-[80px]">
              Address:
            </span>
            <span className="text-gray-600">{address.address}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-medium text-gray-700 min-w-[80px]">
              Area:
            </span>
            <span className="text-gray-600">{address.area}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-medium text-gray-700 min-w-[80px]">
              City:
            </span>
            <span className="text-gray-600">{address.city}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-medium text-gray-700 min-w-[80px]">
              Division:
            </span>
            <span className="text-gray-600">{address.division}</span>
          </div>
          {address.isDefault && (
            <div className="mt-3">
              <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                Default {address.type} address
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage Addresses</h2>
      </div>

      <div className="">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Saved Addresses
          </h3>
          <Button
            className="px-4 py-2 text-sm font-medium text-white  rounded-md transition-colors flex items-center gap-2"
            onClick={handleAddAddress}
          >
            <Plus className="w-4 h-4" />
            Add New
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AddressCard
            address={shippingAddress}
            title="Shipping Address"
            icon={Home}
          />
          <AddressCard
            address={billingAddress}
            title="Billing Address"
            icon={MapPin}
          />
        </div>

        {/* Additional addresses if any */}
        {addresses?.length > 2 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="text-md font-semibold text-gray-800 mb-4">
              Other Addresses
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses
                .filter(
                  (addr) =>
                    addr.id !== shippingAddress?.id &&
                    addr.id !== billingAddress?.id
                )
                .map((address) => (
                  <div
                    key={address.id}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-gray-900">
                          {address.address}
                        </p>
                        <p className="text-sm text-gray-600">
                          {address.area}, {address.city}
                        </p>
                      </div>
                      <button
                        onClick={() => handleEditAddress(address)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <PencilLine className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-xs text-gray-500 capitalize">
                      {address.type} address
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {isOpen && (
        <AddressDialog
          open={isOpen}
          setOpen={setIsOpen}
          address={editingAddress}
          mode={dialogMode}
          userId={userId}
        />
      )}
    </div>
  );
}
