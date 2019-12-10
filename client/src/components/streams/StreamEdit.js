import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id); 
    }

    onSubmit = formValues => {
        this.props.editStream(this.props.match.params.id, formValues)
    }
    
    //props.match.params.id contains the url id
    render() {
        console.log(this.props)
        if (!this.props.stream) {
            return (
                <div>
                    Loading...
                </div>
            );
        } else {
            return (
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
}

const mapStateToProps = (state, ownProps) => { //ownProps is the props of StreamEdit, state is the redux store state
    return { stream: state.streams[ownProps.match.params.id] }
}
export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);