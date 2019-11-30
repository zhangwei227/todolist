import React, { Component, Fragment } from 'react';
import TodoItem from './TodoItem';
import axios from 'axios';
import './style.css';


class TodoList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      list: []
    }
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange() {
    const value = this.input.value;
    this.setState(() => ({
      inputValue: value
    }))
    // this.setState({
    //   inputValue: e.target.value
    // })
  }

  handleBtnClick() {
    this.setState((prevState) => ({
      list: [...prevState.list, prevState.inputValue],
      inputValue: ''
    }))
    // this.setState({
    //   list: [...this.state.list, this.state.inputValue],
    //   inputValue: ''
    // })
  }

  handleDelete(index) {
    console.log(index);
    this.setState((prevState) => {
      const list = [...prevState.list];
      list.splice(index, 1);
      return { list }
    })
    // this.setState({
    //   list: list
    // })
  }

  getTodoItem() {
    return this.state.list.map((item, index) => {
      return (
        <TodoItem
          key={item}
          content={item}
          index={index}
          deleteItem={this.handleDelete}
        />
      )
    })
  }

  // 在组件即将被挂载到页面的时刻自动执行 
  componentWillMount() {
    console.log("componentWillMount");
  }

  // 在组建被挂载到页面以后，自动执行
  componentDidMount() {
    axios.get('/api/todolist').then((res) => {
      console.log(res.data);
      this.setState(() => ({
        list: [...res.data]
      }))
    }).catch(() => {
      alert('error');
    })
  }

  // 组件被更新之前，自动执行
  shouldComponentUpdate() {
    console.log("shouldComponentUpdate");
    return true;
  }

  // 组件被更新之前，在shouldComponentUpdate之后自动执行，
  // 如果shouldComponentUpdate返回true会执行，反之则不会执行
  componentWillUpdate() {
    console.log("componentWillUpdate");
  }

  // 组件更新完成之后，自动执行
  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  // 
  componentWillReceiveProps() {
    console.log("componentWillReceiveProps");
  }

  render() {
    console.log("render");
    return (
      <Fragment>
        <div>
          <label htmlFor='insertArea'>输入内容</label>
          <input
            id='insertArea'
            className='input'
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            ref={(input) => { this.input = input }}
          />
          <button onClick={this.handleBtnClick}>提交</button>
        </div>
        <ul>
          {this.getTodoItem()}
        </ul>
      </Fragment>
    )
  }
}

export default TodoList;