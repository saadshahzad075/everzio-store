"use client";

import { useState } from "react";
import { MessageCircle, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";
import { EVERZIO_WHATSAPP } from "@/lib/data";
import { buildWhatsAppUrl } from "@/lib/utils";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const whatsappHref = buildWhatsAppUrl(
    EVERZIO_WHATSAPP,
    "Hi Everzio team! I have an inquiry."
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <CartDrawer />

      <main id="main-content">
        <div className="everzio-container py-8 md:py-16">
          <FadeIn className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-semibold text-[--color-accent] uppercase tracking-widest mb-2">
              Get in Touch
            </p>
            <h1
              className="font-display text-3xl md:text-5xl font-semibold text-[--color-fg] mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              We're Here to Help
            </h1>
            <p className="text-[--color-muted-fg] text-base">
              Have a question about an order, product, or partnership? Reach out to us via WhatsApp, email, or send a message below.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Info cards */}
            <div className="space-y-4">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-5 rounded-[--radius-xl] bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={20} aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-[--color-fg]">WhatsApp Support</p>
                  <p className="text-xs text-[--color-muted-fg] mt-0.5">Fastest response within 30 mins</p>
                  <p className="text-xs font-semibold text-[#25D366] mt-2 group-hover:underline">Chat on WhatsApp →</p>
                </div>
              </a>

              <div className="p-5 rounded-[--radius-xl] bg-[--color-surface-elevated] border border-[--color-border] space-y-4">
                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-[--color-accent] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-xs text-[--color-fg]">Email</p>
                    <a href="mailto:support@everzio.com" className="text-xs text-[--color-muted-fg] hover:underline">
                      support@everzio.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[--color-accent] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-xs text-[--color-fg]">Location</p>
                    <p className="text-xs text-[--color-muted-fg]">Karachi / Lahore, Pakistan</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-[--color-accent] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-xs text-[--color-fg]">Hours</p>
                    <p className="text-xs text-[--color-muted-fg]">Mon–Sat: 9am – 9pm PKT</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2 bg-[--color-surface] p-6 md:p-8 rounded-[--radius-2xl] border border-[--color-border] shadow-[--shadow-sm]">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                  <CheckCircle2 size={48} className="text-[--color-success]" />
                  <h2 className="font-display text-2xl font-semibold text-[--color-fg]">Message Sent!</h2>
                  <p className="text-sm text-[--color-muted-fg] max-w-sm">
                    Thank you for contacting Everzio. Our support team will respond to your email shortly.
                  </p>
                  <Button variant="outline" size="md" onClick={() => setSubmitted(false)}>
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="font-semibold text-lg text-[--color-fg]">Send a Message</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-semibold mb-1">
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        className="w-full h-10 px-3 rounded-[--radius-md] border border-[--color-border] bg-[--color-surface] text-sm focus:outline-none focus:ring-2 focus:ring-[--color-ring]"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-semibold mb-1">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        className="w-full h-10 px-3 rounded-[--radius-md] border border-[--color-border] bg-[--color-surface] text-sm focus:outline-none focus:ring-2 focus:ring-[--color-ring]"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-semibold mb-1">
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      placeholder="e.g. Order Inquiry, Product Question"
                      className="w-full h-10 px-3 rounded-[--radius-md] border border-[--color-border] bg-[--color-surface] text-sm focus:outline-none focus:ring-2 focus:ring-[--color-ring]"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold mb-1">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      required
                      className="w-full px-3 py-2 rounded-[--radius-md] border border-[--color-border] bg-[--color-surface] text-sm focus:outline-none focus:ring-2 focus:ring-[--color-ring] resize-none"
                    />
                  </div>
                  <Button type="submit" variant="primary" size="lg" loading={loading} rightIcon={<Send size={14} />}>
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
