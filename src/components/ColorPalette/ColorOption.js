import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import Icon from './Icon';

const { width } = Dimensions.get('window');

const ColorOption = (props) => {
  const { icon, color, isSelected, scaleToWindow, onColorChange } = props;
  let scaledWidth = width * .025;
  return (
      <TouchableOpacity
          onPress={() => onColorChange(color)}
          style={[
            styles.colorOption,
            { backgroundColor: color },
            scaleToWindow && {
              width: width * .07,
              height: width * .07,
              marginHorizontal: scaledWidth,
              marginVertical: scaledWidth,
              borderRadius: scaledWidth * 2
            }
          ]}
      >
        {isSelected  && <Icon color={color} icon={icon} />}
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  colorOption: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 25,
    elevation: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: .25,
  }
});

ColorOption.propTypes = {
  icon: PropTypes.node,
  color: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  scaleToWindow: PropTypes.bool.isRequired,
  onColorChange: PropTypes.func.isRequired,
}

export default ColorOption;
