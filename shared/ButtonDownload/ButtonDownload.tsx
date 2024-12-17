import {StyleSheet, View} from 'react-native';
import {Gaps} from '../tokens';
import ButtonLink from '../ButtonLink/ButtonLink';
import DownloadIcon from '../../assets/images/icon/iconFunc/downloadIcon';
import {RootNavigationProp} from '../types';

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
      <ButtonLink navigationPath={''} textBtn={textBtn} />
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
