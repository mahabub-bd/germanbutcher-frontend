"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTime } from "@/lib/utils";
import { deleteData, fetchProtectedData } from "@/utils/api-utils";
import { Testimonial } from "@/utils/types";
import {
  Eye,
  EyeOff,
  MessageSquare,
  MoreHorizontal,
  Pencil,
  Plus,
  Star,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import DeleteConfirmationDialog from "../delete-confirmation-dialog";
import { LoadingIndicator } from "../loading-indicator";
import { PageHeader } from "../page-header";

import { ElementType } from "react";

type SummaryCardProps = {
  icon: ElementType;
  value: string | number;
  label: string;
  color: string;
};

export function SummaryCard({
  icon: Icon,
  value,
  label,
  color,
}: SummaryCardProps) {
  return (
    <div className="bg-white dark:bg-card border rounded-xl shadow-sm p-5 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Icon className={`h-4 w-4 ${color}`} />
        <span className="text-xs font-semibold text-muted-foreground">
          {label}
        </span>
      </div>
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
    </div>
  );
}

export function TestimonialList() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<Testimonial | null>(null);

  const fetchTestimonials = async () => {
    setIsLoading(true);
    try {
      const response: Testimonial[] = await fetchProtectedData("testimonials");
      setTestimonials(response);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      toast.error("Failed to load testimonials. Please try again.");
      setTestimonials([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleDeleteClick = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedTestimonial) return;
    try {
      await deleteData("testimonials", selectedTestimonial.id);
      fetchTestimonials();
      toast.success("Testimonial deleted successfully");
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      toast.error("Failed to delete testimonial. Please try again.");
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  // Helper function to render star rating (1-5)
  const renderStarRating = (rating: number) => (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-1 text-xs font-semibold text-muted-foreground">
        ({rating})
      </span>
    </div>
  );

  // Empty state with card
  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-muted rounded-xl shadow">
      <MessageSquare className="h-10 w-10 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold">No testimonials found</h3>
      <p className="text-sm text-muted-foreground mt-2">
        Get started by creating your first testimonial.
      </p>
      <Button asChild className="mt-4">
        <Link href="/admin/testimonial/add">
          <Plus className="mr-2 h-4 w-4" /> Add Testimonial
        </Link>
      </Button>
    </div>
  );

  // Main responsive table
  const renderTableView = () => (
    <div className="md:p-2 p-1">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead className="hidden md:table-cell">Avatar</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Testimonial</TableHead>

            <TableHead className="hidden md:table-cell">Status</TableHead>
            <TableHead className="hidden md:table-cell">Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {testimonials.map((testimonial, idx) => (
            <TableRow
              key={testimonial.id}
              className={idx % 2 === 1 ? "bg-muted/60" : ""}
            >
              <TableCell className="font-medium">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold">{testimonial.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </span>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Image
                  src={testimonial.attachment.url}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover border"
                  alt={testimonial.name}
                />
              </TableCell>
              <TableCell>{renderStarRating(testimonial.rating)}</TableCell>
              <TableCell>
                <p className="text-sm" title={testimonial.text}>
                  {testimonial.text}
                </p>
              </TableCell>

              <TableCell className="hidden md:table-cell">
                <Badge
                  variant={testimonial.isPublish ? "default" : "outline"}
                  className="gap-1 flex items-center px-2"
                >
                  {testimonial.isPublish ? (
                    <Eye className="h-3 w-3" />
                  ) : (
                    <EyeOff className="h-3 w-3" />
                  )}
                  {testimonial.isPublish ? "Published" : "Draft"}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <span className="text-xs text-muted-foreground">
                  {formatDateTime(testimonial.createdAt)}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/testimonial/${testimonial.id}/edit`}>
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => handleDeleteClick(testimonial)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  const publishedCount = testimonials.filter((t) => t.isPublish).length;
  const draftCount = testimonials.filter((t) => !t.isPublish).length;
  const averageRating =
    testimonials.length > 0
      ? (
          testimonials.reduce((acc, t) => acc + t.rating, 0) /
          testimonials.length
        ).toFixed(1)
      : "0";

  return (
    <>
      <div className="w-full mx-auto md:p-4 p-2">
        <PageHeader
          title="Testimonials"
          description="Manage customer testimonials and reviews"
          actionLabel="Add Testimonial"
          actionHref="/admin/testimonial/add"
        />

        {/* Summary Cards */}
        {testimonials.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-6">
            <SummaryCard
              icon={MessageSquare}
              label="Total"
              value={testimonials.length}
              color="text-blue-600"
            />
            <SummaryCard
              icon={Eye}
              label="Published"
              value={publishedCount}
              color="text-green-600"
            />
            <SummaryCard
              icon={EyeOff}
              label="Drafts"
              value={draftCount}
              color="text-orange-600"
            />
            <SummaryCard
              icon={Star}
              label="Avg Rating"
              value={averageRating}
              color="text-yellow-600"
            />
          </div>
        )}

        <div className="space-y-6">
          {isLoading ? (
            <LoadingIndicator message="Loading testimonials..." />
          ) : testimonials.length === 0 ? (
            renderEmptyState()
          ) : (
            renderTableView()
          )}
        </div>

        <div className="flex justify-between mt-4">
          <div className="text-xs text-muted-foreground">
            {testimonials.length}{" "}
            {testimonials.length === 1 ? "testimonial" : "testimonials"}
            {publishedCount > 0 && (
              <span className="text-green-500 ml-2">
                ({publishedCount} published)
              </span>
            )}
            {draftCount > 0 && (
              <span className="text-orange-500 ml-2">
                ({draftCount} drafts)
              </span>
            )}
          </div>
        </div>
      </div>

      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        defaultToast={false}
      />
    </>
  );
}
