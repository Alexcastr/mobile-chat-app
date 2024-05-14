import { KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import React from 'react';

interface CustomKeywordViewProps {
  children: React.ReactNode;
}

const ios = Platform.OS === 'ios';

const CustomKeywordView: React.FC<CustomKeywordViewProps> = ({ children }) => {
  return (
    <KeyboardAvoidingView
      behavior={ios ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ flex: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CustomKeywordView;
