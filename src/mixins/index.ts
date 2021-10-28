import { Vue, Component } from 'vue-property-decorator'
import { utils } from 'ethers'
import { isNetworkSupported } from '@/utils'

@Component
export default class ETHMixin extends Vue {

	public async call(
		deployment: Deployment,
		functionName: string,
		args?: any[],
		options?: CallOption
	) {
		const contractInterface = new utils.Interface(deployment.abi)
		this.checkFunction(contractInterface, functionName)
		try {
			const account = await this.getAccount()
			const data = contractInterface.encodeFunctionData(functionName, args)
			const result = await window.ethereum.request({
				method: 'eth_call',
				params: [
					{
						from: options?.from || account,
						to: options?.to || deployment.address,
						data,
						value: options?.value,
						gas: options?.gas,
						gasPrice: options?.gasPrice
					}
				]
			})
			return contractInterface.decodeFunctionResult(functionName, result)
		} catch (e) {
			this.popError(e)
		}
	}

	public async sendTransaction(
		deployment: Deployment,
		functionName: string,
		args?: any[],
		options?: CallOption
	) {
		const contractInterface = new utils.Interface(deployment.abi)
		this.checkFunction(contractInterface, functionName)
		try {
			const account = await this.getAccount()
			const data = contractInterface.encodeFunctionData(functionName, args)
			return window.ethereum.request({
				method: 'eth_sendTransaction',
				params: [
					{
						from: options?.from || account,
						to: options?.to || deployment.address,
						data,
						value: options?.value,
						gas: options?.gas,
						gasPrice: options?.gasPrice
					}
				]
			})
		} catch (e) {
			this.popError(e)
		}

	}

	public async getBalance(options?: CallOption) {
		try {
			const account = await this.getAccount()
			return window.ethereum.request({
				method: 'eth_getBalance',
				params: [
					options?.from || account,
				]
			})
		} catch (e) {
			this.popError(e)
		}
	}

	public async getAccount(): Promise<string> {
		if (!window.ethereum) {
			throw 'Please install MetaMask to use this app.'
		}

		if (!isNetworkSupported(window.ethereum.chainId)) {
			throw 'Network not supported.'
		}

		if (!this.$store.state.account || !this.$store.state.chainId) {
			throw 'Wallet not connected'
		}

		return this.$store.state.account
	}

	public popError(e: any) {
		if (typeof e === 'string') {
			return this.$message.error(e)
		} else if (e.message) {
			return this.$message.error(e.message)
		} else {
			return this.$message.error(JSON.stringify(e))
		}
	}

	private checkFunction(contractInterface: utils.Interface, functionName: string) {
		return contractInterface.getFunction(functionName)
	}
}
