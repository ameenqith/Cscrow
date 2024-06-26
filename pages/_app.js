import "../styles/globals.css";
import "../styles/custom.css";
//INTRNAL IMPORT
import { NavBar, Footer } from "../components/componentsindex";
import { EscrowProvider } from "../Context/EscrowContext";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import {
	EthereumClient,
	w3mConnectors,
	w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygon, sepolia } from "wagmi/chains";
const chains = [polygon, sepolia];
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
	autoConnect: true,
	connectors: w3mConnectors({ projectId, chains }),
	publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

const MyApp = ({ Component, pageProps }) => (
	<>
		<WagmiConfig config={wagmiConfig}>
			<EscrowProvider>
				<NavBar />
				<Component {...pageProps} />
				<ScrollToTop />
				<Footer />
			</EscrowProvider>
		</WagmiConfig>
		<Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
		<ToastContainer
			position="top-right"
			autoClose={5000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
			theme="colored"
		/>
	</>
);

export default MyApp;
