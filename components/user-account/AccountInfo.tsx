"use client";

import { Input } from "@/components/ui/input";
import { patchData } from "@/utils/api-utils";
import { User } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  CheckCircle,
  Edit3,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  Save,
  Shield,
  User as UserIcon,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { FieldPath, useForm, UseFormRegister } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Enhanced Zod validation schema
const accountSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters")
      .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
    contactNumber: z
      .string()
      .min(10, "Contact number must be at least 10 digits")
      .max(15, "Contact number must be less than 15 digits")
      .regex(/^[0-9+\-\s()]+$/, "Invalid phone number format"),
    email: z
      .string()
      .email("Please enter a valid email address")
      .min(1, "Email is required"),
    password: z
      .string()
      .optional()
      .refine((val) => !val || val === "********" || val.length >= 8, {
        message: "Password must be at least 8 characters if provided",
      }),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (
        data.password &&
        data.password !== "********" &&
        data.password !== ""
      ) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }
  );

type AccountFormData = z.infer<typeof accountSchema>;

// Form field configuration
const FORM_FIELDS = [
  {
    label: "Full Name",
    name: "firstName" as const,
    type: "text",
    icon: UserIcon,
    placeholder: "Enter your full name",
    description: "Your display name on the platform",
  },
  {
    label: "Contact Number",
    name: "contactNumber" as const,
    type: "tel",
    icon: Phone,
    placeholder: "Enter your phone number",
    description: "For order updates and support",
  },
  {
    label: "Email Address",
    name: "email" as const,
    type: "email",
    icon: Mail,
    placeholder: "Enter your email address",
    description: "Primary contact for your account",
  },
] as const;

// Enhanced form field component
interface FormFieldProps {
  label: string;
  name: FieldPath<AccountFormData>;
  register: UseFormRegister<AccountFormData>;
  error?: string;
  isEditing: boolean;
  type?: string;
  icon: React.ComponentType<{ className?: string }>;
  placeholder: string;
  description?: string;
  value?: string;
}

function FormField({
  label,
  name,
  register,
  error,
  isEditing,
  type = "text",
  icon: Icon,
  placeholder,
  description,
  value,
}: FormFieldProps) {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <div className="p-1 rounded-md bg-primaryColor/10">
            <Icon className="w-3.5 h-3.5 text-primaryColor" />
          </div>
          {label}
          <span className="text-red-500 text-xs">*</span>
        </label>
        {description && <p className="text-xs text-gray-500">{description}</p>}
      </div>

      {isEditing ? (
        <div className="space-y-2">
          <Input
            type={type}
            {...register(name)}
            placeholder={placeholder}
            className={`h-10 sm:h-11 transition-all duration-200 ${
              error
                ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20"
                : "focus-visible:border-primaryColor focus-visible:ring-primaryColor/20"
            }`}
          />
          {error && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-2 rounded-md">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="min-h-[40px] sm:min-h-[44px] flex items-center px-3 sm:px-4 py-2 sm:py-3 bg-gray-50/50">
          <p className="text-xs sm:text-sm text-gray-800 font-medium">
            {value || "Not provided"}
          </p>
        </div>
      )}
    </div>
  );
}

// Password field component with show/hide functionality
interface PasswordFieldProps {
  label: string;
  name: FieldPath<AccountFormData>;
  register: UseFormRegister<AccountFormData>;
  error?: string;
  placeholder: string;
  description?: string;
  isEditing: boolean;
  showToggle?: boolean;
}

function PasswordField({
  label,
  name,
  register,
  error,
  placeholder,
  description,
  isEditing,
  showToggle = true,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  if (!isEditing) {
    return (
      <div className="space-y-3">
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <div className="p-1 rounded-md bg-blue-50">
              <Lock className="w-3.5 h-3.5 text-blue-600" />
            </div>
            {label}
          </label>
        </div>
        <div className="min-h-[40px] sm:min-h-[44px] flex items-center px-3 sm:px-4 py-2 sm:py-3 bg-gray-50/50">
          <p className="text-xs sm:text-sm text-gray-800 font-medium">
            ••••••••••••
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <div className="p-1 rounded-md bg-primaryColor/10">
            <Lock className="w-3.5 h-3.5 text-primaryColor" />
          </div>
          {label}
          {name === "confirmPassword" && (
            <span className="text-red-500 text-xs">*</span>
          )}
        </label>
        {description && <p className="text-xs text-gray-500">{description}</p>}
      </div>

      <div className="space-y-2">
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            {...register(name)}
            placeholder={placeholder}
            className={`h-10 sm:h-11 pr-10 transition-all duration-200 ${
              error
                ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20"
                : "focus-visible:border-primaryColor focus-visible:ring-primaryColor/20"
            }`}
          />
          {showToggle && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
        {error && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-2 rounded-md">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Enhanced action buttons component
interface ActionButtonsProps {
  isEditing: boolean;
  onCancel: () => void;
  onEdit: () => void;
  isSubmitting: boolean;
  isValid: boolean;
}

function ActionButtons({
  isEditing,
  onCancel,
  onEdit,
  isSubmitting,
  isValid,
}: ActionButtonsProps) {
  if (isEditing) {
    return (
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          <X className="w-4 h-4" />
          <span className="hidden xs:inline">Cancel</span>
        </button>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-sm font-medium text-white bg-primaryColor hover:bg-primaryColor/90 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting || !isValid}
        >
          <Save className="w-4 h-4" />
          <span className="hidden xs:inline">
            {isSubmitting ? "Saving..." : "Save"}
          </span>
          <span className="xs:hidden">{isSubmitting ? "..." : "Save"}</span>
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-all duration-200"
      onClick={onEdit}
    >
      <Edit3 className="w-4 h-4" />
      <span className="hidden xs:inline">Edit Profile</span>
      <span className="xs:hidden">Edit</span>
    </button>
  );
}

interface AccountInfoProps {
  user: User;
}

export default function AccountInfo({ user }: AccountInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      contactNumber: "",
      email: "",
      password: "********",
      confirmPassword: "",
    },
  });

  // Watch password field to show/hide confirm password
  const passwordValue = watch("password");
  const showConfirmPassword =
    isEditing &&
    passwordValue &&
    passwordValue !== "********" &&
    passwordValue !== "";

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.name || "",
        contactNumber: user.mobileNumber || "",
        email: user.email || "",
        password: "********",
        confirmPassword: "",
      });
    }
  }, [user, reset]);

  // Handle form submission
  const onSubmit = useCallback(
    async (data: AccountFormData) => {
      if (isSubmitting) return;

      setIsSubmitting(true);

      try {
        const updateData: Partial<{
          name: string;
          mobileNumber: string;
          email: string;
          password: string;
        }> = {
          name: data.firstName,
          mobileNumber: data.contactNumber,
          email: data.email,
        };

        // Only include password if it's being changed
        if (
          data.password &&
          data.password !== "********" &&
          data.password !== ""
        ) {
          updateData.password = data.password;
        }

        const endpoint = `users/${user?.id}`;
        const response = await patchData(endpoint, updateData);

        if (response?.statusCode === 200) {
          setIsEditing(false);
          toast.success(response?.message || "Profile updated successfully");

          reset({
            firstName: data.firstName,
            contactNumber: data.contactNumber,
            email: data.email,
            password: "********",
            confirmPassword: "",
          });
        } else {
          toast.error(response?.message || "Failed to update profile");
        }
      } catch (err) {
        console.error("Update error:", err);
        const errorMessage =
          err && typeof err === "object" && "message" in err
            ? (err as { message?: string }).message
            : undefined;
        toast.error(errorMessage || "An error occurred while updating profile");
      } finally {
        setIsSubmitting(false);
      }
    },
    [user?.id, isSubmitting, reset]
  );

  const handleCancel = useCallback(() => {
    if (user) {
      reset({
        firstName: user.name || "",
        contactNumber: user.mobileNumber || "",
        email: user.email || "",
        password: "********",
        confirmPassword: "",
      });
    }
    setIsEditing(false);
  }, [user, reset]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Account Information
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Manage your personal details and account preferences
          </p>
        </div>
      </div>

      {/* Main Form Card */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl overflow-hidden"
      >
        {/* Card Header */}
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 bg-gradient-to-r from-primaryColor/10 to-primaryColor/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primaryColor/10 flex items-center justify-center">
                <UserIcon className="w-5 h-5 sm:w-6 sm:h-6 text-primaryColor" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Personal Details
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                  Keep your information up to date
                </p>
              </div>
            </div>
            <ActionButtons
              isEditing={isEditing}
              onCancel={handleCancel}
              onEdit={handleEdit}
              isSubmitting={isSubmitting}
              isValid={isValid}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="space-y-6 sm:space-y-8">
            {/* Basic Information Section */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wide">
                <div className="w-1 h-3 sm:h-4 bg-primaryColor rounded-full"></div>
                Basic Information
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {FORM_FIELDS.map((field) => (
                  <FormField
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    register={register}
                    error={errors[field.name]?.message}
                    isEditing={isEditing}
                    type={field.type}
                    icon={field.icon}
                    placeholder={field.placeholder}
                    description={field.description}
                    value={watch(field.name)}
                  />
                ))}
              </div>
            </div>

            {/* Security Section */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wide">
                <div className="w-1 h-3 sm:h-4 bg-red-600 rounded-full"></div>
                Security Settings
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <PasswordField
                  label="Password"
                  name="password"
                  register={register}
                  error={errors.password?.message}
                  placeholder="Leave blank to keep current password"
                  description="Must be at least 8 characters long"
                  isEditing={isEditing}
                />

                {showConfirmPassword && (
                  <PasswordField
                    label="Confirm New Password"
                    name="confirmPassword"
                    register={register}
                    error={errors.confirmPassword?.message}
                    placeholder="Confirm your new password"
                    description="Must match the password above"
                    isEditing={isEditing}
                    showToggle={false}
                  />
                )}
              </div>

              {isEditing && (
                <div className="bg-amber-50 rounded-lg p-3 sm:p-4">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="text-xs sm:text-sm font-medium text-amber-800">
                        Password Security Tips
                      </h4>
                      <ul className="text-xs sm:text-sm text-amber-700 space-y-1">
                        <li>• Use at least 8 characters</li>
                        <li>• Include uppercase and lowercase letters</li>
                        <li>• Add numbers and special characters</li>
                        <li>• Avoid using personal information</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Account Status Section */}
          {!isEditing && (
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-green-50">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-900">
                      Account Status
                    </p>
                    <p className="text-xs sm:text-sm text-green-600 font-medium">
                      {user.isVerified ? "Verified" : "Pending Verification"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-primaryColor/10">
                    <UserIcon className="w-4 h-4 sm:w-5 sm:h-5 text-primaryColor" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-900">
                      Member Since
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:col-span-2 lg:col-span-1">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-purple-50">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-900">
                      Last Updated
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {new Date(user.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
