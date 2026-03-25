// Base Skeleton Component
export function Skeleton({
  className = "",
  variant = "rectangular",
  width,
  height,
  animated = true,
}) {
  const baseClasses = "bg-gray-200 dark:bg-gray-700";
  const animationClasses = animated ? "animate-pulse" : "";

  const variantClasses = {
    rectangular: "rounded-md",
    circular: "rounded-full",
    text: "rounded",
  }[variant];

  const styles = {
    width,
    height,
  };

  return (
    <div
      className={`${baseClasses} ${animationClasses} ${variantClasses} ${className}`}
      style={styles}
    />
  );
}

// Container for grouping skeletons
export function SkeletonContainer({ children, className = "" }) {
  return <div className={`space-y-4 ${className}`}>{children}</div>;
}

// Predefined Components for common use cases
export const Skeletons = {
  // Text skeletons
  Text: {
    SM: () => <Skeleton variant="text" className="h-4 w-24" />,
    MD: () => <Skeleton variant="text" className="h-5 w-32" />,
    LG: () => <Skeleton variant="text" className="h-6 w-48" />,
    XL: () => <Skeleton variant="text" className="h-8 w-64" />,
  },

  // Image skeletons
  Image: {
    SM: () => <Skeleton className="size-24" />,
    MD: () => <Skeleton className="size-32" />,
    LG: () => <Skeleton className="size-48" />,
    THUMBNAIL: () => <Skeleton className="size-16 rounded-lg" />,
    AVATAR: () => <Skeleton variant="circular" className="size-10" />,
  },

  // Card skeletons
  Card: {
    SM: () => <Skeleton className="h-32 w-full" />,
    MD: () => <Skeleton className="h-48 w-full" />,
    LG: () => <Skeleton className="h-64 w-full" />,
  },

  // Button skeletons
  Button: {
    SM: () => <Skeleton className="h-8 w-16 rounded-full" />,
    MD: () => <Skeleton className="h-10 w-24 rounded-full" />,
    LG: () => <Skeleton className="h-12 w-32 rounded-full" />,
  },

  // Layout skeletons
  Layout: {
    Header: () => (
      <SkeletonContainer className="flex w-full items-center justify-between p-4">
        <Skeleton className="h-8 w-32" />
        <div className="flex space-x-4">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
        </div>
      </SkeletonContainer>
    ),
    Sidebar: () => (
      <SkeletonContainer className="w-64 p-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </SkeletonContainer>
    ),
  },
};
