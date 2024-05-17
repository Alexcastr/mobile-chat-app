import { KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import React from 'react';

interface CustomKeywordViewProps {
  children: React.ReactNode;
  inChat?: boolean;
}

const ios = Platform.OS === 'ios';

const CustomKeywordView: React.FC<CustomKeywordViewProps> = ({ children, inChat=false }) => {
  let kavConfig = {}
  let scrollViewConfig = {}
  if(inChat){
    kavConfig = {
      keyboardVerticalOffset: 90,
      
    }
    scrollViewConfig = {
      contentContainerStyle: { flexGrow: 1 },
    }
  }
  
  return (
    <KeyboardAvoidingView
      
      behavior={ios ? 'padding' : 'height'}
      style={{ flex: 1 }}
      {...kavConfig}
    >
      <ScrollView
        {...scrollViewConfig}
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
