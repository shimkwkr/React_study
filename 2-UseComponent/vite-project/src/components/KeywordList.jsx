import React, { useEffect, useState } from "react";
import store from "../Store";
import List from "./List";


const KeywordList = ({onClick}) => {
    const [keywordList, setKeywordList] = useState([])

    useEffect(() => {
        const keywordList = store.getKeywordList();
        setKeywordList(keywordList)
    }, [])

    return (
        // 랜더링을 그리도록 사용하는 props인 renderprops를(renderItem) 사용
        <List data={keywordList} onClick={onClick} renderItem={(item, index) => (
            <>
                <span className="number">{index + 1}</span>
                <span>{item.keyword}</span>
            </>
        )} />
    )
}

export default KeywordList