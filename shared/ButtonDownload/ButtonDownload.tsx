import {Text, Pressable, StyleSheet, View} from 'react-native';
import {Colors, Fonts, Gaps} from '../tokens';
import {NavigationProp} from '@react-navigation/native';
import ButtonLink from '../ButtonLink/ButtonLink';
import DownloadIcon from '../../assets/images/icon/iconFunc/downloadIcon';

function ButtonDownload({
  navigationPath,
  textBtn,
  path,
}: {
  navigationPath: any;
  textBtn?: string;
  path?: string;
}) {
  return (
    <View style={styles.buttonDownload}>
      <DownloadIcon />
      <ButtonLink navigationPath={undefined} textBtn={textBtn} />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonDownload: {
    flexDirection: 'row',
    gap: Gaps.g8,
    alignItems: 'center',
  },
});

export default ButtonDownload;
