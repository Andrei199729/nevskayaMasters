import {StyleSheet, Text, View} from 'react-native';
import {Colors, Fonts, Gaps} from '../../shared/tokens';
import {useState} from 'react';
import ButtonLinkAuth from '../../shared/ButtonLinkAuth/ButtonLinkAuth';

interface AuthSectionProps {
  children: React.ReactNode;
  title: string;
  navigation: any;
  textBtn?: string;
  pathLink?: string;
  textWithBtn?: string;
}

function AuthSection({children, ...props}: AuthSectionProps) {
  return (
    <View style={styles.content}>
      <View style={styles.form}>
        <Text style={styles.title}>{props.title}</Text>
        {children}
        <View style={styles.blockQuestion}>
          <Text style={styles.question}>{props.textWithBtn}</Text>
          <ButtonLinkAuth
            navigationPath={props.navigation}
            textBtn={props.textBtn}
            path={props.pathLink}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  content: {
    maxWidth: '100%',
    width: '100%',
    height: '100%',
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    paddingTop: 24,
  },
  form: {
    gap: Gaps.g18,
  },
  title: {
    fontFamily: Fonts.medium,
    fontSize: Fonts.f24,
    color: Colors.black,
  },
  blockQuestion: {
    gap: 4,
    flexDirection: 'row',
  },
  question: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.f14,
    color: Colors.black,
    opacity: 0.5,
  },
});

export default AuthSection;
