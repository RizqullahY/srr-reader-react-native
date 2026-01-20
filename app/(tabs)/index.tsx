import { Button, View, Alert, ScrollView, Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useEffect, useState } from 'react';

import { extractComicZip } from '@/services/comicStorage';
import { scanComics } from '@/services/comicScanner';

export default function IndexScreen() {
  const [series, setSeries] = useState<any[]>([]);

  const loadComics = async () => {
    const data = await scanComics();
    setSeries(data);
  };

  const pickZip = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/zip',
      copyToCacheDirectory: true,
    });

    if (result.canceled) return;

    const file = result.assets[0];

    try {
      await extractComicZip(file.uri, file.name.replace('.zip', ''));
      await loadComics();
      Alert.alert('Sukses', 'ZIP berhasil di-import');
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'Gagal extract ZIP');
    }
  };

  useEffect(() => {
    loadComics();
  }, []);

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Button title="Import ZIP Komik" onPress={pickZip} />

      {series.map((s) => (
        <View key={s.name} style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            {s.name}
          </Text>

          {s.chapters.map((c: any) => (
            <Text key={c.name} style={{ marginLeft: 10 }}>
              • {c.name}
            </Text>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}
