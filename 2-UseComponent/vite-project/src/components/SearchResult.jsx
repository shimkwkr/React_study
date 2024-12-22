
const SearchResult = ({data = []}) => {

    if (data.length <= 0) {
        return (
            <div className="empty-box">
                검색 결과가 없습니다.
            </div>
        )
    }

    return (
        <ul className="result">
            {data.map((item) => (
            <li key={item.id}>
                <img src={item.imageUrl} alt={item.name}></img>
                <p>{item.name}</p>
            </li>
            ))}
        </ul>
    )
}

export default SearchResult