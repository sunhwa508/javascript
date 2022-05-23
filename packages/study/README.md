5/14

@rtk-query/codegen-openapi ./src/store/ts

getBaseQuery()
typescript + openApi + swagger

클린 아키텍쳐
비지니스에 맞게 설계 되어야 한다.
프론트영역에서는 UI / logic 영역 구분

5/21
https://parang.tech/react/2022-react-03/

## react-query

notifyOnChangeProps

- props 중 하나가 변경될 경우에만 해당 observer에게 변경 사항을 알려주고 리랜더 됩니다.
  observer 수준에서 설정할 수 있습니다.
- If set, the component will only re-render if any of the listed properties change.
- If set to ['data', 'error'] for example, the component will only re-render when the data or error properties change.
- If set to "tracked", access to properties will be tracked, and the component will only re-render when one of the tracked properties change.

notifyOnChangePropsExclusions: string[]

- If set, the component will not re-render if any of the listed properties change.
- If set to ['isStale'] for example, the component will not re-render when the isStale property changes.

```javascript
function TodoCounter() {
  // subscribe only to changes in the 'data' prop, which will be the
  // amount of todos because of the select function
  const counterQuery = useTodos({
    select: (data) => data.items.length,
    notifyOnChangeProps: ['data'],
  });

  React.useEffect(() => {
    console.log('rendering counter');
  });

  return <div>TodoCounter: {counterQuery.data ?? 0}</div>;
}
```

## Staying in sync

```javascript
export const useTodosCount = () => useTodosQuery((data) => data.length, ['data']);

function TodosCount() {
  // 🚨 we are using error, but we are not getting notified if error changes!
  const { error, data } = useTodosCount();

  return (
    <div>
      {error ? error : null}
      {data ? data : null}
    </div>
  );
}
```

## Tracked Queries

- notifyOnChangeProps를 ‘tracked’로 설정하면 React Query는 렌더링 중에 사용 중인 필드를 추적하고 이 필드를 사용하여 목록을 계산합니다.

```javascript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      notifyOnChangeProps: 'tracked',
    },
  },
})
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}

// 🚨 will track all fields
const { isLoading, ...queryInfo } = useQuery(...)

// ✅ this is totally fine
const { isLoading, data } = useQuery(...)


const queryInfo = useQuery(...)

// 🚨 will not corectly track data
React.useEffect(() => {
    console.log(queryInfo.data)
})

// ✅ fine because the dependency array is accessed during render
React.useEffect(() => {
    console.log(queryInfo.data)
}, [queryInfo.data])
```

- 업데이트: v4부터는 React Query에서 추적된 쿼리가 기본값별로 설정되며 notifyOnChangeProps: ‘all’을 사용하여 기능을 해제할 수 있습니다.

5/23
객체 지향 타입스크립트
SOLID

S 단일 책임 원칙
=> 순수 함수, 수정 해야 하는 이유가 하나
클린코드 원칙 => 함수는 하나의 기능만 해야한다 즉 단일 책임
순수 함수이자 단일 책임 원칙을 지킨다.
순수 함수 -> 사이드 이펙트를 없는 함수
클린코드 원칙이 잘 지켜진 함수는 순수 함수가 아닐 수 있다.
하지만 순수 함수인 녀석이 단일 책임을 지킬 수 있다.

### 단일 책임 원칙을 위배 하는 것

<img width="569" alt="image" src="https://user-images.githubusercontent.com/61695175/169813421-3dad5574-167b-4779-9085-9ef93ab8419b.png">

커피라는 객체가 order를 책임지고 있습니다
커피가 요리를 출력하고 주문숫자를 새고있다.

<img width="517" alt="image" src="https://user-images.githubusercontent.com/61695175/169813538-75e47fa7-e71c-4dec-aa0a-08b0bb8153e9.png">

O 개방 폐쇄 원칙
확장에는 열려있고 변경에는 닫혀있다.
추상화 개념이 들어간다.

<img width="286" alt="image" src="https://user-images.githubusercontent.com/61695175/169814874-9abfe1af-ec1a-463c-a5f1-e76f4373607d.png">

OrderList 라는 컴포넌트는 렌더를 어떻게 해야 하는가는 알 필요가 없다.

자바스크립트의 고질적 문제 -> abstract 강제하는 함수
부모클래스를 변경하면 안된다 가령 render() 같은 함수

확장에는 열려있다.
심장, 팔 다리,,.. -> 캡슐화된 녀석 (변경 할 수 없다, 원자적인 녀석들)
옷, 신발, 악세서리, 아파트에서 살래 -> 기능

추상화에 가장 크게 의존하는 것 -> 공통된 부분을 뽑아낸다.

L 리스코프 치환 원칙

<img width="456" alt="image" src="https://user-images.githubusercontent.com/61695175/169817856-bdf051cb-f562-482e-986f-a86ec19a5b42.png">

서브클래싱
아메리카노는 물이 있음 에스프레소는 물이 없음
에스프레소, 아메리카노는 완벽 하게 대치되지 않는다.
setCoffeeAmount(가능)
getWatherAmount(오류)

서브 타이핑이라는 개념이 들어가야 된다 .

<img width="237" alt="image" src="https://user-images.githubusercontent.com/61695175/169819332-ad1264e5-2f05-414f-b31d-f8fac16a3568.png">

관계가 완전히 설립되어야 한다.

함수, 객체를 작성해 놓고 A 타입은 B 타입과 일치해야한다.
A를 B로 치환했을때 동작해야 한다.

서브 클래스 => 상속을 해서 의존 하는 관계 부모 메소드와
is A 관계
아메리카노가 에스프레소는 확장했을떄
서브 타이핑 관계가 되지 못함

에스프레스 , 아메리카노 -> 커피
remake(커피) => 동일하게 동작해야 한다.

서브타입 관계여야하는데 서브클래스라서 문제인거에요?

getWaterAmount() 를 Espresso에 둬야 한다.

내가 어떤 함수만 만들면 모든 객체가 다 들어갈 수 있겠다.
에스프레소에는 없는 함수가 다른 객체들을 가지고 있네..?
이게 되면 안된다.

에스프레소 만들거야 아메리카노 만들거야

메서드 체이닝에 들어가는 것 컴포지션 ..

I interface 분리 원칙
<img width="319" alt="image" src="https://user-images.githubusercontent.com/61695175/169821248-9fd11d21-5930-498c-9fe8-cb1810c621a2.png">

- 말이 안되는 역할들이 3개 있다.
  interface => 이러한 형태로 만들라고 강제하는 틀

Coffee 라는 인터페이스

주문만 하는 객체
<img width="440" alt="image" src="https://user-images.githubusercontent.com/61695175/169821725-40231448-ba98-4937-9511-816b1697f4ac.png">

구현해야 하는 게 정해져 있는데
필요한 기능만 구현하기 위해 불필요한 요소들을 쪼개라

abstact 는 확장 가능
서브클래싱은 대체가 되지 않기 때문에 리스코프 치환이 안된다

D 의존성 역전 원칙
적절한 것에 잘 의존해야 한다

 <img width="793" alt="image" src="https://user-images.githubusercontent.com/61695175/169822739-e233ec4d-09fe-4922-8247-238bf490335d.png">

## Declare

타입을 선언하는 것을 알려줌
declare let / const
declare function
declare class
여기 타입이 선언 되어있다고 컴파일러에게 알려줌!
코드영역에는 전혀 영향을 미치지 않음

javascript 로 컴파일 되지 않고 사라진다.
declare type,declare interface 가 없는 이유
javascript 코드로 컴파일 되지 않자나요!

declare 파일 -> 선언하는 파일

.d.ts
구현이 아니라 선언부만 작성하는 파일

tsconfig skipLibCheck : false // true 권장
declare, export 만 들어갈 수 있다.

<img width="471" alt="image" src="https://user-images.githubusercontent.com/61695175/169826016-9dfa54a0-f19d-4970-8620-890308f2337f.png">

전역적으로 생성되는 객체

<img width="1497" alt="image" src="https://user-images.githubusercontent.com/61695175/169826384-454419f3-9091-493e-88e7-647a40ed3613.png">

모듈내에서 자동으로 export 해준다
<img width="1099" alt="image" src="https://user-images.githubusercontent.com/61695175/169827894-57e02917-a77e-4c20-a743-eebb223dfa8f.png">
<img width="1126" alt="image" src="https://user-images.githubusercontent.com/61695175/169828521-64b11720-5d02-4123-b46a-f932750a37b6.png">
declare , abstact 동일하게 동작함
