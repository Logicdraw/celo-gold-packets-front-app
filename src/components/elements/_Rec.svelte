<script>
export let recipient;


import { defaultChainStore, web3, connected, selectedAccount, chainId, chainData } from 'svelte-web3';


let to = recipient.to;

let value = $web3.utils.fromWei(recipient.value, 'ether');

</script>



<style>

</style>



<div class="card">

	<div class="card-content">

		<!-- 'hash': tokentx['hash'],
		'value': tokentx['value'],
		'to': tokentx['to'],
		'timeStamp': tokentx['timeStamp'], -->

		<p>To: {to}</p><br>
		<p>Value: {value} Celo</p><br>
		<p>TimeStamp: {recipient.timeStamp}</p><br>
		<p>Hash: {recipient.hash}</p>

	</div>

</div>

<br><br>

