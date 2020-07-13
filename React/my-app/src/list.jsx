/*条件渲染和列表渲染*/
import React, {Component} from 'react'
class ListItem extends Component{
    forItem(){
        const numbers = [1,2,3,4,5]
        const Item = numbers.map((number)=>
            <li key={number.toString()}>{number}</li>
        )
        return Item
    }

    render() {
        return (
            <ul>
                {this.forItem()}
            </ul>
        )
    }
}
export default ListItem