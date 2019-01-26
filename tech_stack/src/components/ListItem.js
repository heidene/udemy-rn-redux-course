import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  UIManager,
  LayoutAnimation,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
import * as actions from '../actions';

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15,
  },
};

class ListItem extends Component {
  constructor() {
    super();
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  renderDescription = () => {
    const { library, expanded } = this.props;
    if (expanded) {
      return (
        <CardSection>
          <Text style={{ flex: 1 }}>{library.description}</Text>
        </CardSection>
      );
    }
    return null;
  };

  render() {
    const { library, selectLibrary } = this.props;
    const { id, title } = library;
    const { titleStyle } = styles;
    return (
      <TouchableWithoutFeedback onPress={() => selectLibrary(id)}>
        <View>
          <CardSection>
            <Text style={titleStyle}>{title}</Text>
          </CardSection>
          {this.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

ListItem.propTypes = {
  library: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  expanded: PropTypes.bool,
  selectLibrary: PropTypes.func,
};

ListItem.defaultProps = {
  expanded: false,
  selectLibrary: null,
};

const mapStateToProps = (state, ownProps) => ({
  expanded: state.selectedLibraryId === ownProps.library.id,
});

export default connect(
  mapStateToProps,
  actions,
)(ListItem);
