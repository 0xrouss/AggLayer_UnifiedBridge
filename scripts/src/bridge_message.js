const { getLxLyClient, tokens, configuration, from, to } = require('./utils/utils_lxly');
const { Bridge } = require('@maticnetwork/lxlyjs');
const { encodePacked } = require('viem');

// Encode the amount into a uint256.
function encodeMetadata(amount) {
    return encodePacked(["uint256"], [amount]);
}

const execute = async () => {
    const client = await getLxLyClient();
    // change this with your smart contract deployed on destination network.
    const destinationAddress = "0x43854F7B2a37fA13182BBEA76E50FC8e3D298CF1"; 
    // the destination Network ID for this example is spolia, therefore is 0.
    const sourceNetworkId = 1;
    // Call bridgeMessage function.
    const destinationNetworkId = 0; 
    // the source Network ID for this example is Cardona, therefore is 1.
    const result = await client.bridges[sourceNetworkId]
        .bridgeMessage(destinationNetworkId, destinationAddress, true, encodeMetadata(3));
    const txHash = await result.getTransactionHash();
    console.log("txHash", txHash);
    const receipt = await result.getReceipt();
    console.log("receipt", receipt);
}

execute().then(() => {
}).catch(err => {
    console.error("err", err);
}).finally(_ => {
    process.exit(0);
});
