import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageUtil {
  public async getItem<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? (JSON.parse(jsonValue) as T) : null;
    } catch (error) {
      console.error(`Error getting the ${key} from AsyncStorage`, error);
      return null;
    }
  }

  public async setItem<T>(key: string, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error(`Error saving the ${key} from AsyncStorage`, error);
    }
  }

  public async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing the ${key} from AsyncStorage`, error);
    }
  }

  public async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error(`Error cleaning the AsyncStorage`, error);
    }
  }
}

export const storageUtil = new StorageUtil();
