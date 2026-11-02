import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { AppImage } from "@/components/shared/app-image";

describe("AppImage (next/image replacement)", () => {
  it("renders a native image with lazy loading by default", () => {
    render(<AppImage src="/logo.png" alt="Logo" width={64} height={64} />);

    const image = screen.getByAltText("Logo");
    expect(image.tagName).toBe("IMG");
    expect(image).toHaveAttribute("src", "/logo.png");
    expect(image).toHaveAttribute("loading", "lazy");
  });

  it("supports the next/image fill contract", () => {
    render(<AppImage src="/hero.jpg" alt="Hero" fill priority />);

    const image = screen.getByAltText("Hero");
    expect(image).toHaveAttribute("loading", "eager");
    expect(image.style.position).toBe("absolute");
  });

  it("does not leak next/image-only props to the DOM", () => {
    render(
      <AppImage
        src="/hero.jpg"
        alt="Hero"
        fill
        quality={80}
        placeholder="blur"
        blurDataURL="data:image/png;base64,abc"
      />
    );

    const image = screen.getByAltText("Hero");
    expect(image).not.toHaveAttribute("quality");
    expect(image).not.toHaveAttribute("placeholder");
    expect(image).not.toHaveAttribute("blurDataURL");
  });
});
