import { LoadingSpinner } from "@/components/ui/loading-spinner";

export function InlineProductsLoading() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="p-6 bg-white bg-opacity-25 rounded-xl shadow-lg">
        <div className="flex flex-col items-center space-y-4">
          <LoadingSpinner size="lg" />
          <div className="text-center">
            <h3 className="text-lg font-medium">Loading Products</h3>
            <p className="text-sm text-muted-foreground">
              Please wait while we fetch the latest products...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
