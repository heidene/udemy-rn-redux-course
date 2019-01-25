import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import AlbumDetail from './AlbumDetail';

class AlbumList extends Component {
  state = { albums: [] };

  componentWillMount() {
    const url = 'https://rallycoding.herokuapp.com/api/music_albums';
    fetch(url, {
      method: 'GET',
    })
      .then(response => response.json())
      .then((jsonData) => {
        this.setState({ albums: jsonData });
      })
      .catch(error => console.error('Error:', error));
  }

  renderAlbums() {
    const { albums } = this.state;
    return albums.map(album => <AlbumDetail key={album.title} album={album} />);
  }

  render() {
    return <ScrollView>{this.renderAlbums()}</ScrollView>;
  }
}

// AlbumList.propTypes = {};

export default AlbumList;
