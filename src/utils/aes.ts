import CryptoJS from "crypto-js";

export default {
    //随机生成指定数量的16进制key
    generatekey(num: number) {
        let library =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let key = "";
        for (var i = 0; i < num; i++) {
            let randomPoz = Math.floor(Math.random() * library.length);
            key += library.substring(randomPoz, randomPoz + 1);
        }
        return key;
    },

    //加密
    encrypt(word: string, keyStr: string) {
        keyStr = keyStr ? keyStr : "HFp0kS+tve9xb+r9KsEJ1A=="; //判断是否存在ksy，不存在就用定义好的key
        var key = CryptoJS.enc.Base64.parse(keyStr);
        var srcs = CryptoJS.enc.Utf8.parse(word);
        var encrypted = CryptoJS.AES.encrypt(srcs, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
    },
    //解密
    decrypt(word: string | CryptoJS.lib.CipherParams, keyStr: string) {
        keyStr = keyStr ? keyStr : "HFp0kS+tve9xb+r9KsEJ1A==";
        var key = CryptoJS.enc.Base64.parse(keyStr);
        // var val = CryptoJS.enc.Base64.parse(word)
        var decrypt = CryptoJS.AES.decrypt(word, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    }
};
