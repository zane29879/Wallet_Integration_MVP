import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";

export const connectWallet = () => async (dispatch) => {
  try {
    const ethereumProvider = await detectEthereumProvider();

    if (!ethereumProvider) {
      alert("Please install MetaMask!");
      window.open("https://metamask.io/download.html", "_blank");
      return;
    }

    const existingAccounts = await window.ethereum.request({ method: 'eth_accounts' });
    let account = existingAccounts[0];

    if (existingAccounts.length > 0) {
        console.log('Already connected:', existingAccounts[0]);
        account = existingAccounts[0];
    } else {
      const accounts = await ethereumProvider.request({
        method: "eth_requestAccounts",
      });
      account = accounts[0];
    }

    const ethersProvider = new ethers.BrowserProvider(ethereumProvider);
    const balance = await ethersProvider.getBalance(account);
    const network = await ethersProvider.getNetwork();

    dispatch({
      type: "SET_WALLET_INFO",
      payload: {
        address: account,
        balance: ethers.formatEther(balance),
        network: network.name,
      },
    });

    // Auto-update on account change
    ethereumProvider.on("accountsChanged", async (accounts) => {
      const updatedAccount = accounts[0];
      const updatedBalance = await ethersProvider.getBalance(updatedAccount);
      dispatch({
        type: "SET_WALLET_INFO",
        payload: {
          address: updatedAccount,
          balance: ethers.formatEther(updatedBalance),
          network: network.name,
        },
      });
    });

    // Auto-update on network change
    ethereumProvider.on("chainChanged", () => {
      window.location.reload();
    });

  } catch (error) {
    if (error.code === 4001) {
      console.error("User rejected connection");
    } else {
      console.error(error);
    }
  }
};

export const sendTransaction = (to, amountEth) => async (_, getState) => {
  try {
    const state = getState();
    const from = state.wallet.address;
    const ethereumProvider = await detectEthereumProvider();
    const ethersProvider = new ethers.BrowserProvider(ethereumProvider);
    const signer = await ethersProvider.getSigner();

    const tx = await signer.sendTransaction({
      to,
      value: ethers.parseEther(amountEth),
    });

    console.log("Transaction sent:", tx.hash);
    await tx.wait();
    console.log("Transaction confirmed");
  } catch (error) {
    console.error("Transaction failed:", error);
  }
};
