const {Web3} = require('web3');

// 连接到以太坊节点
const web3 = new Web3('http://54.175.105.94:8545');

const privateKey = '0xc669bfc9772541b997cf9a3f11911c482b1c55540599205f45fdb518dc891637';
const senderAddress = '0x273Ceb0D6A0AFc8316eb92c254ce332fB75268fb';
const recipientAddress = '0x20424d513DFe18cab20F78b1c6B8135B138674B4';

const createTransaction = async (nonce) => {
    try {
        const balance = await web3.eth.getBalance(senderAddress);
        //console.log("balance:", balance)

        const baseFee = await web3.eth.getGasPrice(); // 获取当前区块的基础燃气费
        //console.log("baseFee:", baseFee)

        const adjustedGasPrice = web3.utils.toWei((parseInt(baseFee) + 1).toString(), 'wei');
        //console.log("adjustedGasPrice", adjustedGasPrice)

        // 创建交易对象
        const transactionObject = {
            from: senderAddress,
            to: recipientAddress,
            value: "1",
            //gas: 21000,
            gasPrice: adjustedGasPrice,
            nonce: nonce, // 使用获取到的最新 nonce
            data:'0x20424d513DFe18cab20F78b1c6B8135B138674B420424d513DFe18cab20F7835B138674B404d24d513DFe18cab20F78b1c6B8135B138674B4020424d513DFe18cab20F78b1c6B8135B138674B420424d513DFe18cab20F78b1c6B8135B138674B40424d513DFe18cab20F78b1c6B8135B138674B4020424d513DFe18cab20F78b1c6B8135B138674B420424d513DFe18cab20F7835B138674B404d24d513DFe18cab20F78b1c6B8135B138674B4020424d513DFe18cab20F78b1c6B8135B138674B420424d513DFe18cab20F78b1c6B8135B138674B40424d513DFe18cab20F78b1c6B8135B138674B4020424d513DFe18cab20F78b1c6B8135B138674B420424d513DFe18cab20F7835B138674B404d24d513DFe18cab20F78b1c6B8135B138674B4020424d513DFe18cab20F78b1c6B8135B138674B420424d513DFe18cab20F78b1c6B8135B138674B40424d513DFe18cab20F78b1c6B8135B138674B4020424d513DFe18cab20F78b1c6B8135B138674B420424d513DFe18cab20F7835B138674B404d24d513DFe18cab20F78b1c6B8135B138674B4020424d513DFe18cab20F78b1c6B8135B138674B420424d513DFe18cab20F78b1c6B8135B138674B40424d513DFe18cab20F78b1c6B8135B138674B4020424d513DFe18cab20F78b1c6B8135B138674B420424d513DFe18cab20F7835B138674B404d24d513DFe18cab20F78b1c6B8135B138674B4020424d513DFe18cab20F78b1c6B8135B138674B420424d513DFe18cab20F78b1c6B8135B138674B40424d513DFe18cab20F78b1c6B8135B138674B4020424d513DFe18cab20F78b1c6B8135B138674B420424d513DFe18cab20F7835B138674B404d24d513DFe18cab20F78b1c6B8135B138674B4020424d513DFe18cab20F78b1c6B8135B138674B420424d513DFe18cab20F78b1c6B8135B138674B40424d513DFe18cab20F78b1c6B8135B138674B400F78b1c6B8135B138674B4020424d513DFe18cab20F78b1c6B8135B138674B420424d513DFe18cab20F78b1c6B8135B138674B40424d513DFe18cab20F78b1c6B8135B138674B4020424d513DFe18cab20F78b1c6B8135B138674B420424d513DFe18cab20F7835B138674B404d24d513DFe18cab20F78b1c6B8135B138674B4020424d513DFe18cab20F78b1c6B8135B138674B420424d513DFe18cab20F78b1c6B8135B138674B40424d513DFe18cab20F78b1c6B8135B138674B4020424d513DFe18cab20F78b1c6B8135B138674B420424d513DFe18cab20F7835B138674B404d24d513DFe18cab20F78b1c6B8135B138674B4020424d513DFe18cab20F78b1c6B8135B138674B420424d513DFe18cab20F78b1c6B81353B138674B40424d513DFe18cab20F78b1c6B8135B138674B40'
        };
      
      const estimate = await web3.eth.estimateGas(transactionObject);
      console.log("estimate: ", estimate);
      transactionObject.gas = estimate;
      // 使用私钥进行签名
      const signedTransaction = await web3.eth.accounts.signTransaction(transactionObject, privateKey);
      // 发送已签名的交易
      console.log('send tx: ', 'nonce is ', nonce)
      const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
      console.log('tx is succeeded :', "nonce is ",nonce, "tx hash is ", receipt.transactionHash);
    } catch (error) {
      console.error('tx is failed:', error);
    }
  };

async function main(){
  try {
    nonce = await web3.eth.getTransactionCount(senderAddress);
    while(true){
      createTransaction(nonce);
      nonce++
      await sleep(50000)
    }
  } catch (error) {
    console.error("something error: ", error)
  }
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

main()