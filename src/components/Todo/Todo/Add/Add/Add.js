import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { add } from '../../../Store/Actions'

import Aux from '../../../../../utils/Aux';

import './Add.css'

class Add extends Component {
  state = {
    add: ''
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onAddItem = e => {
    e.preventDefault();
    let uid = this.props.todo.uid
    let todo = this.props.location.pathname.split('/')[1]
    let add = this.state.add;
    this.props.add(uid, todo, add);
    this.setState({ add: '' })
  }

  render() {
    return (
      <Aux>
        <div className='AddNew'>
          <input 
            className
            placeholder='Add a to do'
            onChange={this.onChange}
            value={this.state.add}
            name='add'
            type='text' />
          <i onClick={this.onAddItem} className="material-icons">add_circle</i>
        </div>
      </Aux>
      
    )
  }
}

const mapStateToProps = state => {
  return {
    todo: state.todo
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, { add })
)(Add);