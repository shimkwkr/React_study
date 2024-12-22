import { formatRelativeDate } from "./js/helpers.js";
import store from "./js/Store.js";

const TabType = {
  KEYWORD : "KEYWORD",
  HISTORY : "HISTORY",
};

const TabLabel = {
  [TabType.KEYWORD] : "추천 검색어",
  [TabType.HISTORY] : "최근 검색어",
}

function App () {
  const [searchKeyWord, setSearchKeyWord] = React.useState("")
  const [searchResult, setSearchResult] = React.useState([])
  const [submitted, setSubmitted]= React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState(TabType.KEYWORD)
  const [keywordList, setKeywordList] = React.useState([]);
  const [historyList, setHistoryList] = React.useState([]);
  
  // 컴포넌트 초기화 시 추천 검색어와 검색 기록을 store에서 불러옴
  // 컴포넌트가 처음 마운트될 때만 실행
  React.useEffect(() => {
    const keywordList = store.getKeywordList()
    const historyList = store.getHistoryList()

    setKeywordList(keywordList)
    setHistoryList(historyList)

  }, [])

  // 검색어 변화를 추적, 출력
  React.useEffect (() => {
    console.log("searchKeyWord :", searchKeyWord);
    console.log("searchResult :", searchResult);
    console.log("submitted :", submitted);
    
  }, [searchKeyWord, searchResult, submitted])

  // 검색어 변화를 추적해 searchKeyWord에 할당
  const handlerChangeInput = (event) => {
    const value = event.target.value
    
    // 만약 검색어의 길이가 0이면 reset과 같은 동작
    if (value.length <= 0 && submitted) {
      handleReset();
    }
    
    setSearchKeyWord(value)
  }

  // 검색어 제출 함수
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // 검색 함수
    search(searchKeyWord)
  }

  // 검색 함수
  const search = (searchKeyWord) => {
    const result = store.search(searchKeyWord)
    const historyList = store.getHistoryList()

    setSearchKeyWord(searchKeyWord)
    setSearchResult(result)
    setSubmitted(true)
    setHistoryList(historyList)
  }

  // 리셋 버튼 함수
  const handleReset = () => {
    setSearchKeyWord("")
    setSearchResult([])
    setSubmitted(false)
  }

  // 검색기록 삭제 함수
  const handleClickRemoveHistory = (event, keyword) => {
    event.stopPropagation()
    store.removeHistory(keyword)
    const historyList = store.getHistoryList()
    setHistoryList(historyList)
  }


  // 검색 결과 리스트 화면
  const SearchResult = () => (
    searchResult.length > 0 ? (
      <ul className="result">
        {searchResult.map((item) => (
          <li key={item.id}>
            <img src={item.imageUrl} alt={item.name}></img>
            <p>{item.name}</p>
          </li>
        ))}
      </ul>
    ) : (
      <div className="empty-box">
        검색 결과가 없습니다.
      </div>
    )
  )

  // 추천 키워드 | 검색한 키워드 탭창
  const Tabs = () => (
    <>
      <ul className="tabs">
        {Object.values(TabType).map((tabType) => (
          <li
            className={selectedTab === tabType ? "active" : ""}
            key={tabType}
            onClick={() => setSelectedTab(tabType)}
          >
            {TabLabel[tabType]}
          </li>
        ))}
      </ul>
      {selectedTab === TabType.KEYWORD && <KeyWordList />}
      {selectedTab === TabType.HISTORY && <HistoryList />}
    </>
  )

  // 추천 키워드 창
  const KeyWordList = () => (
    <ul className="list">
      {keywordList.map((item, index) => (
        <li key={item.id} onClick={() => search(item.keyword)}>
          <span className="number">{index + 1}</span>
          <span>{item.keyword}</span>
        </li>
      ))}
    </ul>
  )

  // 검색 결과 창
  const HistoryList = () => (
    <ul className="list">
      {historyList.map(({id, keyword, date}) => (
        <li key={id} onClick={() => search(keyword)}>
          <span>{keyword}</span>
          <span className="date">{formatRelativeDate(date)}</span>
          <button className="btn-remove" onClick={(event) => handleClickRemoveHistory(event, keyword)}></button>
        </li>
      ))}
    </ul>
  )

  return (
    <>
      <header>
        <h2>검색 </h2>
      </header>

      <div className="container">

        <form onSubmit={handleSubmit} onReset={handleReset}>
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            autoFocus
            value={searchKeyWord}
            onChange={handlerChangeInput}
          >
          </input>
          <button type="reset" className="btn-reset"></button>
        </form>

        <div className="content">
          {submitted ? <SearchResult /> : <Tabs />}
        </div>
      </div>
    </>
  )
}

const container = document.querySelector("#app")
const root = ReactDOM.createRoot(container)
root.render(<App/>)