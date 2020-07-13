/*条件渲染和列表渲染*/
import React from 'react'
import ReactDOM from 'react-dom'
const numbers = [1,2,3,4,5]
const listItem = numbers.map((number)=>
    <li>{number}</li>
)
ReactDOM.render(
    <ul>
        {listItem}
    </ul>,
    document.getElementById('root')
)