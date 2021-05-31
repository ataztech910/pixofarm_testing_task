import React, {useEffect, useState} from 'react';
// @ts-ignore
// import styled from 'styled-components/native';
import {Avatar} from 'react-native-elements';
import {Image} from 'react-native';

const LocalImageComponent = ({
  defaultImagePath,
}: {
  defaultImagePath: string;
}) => {
  const [imagePath] = useState(defaultImagePath);
  useEffect(() => {
    // Image.getSize(
    //   defaultImagePath,
    //   (width, height) => {
    //     console.log(`Width: ${width}, Height: ${height}`);
    //   },
    //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //   error => {
    //     setImagePath(
    //       'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
    //     );
    //   },
    // );
  });
  return (
    <Avatar
      source={{
        uri: imagePath,
      }}
    />
  );
};

export default LocalImageComponent;
