import React, {useState} from 'react';
import {Avatar} from 'react-native-elements';

const LocalImageComponent = ({
  defaultImagePath,
}: {
  defaultImagePath: string;
}) => {
  const [imagePath] = useState(defaultImagePath);
  return (
    <Avatar
      source={{
        uri: imagePath,
      }}
    />
  );
};

export default LocalImageComponent;
