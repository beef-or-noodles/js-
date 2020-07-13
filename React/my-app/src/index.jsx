
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import ListItem from './list'
/*
* 格子组件
* props 接收参数 包括事件
* */
function Square(props){
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}
/*
* 继承Component的方式创建组件
* 创建棋盘
* */
class Board extends Component {
    renderSquare(i) {
        return <Square
                    value={this.props.squares[i]}
                    onClick={() => this.props.onClick(i)}
                />
        }
    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}
/*
* 组合游戏界面Game 还有游戏逻辑也在里面
* */
class Game extends Component {
    // 构造器
    constructor(props){
        super(props)
        //State 与 props 类似，但是 state 是私有的，并且完全受控于当前组件。
        this.state = {
            // 历史记录数组
            history:[{
                squares: Array(9).fill(null)
            }],
            xIsNext:true,
            stepNumber: 0,
        }
    }
    /*跳转到指定步数*/
    jumpTo(step) {
        // 设置状态数据
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }
    /*
    * 格子点击事件 并拿到当前的index
    * */
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[this.state.stepNumber];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }
    /*每次组件更新时 render 方法都会被调用*/
    render() {

        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = '胜利者: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        /*
        * 返回html模板
        * */
        return (
            <div className="game">
                <div className="game-board">
                    <ListItem/>
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================
//ReactDOM.render() 渲染我们的组件到指定dom里面
ReactDOM.render(
    <Game />
    ,document.getElementById('root')
);
/*一个计算胜利者的方法*/
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}