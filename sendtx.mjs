//const {Web3} = require('web3');
import Web3 from 'web3';
import cryptoRandomString from 'crypto-random-string';

// 连接到以太坊节点
const web3 = new Web3('http://54.226.84.169:8123');

const privateKey = '01723d1ff969b774ec0ea1b066554f39d862b3e3128809608a8357f8f88ab953';
const senderAddress = '0xc3E698abC50f5f62aF88fd24782BC51f8ACBF1ee';
const recipientAddress = '0x2ECF31eCe36ccaC2d3222A303b1409233ECBB225';

const createTransaction = async (nonce) => {
    try {
        const balance = await web3.eth.getBalance(senderAddress);
        console.log("balance:", balance)

        const baseFee = await web3.eth.getGasPrice(); // 获取当前区块的基础燃气费
        //console.log("baseFee:", baseFee)

        const adjustedGasPrice = web3.utils.toWei((parseInt(baseFee) + 5).toString(), 'wei');
        //console.log("adjustedGasPrice", adjustedGasPrice)

        // 创建交易对象
        const transactionObject = {
            from: senderAddress,
            to: recipientAddress,
            value: "1",
            //gas: 21000,
            gasPrice: adjustedGasPrice,
            nonce: nonce, // 使用获取到的最新 nonce
            //data:'0x'+cryptoRandomString({ length: 130000 })   //'A'.repeat(131000)
        };
      //console.log('data:', transactionObject.data)
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
    var nonce = await web3.eth.getTransactionCount(senderAddress);
    while(true){
      createTransaction(nonce);
      nonce++
      await sleep(60 * 1000)
    }
  } catch (error) {
    console.error("something error: ", error)
  }
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

main()