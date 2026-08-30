import Image from "next/image";
import { Heart, Camera } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";
import { EVERZIO_INSTAGRAM } from "@/lib/data";

const INSTAGRAM_POSTS = [
  {
    id: "ig-1",
    image: "https://images.unsplash.com/photo-1602874801007-bd458bb1b5c2?w=800&q=80",
    likes: "1.4k",
    comments: "42",
    handle: "@everzio_store",
  },
  {
    id: "ig-2",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
    likes: "2.1k",
    comments: "89",
    handle: "@everzio_store",
  },
  {
    id: "ig-3",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    likes: "980",
    comments: "31",
    handle: "@everzio_store",
  },
  {
    id: "ig-4",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
    likes: "3.2k",
    comments: "114",
    handle: "@everzio_store",
  },
  {
    id: "ig-5",
    image: "https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=800&q=80",
    likes: "1.8k",
    comments: "63",
    handle: "@everzio_store",
  },
  {
    id: "ig-6",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    likes: "2.7k",
    comments: "95",
    handle: "@everzio_store",
  },
];

export function InstagramGrid() {
  return (
    <section className="section-y" aria-labelledby="instagram-heading">
      <div className="everzio-container">
        {/* Header */}
        <FadeIn className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-semibold text-amber-600 uppercase tracking-widest mb-2 flex items-center justify-center gap-1.5">
            <Camera size={14} className="text-amber-500" />
            Social Community
          </p>
          <h2
            id="instagram-heading"
            className="font-display text-3xl md:text-5xl font-semibold text-slate-900 mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Follow Us On Instagram
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Tag <span className="font-semibold text-slate-900">#EVERZIO</span> or tag{" "}
            <a
              href={EVERZIO_INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-600 underline font-semibold hover:text-amber-700"
            >
              @everzio_store
            </a>{" "}
            to be featured in our luxury lifestyle lookbook.
          </p>
        </FadeIn>

        {/* 6-Grid Tile */}
        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <StaggerItem key={post.id}>
              <a
                href={EVERZIO_INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square rounded-[--radius-xl] overflow-hidden bg-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200"
                aria-label={`View Instagram post with ${post.likes} likes`}
              >
                <Image
                  src={post.image}
                  alt="EVERZIO Instagram Showcase"
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px] flex flex-col items-center justify-center text-white p-3">
                  <Camera size={22} className="text-amber-400 mb-2 transform group-hover:scale-110 transition-transform" />
                  <div className="flex items-center gap-1.5 text-xs font-semibold">
                    <Heart size={13} className="fill-rose-400 text-rose-400" />
                    <span>{post.likes}</span>
                  </div>
                  <span className="text-[10px] text-slate-300 mt-1 font-medium">
                    {post.handle}
                  </span>
                </div>
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bottom CTA Button */}
        <div className="text-center mt-8">
          <a
            href={EVERZIO_INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#090D16] text-white text-sm font-semibold hover:bg-amber-600 transition-all shadow-md"
          >
            <Camera size={18} className="text-amber-400" />
            Join 25,000+ Followers @everzio_store
          </a>
        </div>
      </div>
    </section>
  );
}

export default InstagramGrid;
