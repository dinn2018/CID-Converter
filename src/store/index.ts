import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

export const UPDATE_ACCOUNT = 'update-account'
export const UPDATE_CHAINID = 'update-chainId'

interface AccountState {
	account: string
	chainId: string
}

class Store extends Vuex.Store<AccountState>{
	constructor() {
		super({
			state: {
				account: '',
				chainId: ''
			},
			mutations: {
				[UPDATE_ACCOUNT](state: AccountState, account: string) {
					state.account = account
				},
				[UPDATE_CHAINID](state: AccountState, chainId: string) {
					state.chainId = chainId
				},
			}
		})
	}

	public init(state: AccountState) {
		this.commit(UPDATE_ACCOUNT, state.account)
		this.commit(UPDATE_CHAINID, state.chainId)
	}

}

const store = new Store()

export default store