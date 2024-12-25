import React ,{ useEffect, useState } from "react"
import store from "../Store"
import List from "./List"
import { formatRelativeDate } from "../helpers"

const HistoryList = ({onClick}) => {
    const [historyList, sethistoryList] = useState([])

    useEffect(() => {
        const historyList = store.getHistoryList();
        sethistoryList(historyList)
    }, [])

    const handleClickRemove = (event, keyword) => {
        event.stopPropagation();
        store.removeHistory(keyword)

        const historyList = store.getHistoryList();
        sethistoryList(historyList)
    }

    return (
        <List 
            data={historyList}
            onClick={onClick}
            renderItem={(item) => (
                <>
                    <span>{item.keyword}</span>
                    <span className="date">{formatRelativeDate(item.date)}</span>
                    <button 
                        className="btn-remove"
                        onClick={(event) => handleClickRemove(event, item.keyword)}
                    />
                </>
            )}
        />
    )
}

export default HistoryList