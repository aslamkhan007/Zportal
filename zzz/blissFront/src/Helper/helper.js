import { NotificationManager } from 'react-notifications'
import 'react-notifications/lib/notifications.css'
import axios from 'axios'
import * as CONFIG from '../../src/config.json'
//import { useSession } from  'react-use-session';

export function createNotification(type, message, title = 'Bliss') {
  switch (type) {
    case 'info':
      NotificationManager.info(message, title, 1000)
      break
    case 'success':
      NotificationManager.success(message, title, 1000)
      break
    case 'warning':
      NotificationManager.warning(message, title, 1000)
      break
    case 'error':
      NotificationManager.error(message, title, 1000)
      break
  }
}

export const getFileObjectFromUrl = async (imgs) => {
  if (!imgs || !imgs.length) return;

  imgs = imgs.map((img) => {
    let name = img.split("-").slice(-1)[0];

    let ext = name.split(".").slice(-1)[0];

    let url = `${CONFIG.API_URL}/uploads/attachments/${img}`;
    return axios
      .get(url, { responseType: "blob" })
      .then((blob) => {
        let b = blob.data;
        b.name = name;
        b.lastModifiedDate = new Date().toLocaleDateString();

        return b;
      })
      .then((d) => {
        return { data_url: url, file: d };
      });
  });
  return await Promise.all(imgs);
};