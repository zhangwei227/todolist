import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component {


  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { deleteItem, index } = this.props;
    deleteItem(index);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.content !== this.props.content) {
      return true;
    } else {
      return false;
    }
  }

  // 一个组件要从父组件接受参数
  // 如果这个组件第一次存在父组件之中，不会执行
  // 如果这个组件之前已经存在父组件之中，才会执行
  componentWillReceiveProps() {
    console.log("child componentWillReceiveProps");
  }

  // 当这个组件即将被从页面剔除的时候，会被执行
  componentWillUnmount() {
    console.log("child componentWillUnmount");
  }

  render() {
    const { content } = this.props;
    return <li onClick={this.handleClick}>{content}</li>
  }
}

TodoItem.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  deleteItem: PropTypes.func,
  index: PropTypes.number
}

export default TodoItem;