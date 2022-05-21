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

- props 중 하나가 변경될 경우에만 해당 observer에게 변경 사항을 알려주도록 observer 수준에서 설정할 수 있습니다

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
