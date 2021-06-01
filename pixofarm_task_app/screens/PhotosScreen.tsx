import React, {useEffect, useState} from 'react';
// @ts-ignore
import styled from 'styled-components/native';
import {realmConnection} from '../model/files.schema';
import LocalImageComponent from '../components/LocalImageComponent';
import {Button, ListItem} from 'react-native-elements';
import {View} from 'react-native';

const StyledList = styled.FlatList`
  margin-top: 50px;
`;

console.disableYellowBox = true;

const PhotosScreen = () => {
  const [listOfData, setList] = useState([]);
  const makeDate = (timestamp: any) => {
    const dateObject = new Date(Number(timestamp));
    return `${dateObject.getDate()}/${dateObject.getMonth()}/${dateObject.getFullYear()}`;
  };
  useEffect(() => {
    try {
      realmConnection.then(realm => {
        try {
          const data: any = realm.objects('Files').sorted('date', true);
          setList(data);
        } catch (e) {
          console.log(e);
        }
      });
    } catch (e) {
      console.log(e);
    }
  });
  return (
    <View>
      {listOfData && (
        <StyledList
          data={listOfData}
          keyExtractor={(item: any) => item._id}
          renderItem={({item}: {item: any}) => (
            <ListItem key={item._id} bottomDivider>
              <LocalImageComponent defaultImagePath={item.file_name} />
              <ListItem.Content>
                <ListItem.Title>{makeDate(item.date)}</ListItem.Title>
                <ListItem.Subtitle>Latitude: {item.latitude}</ListItem.Subtitle>
                <ListItem.Subtitle>
                  Longitude: {item.longitude}
                </ListItem.Subtitle>
              </ListItem.Content>
              <Button
                type="clear"
                icon={{
                  name: 'refresh',
                  size: 15,
                  color: 'gray',
                }}
                title="Sync"
              />
            </ListItem>
          )}
        />
      )}
    </View>
  );
};

export default PhotosScreen;
