import Link from "next/link";
import type { PostMeta } from "../api";
import styles from "../../styles/Articles.module.css";

export default function ArticleTile({ posts }: { posts: PostMeta[] }) {
  return (
    <ul className={styles.list}>
      {posts.map((post) => (
        <li key={post.title}>
          <div className={styles.title}>
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          </div>
          <p className={styles.excerpt}>{post.excerpt}</p>
          <p className={styles.tags}>
            {post.tags.map((tag) => (
              <span key={tag}>
                <Link href={`/tags/${tag}`}>{tag}</Link>{" "}
              </span>
            ))}
          </p>
        </li>
      ))}
    </ul>
  );
}
