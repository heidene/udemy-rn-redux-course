import React from 'react';
import {
  View, Text, Image, Linking,
} from 'react-native';
import PropTypes from 'prop-types';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';

const styles = {
  textContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  textStyle: {
    fontSize: 18,
  },
  thumbnailContentStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  thumbnailStyle: {
    height: 50,
    width: 50,
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null,
  },
};

const AlbumDetail = (props) => {
  const { album } = props;
  const {
    thumbnailStyle, textContentStyle, thumbnailContentStyle, textStyle, imageStyle,
  } = styles;
  return (
    <Card>
      <CardSection>
        <View style={thumbnailContentStyle}>
          <Image source={{ uri: album.thumbnail_image }} style={thumbnailStyle} />
        </View>
        <View style={textContentStyle}>
          <Text style={textStyle}>{album.title}</Text>
          <Text>{album.artist}</Text>
        </View>
      </CardSection>
      <CardSection>
        <Image source={{ uri: album.image }} style={imageStyle} />
      </CardSection>
      <CardSection>
        <Button onPress={() => Linking.openURL(album.url)}>Buy Now</Button>
      </CardSection>
    </Card>
  );
};

AlbumDetail.propTypes = {
  album: PropTypes.shape({
    artist: PropTypes.string,
    image: PropTypes.string,
    thumbnail_image: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export default AlbumDetail;
