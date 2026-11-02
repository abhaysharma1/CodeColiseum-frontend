import type { ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type NativeImgProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "width" | "height" | "loading"
>;

export interface AppImageProps extends NativeImgProps {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  /** Matches next/image: the image fills its positioned parent. */
  fill?: boolean;
  /** Matches next/image: eager loading for above-the-fold images. */
  priority?: boolean;
  quality?: number;
  unoptimized?: boolean;
  loader?: unknown;
  placeholder?: unknown;
  blurDataURL?: string;
}

/**
 * Drop-in replacement for `next/image` in the Vite app.
 *
 * Vite has no image optimization server, so this renders a native `<img>` with
 * the same layout contract (`fill`) and lazy-loading defaults. Object-fit and
 * sizing continue to come from the existing utility classes.
 */
export function AppImage({
  src,
  alt = "",
  width,
  height,
  fill = false,
  priority = false,
  quality: _quality,
  unoptimized: _unoptimized,
  loader: _loader,
  placeholder: _placeholder,
  blurDataURL: _blurDataURL,
  className,
  style,
  ...rest
}: AppImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={cn(fill && "absolute inset-0 h-full w-full", className)}
      style={
        fill
          ? {
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              ...style,
            }
          : style
      }
      {...rest}
    />
  );
}

export default AppImage;
