import 'react-native-get-random-values';
import {v4 as uuidv4} from "uuid";

export function createQRToken(): string {
  const timestamp = Date.now();
  const uniqueId = uuidv4();
  return `${uniqueId}-${timestamp}`;
}
