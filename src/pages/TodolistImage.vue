<template>
	<div class="todolist-image-page">
		<h1>Upload Todolist Image</h1>
		<el-form :inline="true">
			<el-form-item>
				<input
					:disabled="isUploading"
					type="file"
					name="file"
					accept="image/*"
					@change="onFileChange">
			</el-form-item>
			<el-form-item v-if="isUploading">
				Uploading file, please wait...
			</el-form-item>
			<el-form-item>
				<router-link
					:to="{ name: 'dashboard'}">
					<el-button>Back to Todo Lists</el-button>
				</router-link>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import $ from 'jquery';
import { ajaxGet, ajaxPost } from './../lib/ajax';

export default {
	name: 'TodolistImage',
	data() {
		return {
			isUploading: false,
			s3FormData: {},
		};
	},
	created() {
		let backendUrl = this.$root.getBackendUrl(
			'todolist_image_form',
			{ id: this.$route.params.id }
		);
		ajaxGet(backendUrl)
			.then(response => {
				this.s3FormData = response;
			}).fail(() => {
				// do something
			});
	},
	methods: {
		onFileChange(e) {
			let files = e.target.files || e.dataTransfer.files;
			let formData = new FormData();
			let component = this;
			if (!files.length) {
				return;
			}
			formData.append('key', this.s3FormData.key_path + '${filename}');
			formData.append('policy', this.s3FormData.policy);
			formData.append('success_action_status',
				this.s3FormData.success_action_status);
			formData.append('success_action_redirect',
				this.s3FormData.success_action_redirect);
			formData.append('x-amz-algorithm', this.s3FormData.x_amz_algorithm);
			formData.append('x-amz-credential', this.s3FormData.x_amz_credential);
			formData.append('x-amz-date', this.s3FormData.x_amz_date);
			formData.append('x-amz-signature', this.s3FormData.x_amz_signature);
			formData.append('file', files[0]);

			$.ajax({
				url: this.s3FormData.aws_upload_url,
				type: 'post',
				data: formData,
				contentType: false, // 'multipart/form-data',
				processData: false,
				crossDomain: true,
				cache: false,
				success() {
					let backendUrl = component.$root.getBackendUrl(
						'todolist_image_upload_complete',
						{ id: component.$route.params.id }
					);
					let key = component.s3FormData.key_path + files[0].name;
					ajaxPost(
						backendUrl,
						{ key })
						.then(() => {
							component.$router.push({ name: 'dashboard' });
						}).fail(err => {
							console.error(err);
						});
				},
			});

		},
	}
};
</script>
