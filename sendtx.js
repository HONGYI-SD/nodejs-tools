const {Web3} = require('web3');

// 连接到以太坊节点
const web3 = new Web3('http://3.98.124.76:8545'); // 替换成你的Infura API Key

// const privateKey = 'bf512236d273e01f8ab7326c037093b9cce65546af1efaf861f7c4c82c85a249';
// const senderAddress = '0x8899470F9AD3735c6B36Dc2b061A1444dfa4B56c';
const privateKey = '0x72594d8f9c71b07c075795ec340bb48703b708513aebc2caa5bc7525d9ce2f99';
const senderAddress = '0xBb1FA3BCb973F009c51AD0E17e26F6e519Dff276';
const recipientAddress = '0x20424d513DFe18cab20F78b1c6B8135B138674B4';

var count = 1
var nonce = 0
const createTransaction = async (nonce) => {
    try {
      
      // 创建交易对象
      const transactionObject = {
        from: senderAddress,
        to: recipientAddress,
        value: "1",
        gas: 38116,
        gasPrice: "1600",
        nonce: nonce, // 使用获取到的最新 nonce
        data:'0x20424d513DFe18cab20F78b1c6B8135B138674B420424d513DFe18cab20F7835B138674B404d24d513DFe18cab20F78b1c6B8135B138674B4020424d513DFe18cab20F78b1c6B8135B138674B420424d513DFe18cab20F78b1c6B8135B138674B40424d513DFe18cab20F78b1c6B8135B138674B4020424d513DFe18cab20F78b1c6B8135B138674B420424d513DFe18cab20F7835B138674B404d24d513DFe18cab20F78b1c6B8135B138674B4020424d513DFe18cab20F78b1c6B8135B138674B420424d513DFe18cab20F78b1c6B8135B138674B40424d513DFe18cab20F78b1c6B8135B138674B4020424d513DFe18cab20F78b1c6B8135B138674B420424d513DFe18cab20F7835B138674B404d24d513DFe18cab20F78b1c6B8135B138674B4020424d513DFe18cab20F78b1c6B8135B138674B420424d513DFe18cab20F78b1c6B8135B138674B40424d513DFe18cab20F78b1c6B8135B138674B4020424d513DFe18cab20F78b1c6B8135B138674B420424d513DFe18cab20F7835B138674B404d24d513DFe18cab20F78b1c6B8135B138674B4020424d513DFe18cab20F78b1c6B8135B138674B420424d513DFe18cab20F78b1c6B8135B138674B40424d513DFe18cab20F78b1c6B8135B138674B4020424d513DFe18cab20F78b1c6B8135B138674B420424d513DFe18cab20F7835B138674B404d24d513DFe18cab20F78b1c6B8135B138674B4020424d513DFe18cab20F78b1c6B8135B138674B420424d513DFe18cab20F78b1c6B8135B138674B40424d513DFe18cab20F78b1c6B8135B138674B4020424d513DFe18cab20F78b1c6B8135B138674B420424d513DFe18cab20F7835B138674B404d24d513DFe18cab20F78b1c6B8135B138674B4020424d513DFe18cab20F78b1c6B8135B138674B420424d513DFe18cab20F78b1c6B8135B138674B40424d513DFe18cab20F78b1c6B8135B138674B400F78b1c6B8135B138674B4020424d513DFe18cab20F78b1c6B8135B138674B420424d513DFe18cab20F78b1c6B8135B138674B40424d513DFe18cab20F78b1c6B8135B138674B4020424d513DFe18cab20F78b1c6B8135B138674B420424d513DFe18cab20F7835B138674B404d24d513DFe18cab20F78b1c6B8135B138674B4020424d513DFe18cab20F78b1c6B8135B138674B420424d513DFe18cab20F78b1c6B8135B138674B40424d513DFe18cab20F78b1c6B8135B138674B4020424d513DFe18cab20F78b1c6B8135B138674B420424d513DFe18cab20F7835B138674B404d24d513DFe18cab20F78b1c6B8135B138674B4020424d513DFe18cab20F78b1c6B8135B138674B420424d513DFe18cab20F78b1c6B8135B138674B40424d513DFe18cab20F78b1c6B8135B138674B40'
      };
  
      // 使用私钥进行签名
      const signedTransaction = await web3.eth.accounts.signTransaction(transactionObject, privateKey);
  
      // 发送已签名的交易
      const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
      console.log('交易成功:', receipt);
      // console.log('txhash:', receipt.transactionHash)

      //const tx = await web3.eth.getTransaction(receipt.transactionHash)
      //console.log("tx:", tx);
      //console.log("tx input:", tx.input);
      nonce += 1;
      count = 0;
    } catch (error) {
      console.error('交易失败:', error);
    }
  };


  async function sleep(ms){
    
  }
  // 设置每7秒发送一次交易
// setInterval(createTransaction, 200);
//createTransaction()

async function main(){
  nonce = await web3.eth.getTransactionCount(senderAddress);
  try {
    while(true){
      createTransaction(nonce);
      nonce++
      await sleep(50)
    }
  } catch (error) {
    
  }
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

main()