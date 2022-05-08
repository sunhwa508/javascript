import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';
import axios from 'axios';
import ItemList from '../src/component/ItemList';
export default function Home() {
  const [list, setList] = useState([]);
  const BASE_URL = 'https://api.sampleapis.com/coffee/hot';

  const getData = () => {
    axios.get(BASE_URL).then((res) => {
      setList(res.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Head>
        <title>HOME</title>
      </Head>
      <ItemList list={list} />
      create-next-app 으로 설치하면
      <br />
      1. 컴파일과 번들링이 자동으로 된다.
      <br />
      2. 자동 리프레쉬 기능으로 수정하면 화면에 바로 반영된다.
      <br />
      3. 서버사이드 렌더링이 지원된다.
      <br />
      4. 스태틱 파일을 지원합니다.
    </div>
  );
}
