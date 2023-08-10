import ls from 'localstorage-slim';
import encUTF8 from 'crypto-js/enc-utf8';
import AES from 'crypto-js/aes';

ls.config.encrypt = true;
ls.config.secret = process.env.REACT_APP_LS_SECRET;
ls.config.encrypter = (data, secret) => AES.encrypt(JSON.stringify(data), secret).toString();
ls.config.decrypter = (data, secret) => {
    try {
      return JSON.parse(AES.decrypt(data, secret).toString(encUTF8));
    } catch (e) {
      // incorrect/missing secret, return the encrypted data instead
      return data;
    }
  };

const setLS = (data) => {
    ls.set("user_session", JSON.stringify(data))
}

const getLS = () => {
    let session = ls.get("user_session")
    console.log("## before:", window.localStorage.getItem("user_session"))
    if(session != null && session != ''){
      return JSON.parse(session);
    }else {
      return null;
    }
}

// const getLSAndSetUser = () => {
//     let session = ls.get("user_session")
//     setUser(JSON.parse(session));
// }

export {
    setLS,
    getLS
}
