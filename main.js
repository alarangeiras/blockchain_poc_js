const uuid = require('uuid/v1')
const SHA256 = require('crypto-js/sha256');

class Block {
	constructor(data, previousHash = '') {
		this.index = uuid();
		this.timestamp = new Date().getTime();
		this.data = data;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
	}

	calculateHash() {
		return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
	}
}


class Blockchain {
	constructor() {
		this.chain = [];
		this.addBlock({}); //cria o bloco genesys
	}

	getLatestHash() {
		if (this.chain.length) {
			return this.chain[this.chain.length - 1].hash;
		}

		return '';
	}

	addBlock(data) {
		let newBlock = new Block(data, this.getLatestHash());
		this.chain.push(newBlock);
	}

	isChainValid() {
		if (this.chain.length) {
			for (let i = 1; i < this.chain.length; i++) {
				const currentBlock = this.chain[i];
				const previousBlock = this.chain[i - 1];

				if (currentBlock.hash != currentBlock.calculateHash()) {
					return false;
				}

				if (currentBlock.previousHash != previousBlock.hash) {
					return false;
				}
			}

			return true;
		}
	}
}

let blockchain = new Blockchain();
blockchain.addBlock({amount: 4});
blockchain.addBlock({amount: 10});
blockchain.addBlock({amount: 7});
blockchain.addBlock({amount: 5});
blockchain.addBlock({amount: 1});
blockchain.addBlock({amount: 3});
blockchain.addBlock({amount: 2});

console.log(JSON.stringify(blockchain, null, 4));
console.log('check blockchain ' + blockchain.isChainValid());
blockchain.chain[1].data.amount = 100;
blockchain.chain[1].calculateHash();
console.log('check blockchain ' + blockchain.isChainValid());