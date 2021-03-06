import {NextPage} from 'next';
import Link from 'next/link';
import {getPosts} from '../../lib/posts';

type Posts = {
  posts: Post[];
}

const PostsIndex: NextPage<Posts> = (props => {
  const {posts} = props;
  return (
  <div>
    <h1>文章列表</h1>
    {posts.map(p => <div key={p.id}>
      <Link href={`/posts/${p.id}`}>
        <a>{p.id}</a>
      </Link>
    </div>)}
  </div>
  );
});

export default PostsIndex;

export const getStaticProps = async () => {
  const posts = await getPosts();
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts))
    }
  };
};
