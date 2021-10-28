<template>
	<div style="width: 60%; margin-left: 20%; margin-top: 10%">
		<a-input-search
			v-model="cid"
			placeholder="paste a CID"
			enter-button
			@search="onSearch"
		/>
		<div v-if="cidJSON.hash">
			<a-card>
				<div>Version: {{ cidJSON.version }}</div>
				<div>Code: {{ cidJSON.code }}</div>
				<div>Codec: {{ cidJSON.codec }}</div>
				<div>multibaseName: {{ cidJSON.multibaseName }}</div>
				<div>Hash: {{ cidJSON.hash }}</div>
				<div>Base58 V0: {{ cidJSON.v0 }}</div>
				<div>Base32 V1: {{ cidJSON.v1 }}</div>
			</a-card>
			<a-button
				style="margin-top: 8px"
				type="primary"
				@click="verify"
			>
				Go to verify
			</a-button>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CID from 'cids'

@Component
export default class Approve extends Vue {
	isInvalid = false
	cid = ''
	cidJSON: any = {}

	async onSearch() {
		console.log('search', this.cid)
		try {
			const cid = new CID(this.cid)
			const json = cid.toJSON()
			this.cidJSON = json
			this.cidJSON.hash = '0x' + Buffer.from(json.hash).toString('hex')
			this.cidJSON.v0 = cid.toV0().toString()
			this.cidJSON.v1 = cid.toV1().toString('base32')
			this.cidJSON.code = cid.code
			this.cidJSON.multibaseName = cid.multibaseName
		} catch (e: any) {
			this.$message.error(`Invalid CID: ${e.toString()}`)
		}
	}

	async verify() {
		const cid = this.cidJSON.v1
		window.open(`https://${cid}.ipfs.dweb.link`)
	}
}
</script>
