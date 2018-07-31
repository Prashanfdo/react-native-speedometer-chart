import React from 'react';
import { View, Text,StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { getStyles } from './rules';
// import LinearGradient from 'react-native-linear-gradient'
import { LinearGradient } from 'expo';

const Speedometer = ({ value, totalValue, size, outerColor, innerColor, internalColor, style, showText, text, textStyle, showLabels, labelStyle, showPercent, percentStyle, colorArry }) => {
  const styles = getStyles(size);
  const degreesValue = (value > totalValue) ? totalValue : value;
  const percentValue = parseInt(String((value * 100) / totalValue).split('.')[0]);
  const degrees = ((degreesValue * 180) / ((totalValue === 0) ? 1 : totalValue)) - 90;
  const degressStyle = {
    backgroundColor: internalColor,
    transform: [{ translateX: size / 4 }, { rotate: `${degrees}deg` }, { translateX: (size / 4 * -1) }],
  };

  const gradientStyle = {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  }

  const percentElement = (showPercent) ? (
    <Text style={[{ backgroundColor: innerColor }, percentStyle]} numberOfLines={1}>{percentValue}%</Text>
  ) : null;

  const textElement = ((showText) && (text)) ? (
    <Text style={[{ backgroundColor: innerColor }, textStyle]} numberOfLines={1}>{text}</Text>
  ) : null;

  const labelsElement = (showLabels) ? (
    <View style={[styles.labelsView, { width: size }]}>
      <Text style={[styles.initialLabel, labelStyle]} numberOfLines={1}>0</Text>
      <Text style={[styles.finalLabel, labelStyle]} numberOfLines={1}>{totalValue}</Text>
    </View>
  ) : null;

  return (
    <View style={style}>
      <View style={[styles.outerCircle, { backgroundColor: outerColor }]}>
      <LinearGradient
            colors={colorArry} 
            start={{ x: 0.1, y: 0.5 }}
            end={{ x: 1, y: 0.5 }} 
            style={[styles.halfCircle, degressStyle, gradientStyle]}>
        <View  />
        </LinearGradient>
        <View style={[styles.innerCircle, { backgroundColor: innerColor }]}>
          {percentElement}
          {textElement}
        </View>
      </View>
      {labelsElement}
    </View>
  );
};

Speedometer.propTypes = {
  value: PropTypes.number.isRequired,
  totalValue: PropTypes.number.isRequired,
  size: PropTypes.number,
  outerColor: PropTypes.string,
  innerColor: PropTypes.string,
  internalColor: PropTypes.string,
  style: PropTypes.object,
  showText: PropTypes.bool,
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  textStyle: PropTypes.object,
  showLabels: PropTypes.bool,
  labelStyle: PropTypes.object,
  showPercent: PropTypes.bool,
  percentStyle: PropTypes.object,
  colorArry: PropTypes.array,
};

Speedometer.defaultProps = {
  size: 200,
  outerColor: '#e6e6e6',
  innerColor: '#ffffff',
  internalColor: '#130924',
  style: {},
  showText: true,
  text: '',
  textStyle: {},
  showLabels: true,
  labelStyle: {},
  showPercent: true,
  percentStyle: {},
  colorArry: ['#39c7ed', '#130924']
};

export default Speedometer;
