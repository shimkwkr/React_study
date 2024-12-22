import React, { useState, useEffect } from "react"


const SearchForm = ({value, onChange, onSubmit, onReset}) => {

    const handleChangeInput = (event) => {
        const value = event.target.value

        onChange(value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // props의 콜백함수를 호출
        onSubmit(value);
    }

    const handleReset = () => {
        // props의 콜백함수를 호출
        onReset()
    }


    return (
        <form 
            onSubmit={(event) => handleSubmit(event)}
            onReset={() => handleReset()}
        >
            <input
                type="text"
                placeholder="검색어를 입력하세요"
                autoFocus
                value={value}
                onChange={(event) => handleChangeInput(event)}
            >
            </input>
            {value.length > 0 && (
                <button type="reset" className="btn-reset"></button>
            )}
        </form>
    )
}

export default SearchForm