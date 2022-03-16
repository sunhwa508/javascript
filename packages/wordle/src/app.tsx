import { h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import styled from 'styled-components';
import { KEY_ARRAY1, KEY_ARRAY2, KEY_ARRAY3 } from './utils/constants';
import { DB_WORDS } from './utils/data';

export function App() {
  const [arr, setArr] = useState<String[][]>(Array.from(Array(6), () => new Array(5).fill('')));
  const curr = useRef(0);
  const count = useRef(0);
  const [isAbled, setIsAbled] = useState(true);
  const firstKeys = useRef(KEY_ARRAY1);
  const secondKeys = useRef(KEY_ARRAY2);
  const thridKeys = useRef(KEY_ARRAY3);
  const currentLevel = useRef(0);
  const handleKey = (e: React.MouseEvent<HTMLButtonElement>) => {
    if ((count.current === 5 && curr.current === 5 && e.currentTarget.value !== '삭제') || curr.current === 6) {
      return;
    }

    if (count.current === 5) {
      count.current = 0;
      ++curr.current;
    }
    if (e.currentTarget.value === '삭제') {
      console.log(currentLevel.current, curr.current);
      return;
    }
    if (e.currentTarget.value === '삭제') {
      setIsAbled(true);
      if (curr.current === 0 && count.current === 0) {
        return;
      }
      setArr((prev) => {
        const temp = [...prev];
        if (count.current === 0) {
          count.current = 5;
          curr.current--;
        }
        temp[curr.current][count.current - 1] = '';
        count.current--;
        return temp;
      });
    } else if (isAbled && e.currentTarget.value !== 'ENTER') {
      setArr((prev) => {
        const temp = [...prev];
        temp[curr.current][count.current] = e.currentTarget.value;
        count.current++;
        return temp;
      });
    }
    if (e.currentTarget.value === 'ENTER') {
      setIsAbled(true);
      if (arr[curr.current - 1].join('').length === 5) {
        const word = arr[curr.current - 1].join('');
        if (DB_WORDS.includes(word.toLocaleLowerCase())) {
          currentLevel.current++;
          alert('정답입니다!');
          setIsAbled(true);
        } else {
          alert('리스트에 없습니다!');
          setIsAbled(false);
        }
      }
    }
  };
  useEffect(() => {
    arr.map((item) => {
      if (item.join('').length === 5) {
        const word = item.join('');
        if (DB_WORDS.includes(word)) {
          // setIsAbled(true);
        }
        if (count.current === 5) {
          setIsAbled(false);
        }
        // if (!DB_WORDS.includes(word)) {
        //   setIsAbled(false);
        // }
      }
    });
  }, [arr]);

  return (
    <Container>
      <h1>WORDLE</h1>
      {arr.map((item, i) => {
        return (
          <Wrapper>
            {item.map((element, i) => {
              return <div>{element}</div>;
            })}
          </Wrapper>
        );
      })}
      <KeyWrapper>
        <Row>
          {firstKeys.current.map((item) => {
            return (
              <Key onClick={(e: any) => handleKey(e)} value={item} data-key={item}>
                {item}
              </Key>
            );
          })}
        </Row>
        <Row>
          {secondKeys.current.map((item) => {
            return (
              <Key onClick={(e: any) => handleKey(e)} value={item} data-key={item}>
                {item}
              </Key>
            );
          })}
        </Row>
        <Row>
          {thridKeys.current.map((item) => {
            return (
              <Key onClick={(e: any) => handleKey(e)} value={item} data-key={item}>
                {item}
              </Key>
            );
          })}
        </Row>
      </KeyWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-bottom: 4px;
  & div {
    margin: 2px;
    color: #000;
    width: 50px;
    height: 50px;
    background-color: #eaeaea;
  }
`;
const KeyWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
`;
const Row = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto 8px;
  touch-action: manipulation;
`;
const Key = styled.button`
  font-weight: bold;
  border: 0;
  padding: 0;
  margin: 0 6px 0 0;
  height: 58px;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  background-color: #eaeaea;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);
`;
