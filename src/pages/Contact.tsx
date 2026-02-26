import { motion } from "motion/react";
import { useState } from "react";
import { config } from "../data/config";
import { Squiggle } from "../components/Squiggle";
import { StickyNote } from "../components/StickyNote";
import { Button } from "../components/Button";
import { Toast, useCopyToast } from "../components/Toast";
import { Send, Mail, Twitter, Github, Linkedin, Copy } from "lucide-react";

export function Contact() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const copyToClipboard = useCopyToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate form submission — replace with real API call
    setTimeout(() => {
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    }, 1500);
  };

  return (
    <>
      <div className="space-y-16">
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
              Say Hello
            </h1>
            <p className="font-handwriting text-3xl text-[var(--color-secondary)] mb-8">
              Let's build something together
            </p>
            <p className="font-body text-xl text-[var(--color-text)]/80 dark:text-[var(--color-dark-text)]/80 leading-relaxed">
              Whether you have a project in mind, want to talk about design, or
              just want to say hi, my inbox is always open.
            </p>
          </motion.div>
        </section>

        <Squiggle className="text-[var(--color-gold)]" />

        <section className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block font-handwriting text-2xl text-[var(--color-text)]/80 dark:text-[var(--color-dark-text)]/80"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-[var(--color-gold)]/30 focus:border-[var(--color-accent)] outline-none py-2 font-body text-lg transition-colors"
                  placeholder="Jane Doe"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block font-handwriting text-2xl text-[var(--color-text)]/80 dark:text-[var(--color-dark-text)]/80"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-[var(--color-gold)]/30 focus:border-[var(--color-accent)] outline-none py-2 font-body text-lg transition-colors"
                  placeholder="jane@example.com"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="block font-handwriting text-2xl text-[var(--color-text)]/80 dark:text-[var(--color-dark-text)]/80"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-[var(--color-gold)]/30 focus:border-[var(--color-accent)] outline-none py-2 font-body text-lg transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <div className="pt-4">
                {status === "success" ? (
                  <StickyNote
                    color="green"
                    rotation={-1}
                    className="inline-block"
                  >
                    <p>Thanks! I'll get back to you soon.</p>
                  </StickyNote>
                ) : (
                  <Button
                    type="submit"
                    variant="stamp"
                    className="w-full md:w-auto"
                  >
                    {status === "submitting" ? "Sending..." : "Send Message"}{" "}
                    <Send className="w-5 h-5 ml-2 inline" />
                  </Button>
                )}
              </div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-12"
          >
            <div>
              <h3 className="font-display text-3xl font-bold mb-6">
                Other ways to connect
              </h3>
              <ul className="space-y-6">
                <li>
                  <button
                    onClick={async () => {
                      const email = config.socials.email.replace("mailto:", "");
                      const ok = await copyToClipboard(email);
                      if (ok) setToastVisible(true);
                    }}
                    className="flex items-center gap-4 font-body text-lg hover:text-[var(--color-accent)] transition-colors group w-full text-left"
                  >
                    <div className="p-3 bg-[var(--color-gold)]/10 rounded-full group-hover:bg-[var(--color-accent)]/10 transition-colors">
                      <Mail className="w-6 h-6" />
                    </div>
                    <span className="flex-1">{config.socials.email.replace("mailto:", "")}</span>
                    <Copy className="w-4 h-4 opacity-30 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
                <li>
                  <a
                    href={config.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 font-body text-lg hover:text-[var(--color-accent)] transition-colors group"
                  >
                    <div className="p-3 bg-[var(--color-gold)]/10 rounded-full group-hover:bg-[var(--color-accent)]/10 transition-colors">
                      <Twitter className="w-6 h-6" />
                    </div>
                    @alexmaker
                  </a>
                </li>
                <li>
                  <a
                    href={config.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 font-body text-lg hover:text-[var(--color-accent)] transition-colors group"
                  >
                    <div className="p-3 bg-[var(--color-gold)]/10 rounded-full group-hover:bg-[var(--color-accent)]/10 transition-colors">
                      <Github className="w-6 h-6" />
                    </div>
                    github.com/alexmaker
                  </a>
                </li>
                <li>
                  <a
                    href={config.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 font-body text-lg hover:text-[var(--color-accent)] transition-colors group"
                  >
                    <div className="p-3 bg-[var(--color-gold)]/10 rounded-full group-hover:bg-[var(--color-accent)]/10 transition-colors">
                      <Linkedin className="w-6 h-6" />
                    </div>
                    linkedin.com/in/alexmaker
                  </a>
                </li>
              </ul>
            </div>

            <StickyNote color="blue" rotation={2} className="w-full max-w-sm">
              <p>
                I'm currently {config.availability.toLowerCase()}. Let's chat!
              </p>
            </StickyNote>
          </motion.div>
        </section>
      </div >

      <Toast
        message="Email copied to clipboard!"
        visible={toastVisible}
        onDismiss={() => setToastVisible(false)}
      />
    </>
  );
}
