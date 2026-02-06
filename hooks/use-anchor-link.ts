"use client";

import { useCallback, type MouseEvent } from "react";
import { useLenis } from "lenis/react";
import { usePathname, useRouter } from "next/navigation";

type AnchorLinkOptions = {
  updateHash?: boolean;
};

const normalizePath = (path: string) => {
  if (!path) return "/";
  if (path !== "/" && path.endsWith("/")) return path.slice(0, -1);
  return path;
};

export function useAnchorLink(options: AnchorLinkOptions = {}) {
  const { updateHash = true } = options;
  const lenis = useLenis();
  const pathname = usePathname();
  const router = useRouter();

  return useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) return;

      const target = event.currentTarget;
      const targetAttr = target.getAttribute("target");
      if (targetAttr === "_blank") return;

      const href = target.getAttribute("href");
      if (!href) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;
      if (!url.hash) return;

      const currentPath = normalizePath(pathname || "/");
      const targetPath = normalizePath(url.pathname || "/");

      if (currentPath !== targetPath) return;

      event.preventDefault();

      const hash = url.hash;
      if (updateHash && hash !== "#") {
        router.push(`${targetPath}${hash}`, { scroll: false });
      }

      const scrollToTop = () => {
        if (lenis) {
          lenis.scrollTo(0);
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      };

      if (hash === "#" || hash === "") {
        scrollToTop();
        return;
      }

      const id = decodeURIComponent(hash.slice(1));
      const element = document.getElementById(id);

      if (lenis) {
        if (element) {
          lenis.scrollTo(element);
        } else {
          lenis.scrollTo(hash);
        }
        return;
      }

      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [lenis, pathname, router, updateHash],
  );
}
