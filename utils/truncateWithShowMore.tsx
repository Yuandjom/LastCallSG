import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface TruncateWithShowMoreProps {
  text: string;
  maxLength: number;
}

const TruncateWithShowMore: React.FC<TruncateWithShowMoreProps> = ({ text, maxLength }) => {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  if (text.length <= maxLength) {
    return <Text style = {styles.text}>{text}</Text>;
  }

  return (
    <Text style = {styles.text}>
      {showMore ? text : `${text.substring(0, maxLength)}...`}
      <TouchableOpacity onPress={handleShowMore}>
        <Text style={styles.showMoreText}>{showMore ? ' Show Less' : ' Show More'}</Text>
      </TouchableOpacity>
    </Text>
  );
};

const styles = StyleSheet.create({
  showMoreText: {
    color: '#0C5231',
    textDecorationLine: 'underline',
    marginTop:2,
  },
  text: {
    fontSize: 14,
    color: "#888",
    marginHorizontal: 14,
    marginTop: 10,
  },
});

export default TruncateWithShowMore;