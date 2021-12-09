// let secret = app_.env.TEST;
// console.log(app_.env.TEST);


function encryptTxnIDAndEncodeURIComponent(txn_id) {
	let encrypted = CryptoJS.AES.encrypt(txn_id, app_.env.TEST);

	return encodeURIComponent(encrypted.toString());
}


function decodeURIComponentAndDecodeTxnID(url_slug) {

	let encrypted_string = decodeURIComponent(url_slug);
	// let it happen ...
	return CryptoJS.AES.decrypt(encrypted_string, app_.env.TEST);

}


export {
	encryptTxnIDAndEncodeURIComponent,
	decodeURIComponentAndDecodeTxnID,
}


