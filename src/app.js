App = {
    load: async () => {
        // Load app...
        console.log("App loading...")
        await App.loadWeb3()
        await App.loadAccount()
    },

    loadWeb3: async () => {
        // Modern dapp browsers...
        if (window.ethereum) {
            window.web3 = new Web3(ethereum)
            try {
                // Request account access if needed
                await ethereum.eth_requestAccounts()
                // Acccounts now exposed
                web3.eth.sendTransaction({/* ... */})
            } 
            catch (error) {
                // User denied account access...
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = web3.currentProvider
            window.web3 = new Web3(web3.currentProvider)
            // Acccounts always exposed
            web3.eth.sendTransaction({/* ... */})
        }
        // Non-dapp browsers...
        else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    },

    loadAccount: async () => {
        App.account = web3.eth.accounts[0]
    }
}

$(() => {
    $(window).load(() => {
        App.load()
    })
})
