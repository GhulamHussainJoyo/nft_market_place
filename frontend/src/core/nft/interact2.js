require("dotenv").config()
const API_URL = 'https://eth-ropsten.alchemyapi.io/v2/4X-X1f7-NZpVdHtNVl8pHCBX06ce0iIC'
const PUBLIC_KEY = '0x2777011f19C88168FC29980344821704C69Ed4d1'
const PRIVATE_KEY = 'a16ce2087d68f3f6f875a4f184c0ec90992b34903975bb8532c42e333b848c43'

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("./contractAbi.json")
const contractAddress = "0x63928aa2f63e02805BBc4cFfAe03F506C02387DA"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

export const mintNFT =  async(tokenURI)=> {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce

  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI,1).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("Promise failed:", err)
    })
}


// mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
