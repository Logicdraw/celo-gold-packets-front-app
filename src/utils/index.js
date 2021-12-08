let secret = app_;
console.log(app_);


function encryptTxnIDAndEncodeURIComponent(txn_id) {
	let encrypted = CryptoJS.AES.encrypt(txn_id, secret);

	return encodeURIComponent(encrypted.toString());
}


function decodeURIComponentAndDecodeTxnID(url_slug) {

	let encrypted_string = decodeURIComponent(url_slug);
	// let it happen ...
	return CryptoJS.AES.decrypt(encrypted_string, secret);

}


export {
	encryptTxnIDAndEncodeURIComponent,
	decodeURIComponentAndDecodeTxnID,
}


