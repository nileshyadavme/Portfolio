export const journalPosts = [
  {
    id: "slow-coding",
    title: "The Art of Slow Coding: Why Rushing Breaks More Than Just Code",
    date: "October 12, 2023",
    category: "Reflections",
    tags: ["mindset", "craft"],
    excerpt:
      "In a world obsessed with shipping features yesterday, the quiet practice of slowing down feels almost rebellious.",
    content: `In a world obsessed with shipping features yesterday, the quiet practice of slowing down feels almost rebellious.

## Why Stillness Matters

Last week, I spent three hours staring at a single function — not writing a line, just **understanding the data flow**. It wasn't wasted time. It was the difference between a patch that holds for a week and a solution that lasts for years.

## The Cost of Speed

Consider this complexity equation — a reminder that every shortcut compounds:

$$T_{debt} = \\sum_{i=1}^{n} \\frac{shortcuts_i}{quality_i}$$

The more shortcuts you take, the heavier the debt becomes over time.

## A Concrete Example

Here's a function I almost got wrong by rushing:

\`\`\`typescript
// BAD: mutates in place, hard to track
function applyDiscount(cart: Cart) {
  cart.items.forEach(item => item.price *= 0.9);
}

// GOOD: pure function, easier to test and debug
function applyDiscount(cart: Cart): Cart {
  return {
    ...cart,
    items: cart.items.map(item => ({ ...item, price: item.price * 0.9 })),
  };
}
\`\`\`

The second version is a few more lines, but it's **predictable, testable, and side-effect free**.

## The Takeaway

Slow coding is not about being slow. It's about being *deliberate*. Think first, type second.`,
    readTime: 5,
  },
  {
    id: "woodworking-and-code",
    title: "What Woodworking Taught Me About Software Architecture",
    date: "September 05, 2023",
    category: "Making",
    tags: ["architecture", "woodworking"],
    excerpt:
      "Measure twice, cut once. It applies to code just as much as it does to lumber.",
    content:
      "When you build a table, you don't start by gluing pieces together. You plan the joints, consider the grain direction, and account for wood movement over time.\n\nSoftware architecture is remarkably similar. If you don't plan your interfaces (the joints), consider the data flow (the grain), and account for changing requirements (wood movement), your application will eventually crack under pressure.\n\nHere are three principles from the woodshop that I apply to my codebase every day.",
    readTime: 4,
  },
  {
    id: "the-perfect-desk",
    title: "Designing the Perfect Developer Desk Setup",
    date: "August 20, 2023",
    category: "Workspace",
    tags: ["ergonomics", "hardware"],
    excerpt:
      "After years of back pain and cluttered cables, I finally built a desk setup that works for me.",
    content:
      "A good desk setup is like a good IDE—it should disappear when you're working. I spent the last month designing and building a custom standing desk with integrated cable management, hidden power strips, and a built-in wireless charger.\n\nThe key was to minimize visual noise. Every cable has a designated path, every peripheral has a home. The result is a workspace that invites focus rather than distraction.",
    readTime: 6,
  },
];
