import React from 'react';
import {NextPage} from 'next';
import {getPost, getPostIds} from '../../lib/posts';

type Props = {
  post: Post
}

const postsShow: NextPage<Props> = (props) => {
  const {post} = props;
  return (
  <div>
    <h1>{post.title}</h1>
    <article dangerouslySetInnerHTML={{__html: post.htmlContent}}/>
  </div>
  );
};

export default postsShow;

export const getStaticPaths = async () => {
  const idList = await getPostIds();
  return {
    paths: idList.map(id => ({params: {id: id}})),
    fallback: true // 自动兜底功能，如果SSG没有找到则通过SSR查询
  };
};

export const getStaticProps = async (x: any) => {
  const id = x.params.id;
  const post = await getPost(id);
  return {
    props: {
      post: post
    }
  };
};
