import React, { useState } from 'react';
import { View, TextInput, Button, Text, FlatList } from 'react-native';

const TextInputButtonScreen = () => {
  const [inputValue, setInputValue] = useState('');
  const [displayValues, setDisplayValues] = useState([]);

  const handleButtonClick = () => {
    setDisplayValues([...displayValues, inputValue]);
    setInputValue('');
  };


  const renderDisplayValue = ({ item }) => <Text style={styles.displayText}>{item}</Text>;

  return (
    <View>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setInputValue(text)}
        value={inputValue}
      />
      <Button title="Display" onPress={handleButtonClick} />
      <FlatList
        data={displayValues}
        renderItem={renderDisplayValue}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

export default TextInputButtonScreen;
