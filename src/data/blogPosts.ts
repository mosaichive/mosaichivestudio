export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  author: string;
  authorImage: string;
  readTime: number;
  featured?: boolean;
}

// The journal is intentionally empty until the first essays are ready.
// The /blog page renders a refined "coming soon" treatment in this state.
export const blogPosts: BlogPost[] = [];
