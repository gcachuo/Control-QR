import { v4 as uuidv4 } from "uuid";

export function createQRToken(): string {
  const timestamp = Date.now();
  const uniqueId = uuidv4();
  const qrData = `${uniqueId}-${timestamp}`;

  return qrData;
}
