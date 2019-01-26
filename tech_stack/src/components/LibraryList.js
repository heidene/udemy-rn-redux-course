import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import ListItem from './ListItem';

class LibraryList extends Component {
  renderItem = ({ item }) => <ListItem library={item} />;

  render() {
    const { libraries } = this.props;

    return (
      <FlatList
        data={libraries}
        renderItem={this.renderItem}
        keyExtractor={library => `list-item-${library.id}`}
      />
    );
  }
}

LibraryList.propTypes = {
  libraries: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ),
};

LibraryList.defaultProps = {
  libraries: [],
};

const mapStateToProps = state => ({ libraries: state.libraries });

export default connect(mapStateToProps)(LibraryList);
