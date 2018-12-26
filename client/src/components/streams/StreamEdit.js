import React, {Component} from 'react';
import {fetchStream, editStream} from '../../actions';
import {connect} from 'react-redux';
import StreamForm from './StreamForm';
import _ from 'lodash';

class StreamEdit extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues);
  }

  render() {
    if(!this.props.stream){
      return(null);
    }
    return(
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm
          initialValues={_.pick(this.props.stream, 'title', 'description')}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapsStateToProps = (state, ownProps) => {
  return({stream: state.streams[ownProps.match.params.id]});
}

export default connect(mapsStateToProps, {
  fetchStream,
  editStream
})(StreamEdit);
