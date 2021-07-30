import {cryptoWaitReady, signatureVerify} from "@polkadot/util-crypto";

export function signatureVaild(signedMessage, signature, publicKey) {
    return cryptoWaitReady().then( async () => {
        let verify_result = signatureVerify(signedMessage, signature, publicKey).isValid;
        return verify_result;
    });
}
