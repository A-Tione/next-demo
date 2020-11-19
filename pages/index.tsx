import {GetServerSideProps, NextPage} from 'next';
import {useEffect, useState} from 'react';
import {UAParser} from 'ua-parser-js';

type Props = {
  browser: {
    name: string;
    version: string;
    major: string;
  }
  xxx: string
}

const index: NextPage<Props> = (props) => {
  const {browser, xxx} = props;
  const [width, setWidth] = useState(0);
  console.log(xxx, 'xxx ');
  useEffect(() => {
    const w = document.documentElement.clientWidth;
    setWidth(w);
  }, []);
  return (
    <div>
      <h1>{xxx}</h1>
      <h1>你的浏览器是 {browser.name}</h1>
      <h2>你的浏览器窗口大小是 {width} 像素</h2>
    </div>
  );
};
export default index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ua = context.req.headers['user-agent'];
  const result = new UAParser(ua).getResult();
  return {
    props: {
      browser: result.browser,
      xxx: 'bbb'
    }
  };
};
