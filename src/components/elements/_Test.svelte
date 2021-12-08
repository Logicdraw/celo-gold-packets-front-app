<script>
// ...

import { allChainsData, makeChainStore, defaultChainStore, web3, selectedAccount, connected, chainId, chainData } from 'svelte-web3';



let celo_test, celo_test_connected, celo_test_web3;

({ connected: celo_test_connected, web3: celo_test_web3, ...celo_test } = makeChainStore('celo_test'));


celo_test.setProvider('https://alfajores-forno.celo-testnet.org');


// const enable = () => de



// let celo, celo_connected, celo_web3;


// ({ connected: sokol_connected, web3: sokol_web3, ...sokol } = makeChainStore('celo'));



</script>



<style>

</style>


<!-- ... -->



