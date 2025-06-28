'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

export default function AddressDialog({ userId, open, setOpen }) {
  const [formData, setFormData] = useState({
    address: '',
    area: '',
    division: '',
    city: '',
    isDefault: true,
    type: 'shippingaddress',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.area.trim()) newErrors.area = 'Area is required';
    if (!formData.division) newErrors.division = 'Division is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.type) newErrors.type = 'Type is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: inputType === 'checkbox' ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined })); // Clear error on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const data = {
      address: formData.address,
      area: formData.area,
      division: formData.division,
      city: formData.city,
      type: formData.type,
      isDefault: formData.isDefault,
      userId: userId || null,
    };
    console.log('Submitting:', data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg max-w-[90%] max-h-[90%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Address</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:space-y-2">
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                name="address"
                placeholder="Enter your Address"
                value={formData.address}
                onChange={handleChange}
                className={`mt-1 w-full border rounded-md px-3 py-2 text-sm ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={errors.address ? 'true' : 'false'}
                aria-describedby="address-error"
                required
              />
              {errors.address && (
                <p id="address-error" className="text-red-600 text-xs mt-1">
                  {errors.address}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Area</label>
              <input
                type="text"
                name="area"
                placeholder="Enter your Area"
                value={formData.area}
                onChange={handleChange}
                className={`mt-1 w-full border rounded-md px-3 py-2 text-sm ${
                  errors.area ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={errors.area ? 'true' : 'false'}
                aria-describedby="area-error"
                required
              />
              {errors.area && (
                <p id="area-error" className="text-red-600 text-xs mt-1">
                  {errors.area}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Division</label>
              <Select
                value={formData.division}
                onValueChange={(value) => {
                  setFormData((prev) => ({ ...prev, division: value }));
                  setErrors((prev) => ({ ...prev, division: undefined }));
                }}
              >
                <SelectTrigger
                  className={`w-full !h-10 ${
                    errors.division ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <SelectValue placeholder="Select Division" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dhaka">Dhaka</SelectItem>
                  <SelectItem value="Chattogram">Chattogram</SelectItem>
                  <SelectItem value="Khulna">Khulna</SelectItem>
                  <SelectItem value="Barishal">Barishal</SelectItem>
                  <SelectItem value="Sylhet">Sylhet</SelectItem>
                  <SelectItem value="Rajshahi">Rajshahi</SelectItem>
                  <SelectItem value="Rangpur">Rangpur</SelectItem>
                  <SelectItem value="Mymensingh">Mymensingh</SelectItem>
                </SelectContent>
              </Select>
              {errors.division && (
                <p className="text-red-600 text-xs mt-1">{errors.division}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`mt-1 w-full border rounded-md px-3 py-2 text-sm ${
                  errors.city ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={errors.city ? 'true' : 'false'}
                aria-describedby="city-error"
                required
              />
              {errors.city && (
                <p id="city-error" className="text-red-600 text-xs mt-1">
                  {errors.city}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Type</label>
              <Select
                value={formData.type}
                onValueChange={(value) => {
                  setFormData((prev) => ({ ...prev, type: value }));
                  setErrors((prev) => ({ ...prev, type: undefined }));
                }}
              >
                <SelectTrigger
                  className={`w-full !h-10 ${
                    errors.type ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <SelectValue placeholder="Select Address Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="shippingaddress">
                    Shipping Address
                  </SelectItem>
                  <SelectItem value="billingaddress">
                    Billing Address
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-red-600 text-xs mt-1">{errors.type}</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="isDefault" className="text-sm">
                Set as default address
              </label>
              <Switch
                id="isDefault"
                className="!bg-primaryColor"
                checked={formData.isDefault}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, isDefault: checked }))
                }
              />
            </div>
          </div>
          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className=" cursor-pointer">
              Save Address
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
