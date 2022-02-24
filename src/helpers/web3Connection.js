//Ejemplo de prueba


// Elementos del DOM
const metamaskButton = document.querySelector(".enableMetamaskButton");
const metamaskAddress = document.querySelector(".enableMetamaskAddress");
const showAccount = document.querySelector(".showAccount");

export const loadWeb3 = () => {
	// window.addEventListener("load", () => {
	// 	// Aquí se comprueba si Web3 ha sido inyectado por el navegador (Mist/Metamask)
	// 	if (typeof web3 !== "undefined") {
	// 		// Usar el proveedor Mist/MetaMask
	// 		const web3js = new Web3(web3.currentProvider);
	// 		console.log(web3js);
	// 	} else {
	// 		// Esto se activará si el usuario no tiene instalado Mist/Metamask. Sería
	// 		// recomendable avisar al usuario de que debe instalarse Misk/Metamask
	// 		// para poder usar nuestra DApp.
	// 	}
	// 	// Ahora ya puedes iniciar tu DApp y acceder a Web3.js libremente:
	// 	startApp();
	// });

	//Comprobar si metamask esta instalado
	if (typeof window.ethereum !== "undefined") {
		// console.log("MetaMask is installed!");

		//Añadimos un listener para que al pulsar el evento abra metamask para elegir una cuenta para enlazarla
		metamaskButton.addEventListener("click", async () => {
			getAccount();
		});
		ethereum.on("accountsChanged", function (accounts) {
			console.log(accounts);
			if (accounts.length > 0) {
				const account = accounts[0];
				metamaskButton.textContent = "Wallet Connected";
				showAccount.innerHTML = account;
				metamaskAddress.textContent = account;
			} else {
				metamaskButton.textContent = "Enable Wallet";
				metamaskAddress.textContent = "";
				showAccount.innerHTML = "Connect some address";
			}

			// Time to reload your interface with accounts[0]!
		});
	}
	//Si metamask no esta instalado
	else {
		metamaskButton.textContent = "Install Metamask";
		metamaskButton.addEventListener("click", () => {
			//Will Start the metamask extension
			window.open("https://metamask.io/", "_blank");
		});
	}
};

const getAccount = async () => {
	//Inicia la extension de la wallet y retorna la address de la cuenta conectada
	await ethereum.request({ method: "eth_requestAccounts" });
};
