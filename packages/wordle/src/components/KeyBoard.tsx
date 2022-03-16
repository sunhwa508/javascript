import { useRef } from 'preact/hooks';
import { KEY_ARRAY1, KEY_ARRAY2, KEY_ARRAY3 } from '../utils/constants';
import styled from 'styled-components';
import { JSXInternal } from 'preact/src/jsx';
const KeyBoard = () => {
  const firstKeys = useRef(KEY_ARRAY1);
  const secondKeys = useRef(KEY_ARRAY2);
  const thrideys = useRef(KEY_ARRAY3);
  const handleKey = (e: JSXInternal.TargetedMouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.value);
  };
  return (
    <KeyWrapper>
      <Row>
        {firstKeys.current.map((item, i) => {
          return (
            <Key onClick={(e) => handleKey(e)} value={item} data-key={item}>
              {item}
            </Key>
          );
        })}
      </Row>
      <Row>
        {secondKeys.current.map((item, i) => {
          return <Key data-key={item}>{item}</Key>;
        })}
      </Row>
      <Row>
        {thrideys.current.map((item, i) => {
          return <Key data-key={item}>{item}</Key>;
        })}
      </Row>
    </KeyWrapper>
  );
};

export default KeyBoard;
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
